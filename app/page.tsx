import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className='px-6 md:px-20 py-24 bg-white dark:bg-[#1a1a1a] transition-colors duration-300'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text text-gray-700 dark:text-gray-300'>
              Grab your products on TIME....!:
              <Image
                src="/assets/icons/clock.svg"
                alt="clock"
                width={55}
                height={25}
              />
            </p>
            <h1 className='head-text text-black dark:text-white'>
              Get notified when ITS DROPPED <br />
              <span className='text-primary'> RupeeTracker</span>
            </h1>
            <p className='mt-6 text-gray-800 dark:text-gray-400'>
              Track your price and get it ON "TIME" with unbelievable prices
            </p>

            {/* Adding id here for smooth scroll to Searchbar */}
            <div id="search-section">
              <Searchbar />
            </div>
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className='trending-section bg-white dark:bg-[#121212] transition-colors duration-300'>
        <h2 className='section-text text-black dark:text-white'>
          Search Results
        </h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default home
