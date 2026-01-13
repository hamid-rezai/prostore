import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center items-center pt-4'>
      <Button
        asChild
        size='lg'
        className='px-8 py-6 text-base font-semibold group'>
        <Link href='/search' className='flex items-center gap-2'>
          View All Products
          <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
        </Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
