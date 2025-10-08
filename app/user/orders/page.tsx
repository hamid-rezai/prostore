import { getMyOrders } from "@/lib/actions/order.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
};
const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;
  const orders = await getMyOrders({
    page: Number(page) || 1,
  });
  return <></>;
};

export default OrdersPage;
