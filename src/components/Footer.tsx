import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log('Submitted email:', email);
  };

  return (
    <footer className="bg-gray-50 text-gray-600 py-12 px-4 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Duka Loco Section */}
        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-xl font-bold text-gray-800">Duka Loco</h2>
          <p className="text-sm leading-relaxed">
            We have it all under one roof. Our carefully curated collection includes products from renowned brands known for their quality and reliability.
          </p>
          <div className="space-y-4">
            <h3 className="font-semibold">Subscribe to our emails</h3>
            <form onSubmit={handleSubmit} className="flex max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-grow px-3 py-2 text-sm rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                →
              </button>
            </form>
          </div>
          <div className="flex space-x-4">
            {['facebook', 'instagram', 'twitter', 'threads', 'whatsapp', 'pinterest', 'tiktok', 'tumblr', 'snapchat', 'youtube', 'vimeo', 'spotify', 'linkedin', 'discord', 'email'].map((social) => (
              <a key={social} href={`#${social}`} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">{social}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Popular Collections */}
        <div>
          <h3 className="font-semibold mb-4">Popular collections</h3>
          <ul className="space-y-2">
            {['Earbuds', 'Headphones', 'Smart watches', 'Power banks', 'Speakers'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <ul className="space-y-2">
            {['About', 'Contact', 'Track order', 'Terms & conditions', 'Privacy policy'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Go Through */}
        <div>
          <h3 className="font-semibold mb-4">Go through</h3>
          <ul className="space-y-2">
            {['Home', 'Products', 'Collections', 'Blog', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Find it Here */}
        <div>
          <h3 className="font-semibold mb-4">Find it here</h3>
          <ul className="space-y-2">
            <li><a href="#search" className="hover:underline">Search</a></li>
          </ul>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="mt-12 text-center">
        <p className="text-sm mb-4">We accept:</p>
        <div className="flex justify-center space-x-4">
          {['visa', 'mastercard', 'amex', 'paypal', 'diners', 'discover'].map((payment) => (
            <div key={payment} className="w-12 h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm">
        <p>© Copyright 2024, Duka Loco</p>
      </div>
    </footer>
  );
};

export default Footer;