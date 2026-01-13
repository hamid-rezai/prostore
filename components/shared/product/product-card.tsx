import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-2 hover:border-primary/20'>
      <CardHeader className='p-0 items-center overflow-hidden bg-muted/30'>
        <Link
          href={`/product/${product.slug}`}
          className='relative block aspect-square w-full'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            className='object-cover transition-transform duration-500 group-hover:scale-110'
            priority={false}
          />
          {product.stock === 0 && (
            <div className='absolute inset-0 bg-black/60 flex items-center justify-center z-10'>
              <span className='text-white font-bold text-lg'>Out of Stock</span>
            </div>
          )}
        </Link>
      </CardHeader>
      <CardContent className='p-5 grid gap-3'>
        <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
          {product.brand}
        </div>
        <Link href={`/product/${product.slug}`} className='group/link'>
          <h2 className='text-base font-semibold line-clamp-2 group-hover/link:text-primary transition-colors'>
            {product.name}
          </h2>
        </Link>
        <div className='flex-between gap-4 items-center pt-2'>
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive font-semibold'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
