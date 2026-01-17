import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();
  const session = await auth();

  let client_secret = null;

  // Check if it is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // Init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "AUD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  // PayPal Client ID must be accessible on client side (PayPalScriptProvider is client component)
  // Use NEXT_PUBLIC_ prefix for client-side environment variables
  const paypalClientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    console.error(
      "PayPal Client ID is not set. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable."
    );
    // Don't throw error, just pass empty string - the component will handle it gracefully
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      stripeClientSecret={client_secret}
      paypalClientId={paypalClientId || ""}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
