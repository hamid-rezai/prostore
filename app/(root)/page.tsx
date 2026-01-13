import DealCountDown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className='space-y-16 md:space-y-24'>
      {/* Hero Carousel Section */}
      {featuredProducts.length > 0 && (
        <section className='relative -mx-5 md:-mx-10 lg:mx-auto lg:max-w-7xl'>
          <ProductCarousel data={featuredProducts} />
        </section>
      )}

      {/* Newest Arrivals Section */}
      <section className='space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='h2-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Newest Arrivals
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Discover our latest collection of premium products, carefully
            curated just for you
          </p>
        </div>
        <ProductList data={latestProducts} title='' limit={4} />
        <ViewAllProductsButton />
      </section>

      {/* Deal Countdown Section */}
      <section className='py-12 bg-gradient-to-b from-background via-muted/20 to-background rounded-3xl'>
        <DealCountDown />
      </section>

      {/* Icon Boxes Section */}
      <section className='py-8'>
        <IconBoxes />
      </section>
    </div>
  );
};

export default HomePage;
