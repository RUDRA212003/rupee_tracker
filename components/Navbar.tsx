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
    <header className="w-full px-4 py-3 shadow-sm bg-white dark:bg-black">
      <nav className="flex justify-between items-center flex-wrap gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo">
            Rupee<span className='text-primary'>Tracker</span>
          </p>
        </Link>

        {/* Right-side Icons */}
        <div className="flex items-center gap-3">
          {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={24}
              height={24}
              className="object-contain cursor-pointer"
              onClick={icon.alt === 'search' ? handleSearchClick : undefined}
            />
          ))}

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="px-2 py-1 border rounded text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
