"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full'
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}>
      <CarouselContent className='-ml-0'>
        {data.map((product: Product) => (
          <CarouselItem key={product.id} className='pl-0'>
            <Link href={`/product/${product.slug}`} className='group block'>
              <div className='relative mx-auto overflow-hidden rounded-2xl shadow-2xl'>
                <div className='relative aspect-[21/9] md:aspect-[16/6]'>
                  <Image
                    src={product.banner!}
                    alt={product.name}
                    fill
                    sizes='100vw'
                    className='object-cover  transition-transform duration-700 group-hover:scale-110'
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0  bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                  {/* Content Overlay */}
                  <div className='absolute inset-0 flex items-end justify-center p-8 md:p-12'>
                    <div className='text-center space-y-4 max-w-3xl'>
                      <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl group-hover:scale-105 transition-transform duration-300'>
                        {product.name}
                      </h2>
                      <p className='text-white/90 text-lg md:text-xl font-medium'>
                        Shop Now →
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-4 md:left-6' />
      <CarouselNext className='right-4 md:right-6' />
    </Carousel>
  );
};

export default ProductCarousel;
