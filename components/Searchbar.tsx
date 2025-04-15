"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useEffect, useState } from 'react';

const placeholderTexts = [
  "Search for iPhones 📱",
  "Search for kitchen gadgets 🍳",
  "In summer? ACs have best deals ❄️",
  "Track your favorite Amazon products 🛒",
  "Don't miss price drops on laptops 💻",
  "Grab deals on smartwatches ⌚",
  "Upgrade your workspace with monitors 🖥️",
  "Best offers on headphones 🎧",
  "Search trending fashion wear 👗👕",
  "Exclusive shoes & sneakers offers 👟",
  "Home appliances at lowest prices 🧺",
  "Gaming accessories on sale 🎮",
  "Explore latest smart TVs 📺",
  "Top deals in beauty & health 💄🧴",
  "Kitchen essentials starting ₹199 🍽️",
  "Recharge your home with LED lights 💡",
  "Premium watches on festive sale ⌚🎉",
  "Find your daily grocery offers 🛍️",
];

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    return (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.in') ||
      hostname.includes('amzn.in')
    );
  } catch (error) {
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  // Typing animation logic
  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    const typeEffect = () => {
      currentText = placeholderTexts[textIndex];
      if (isDeleting) {
        setPlaceholder((prev) => prev.slice(0, -1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % placeholderTexts.length;
        }
      } else {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000); // Pause before deleting
          return;
        }
      }
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    };

    typeEffect();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert('Please provide a valid Amazon link');
    }

    try {
      setIsLoading(true);
      setMessage('');
      setIsSuccess(false);

      await scrapeAndStoreProduct(searchPrompt);

      setMessage('Scroll down and tap on your product');
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder={placeholder || "Paste your amazon link here"}
        className="searchbar-input outline-none border border-gray-300 p-3 rounded-md flex-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300"
      />

      <button
        type="submit"
        className="searchbar-btn px-5 py-3 bg-blue-600 text-white rounded-md transition duration-300 hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-500"
        disabled={searchPrompt === ''}
      >
        {isLoading ? (
          <div className={`spinner ${isSuccess ? 'checkmark show' : ''}`}></div>
        ) : isSuccess ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle text-green-500">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </button>

      {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
    </form>
  );
};

export default Searchbar;
