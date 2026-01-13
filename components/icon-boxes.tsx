"use client";
import { DollarSign, Headset, ShoppingBag, CreditCard } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Free Shipping",
      description: "Free shipping on orders above $100",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: DollarSign,
      title: "Money Back Guarantee",
      description: "Within 30 days of purchase",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay with credit card, PayPal or COD",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Get support at any time",
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className='w-full'>
      <Card className='border-2 shadow-lg'>
        <CardContent className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:p-10'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center space-y-3 group hover:scale-105 transition-transform duration-300'>
              <div
                className={`p-4 rounded-full bg-muted ${feature.color} group-hover:bg-primary/10 transition-colors duration-300`}>
                <feature.icon className='w-6 h-6 md:w-8 md:h-8' />
              </div>
              <div className='space-y-1'>
                <div className='text-base md:text-lg font-bold'>
                  {feature.title}
                </div>
                <div className='text-sm text-muted-foreground leading-relaxed'>
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
