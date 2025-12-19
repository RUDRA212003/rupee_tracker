import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const HomePage = async () => {
  const allProducts = await getAllProducts()

  return (
    <>
      {/* HERO SECTION */}
      <section className="px-6 md:px-20 py-24 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="flex max-xl:flex-col gap-16">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">

            <p className="small-text text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Track prices in real time
              <Image
                src="/assets/icons/clock.svg"
                alt="Price tracking clock icon"
                width={30}
                height={30}
              />
            </p>

            {/* MAIN SEO H1 */}
            <h1 className="head-text text-black dark:text-white mt-4">
              RupeeTracker – Track Product Prices & Get Drop Alerts
            </h1>

            {/* SUPPORTING H2 */}
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-3">
              Get notified instantly when prices drop
            </h2>

            {/* SEO PARAGRAPH */}
            <p className="mt-4 text-gray-800 dark:text-gray-400 max-w-xl">
              RupeeTracker helps users track online product prices, receive real-time
              price drop alerts, and shop smarter by buying products at the right time
              without overpaying.
            </p>

            {/* SEARCH SECTION */}
            <div id="search-section" className="mt-6">
              <Searchbar />
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <HeroCarousel />
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="trending-section bg-white dark:bg-[#121212] transition-colors duration-300 px-6 md:px-20 py-20">
        <h2 className="section-text text-black dark:text-white mb-10">
          Trending Products & Price Tracking
        </h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-400">
              No products found. Try searching for a product to track its price.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default HomePage
