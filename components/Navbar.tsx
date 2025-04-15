'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]

const Navbar = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleSearchClick = () => {
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="w-full px-4 py-4 shadow-sm bg-white dark:bg-black">
      <nav className="flex items-center gap-4 flex-wrap">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={30}
            height={30}
            alt="logo"
          />
          <p className="nav-logo text-lg font-semibold">
            Rupee<span className='text-primary'>Tracker</span>
          </p>
        </Link>

        {/* Scrolling Sales/Deals in Center */}
        <div className="flex-1 text-center overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-sm text-gray-700 dark:text-gray-200 font-medium">
            🛍️ Big Summer Sale is Live! | 🔥 Up to 60% off on Electronics | 🚚 Free delivery on orders above ₹499 | 💳 No cost EMI on select products!
          </div>
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center gap-4">
          {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={26}
              height={26}
              className="object-contain cursor-pointer transition-transform duration-300 hover:scale-125"
              onClick={icon.alt === 'search' ? handleSearchClick : undefined}
            />
          ))}

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="px-2 py-1 border rounded text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white transition-transform duration-300 hover:scale-105"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
