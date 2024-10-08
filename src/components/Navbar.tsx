import React, { useState } from 'react'
import { Search, ChevronDown, User, ShoppingCart, Menu } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Duka Loco</span>
            </a>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-4 relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                EN
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <User className="h-6 w-6" />
            </button>
            <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">0</span>
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">
              <a href="/" className="text-gray-700 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/products" className="text-gray-700 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
              <div className="relative group">
                <button className="text-gray-700 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                  Collections
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md py-1 w-48">
                  <a href="/collection1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Overview 1</a>
                  <a href="/collection2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Best Selling</a>
                  <a href="/collection3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Smart Watches</a>
                </div>
              </div>
              <a href="/blog" className="text-gray-700 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              <a href="/contact" className="text-gray-700 hover:bg-green-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
            <a href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Products</a>
            <a href="/collections" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Collections</a>
            <a href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</a>
            <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">User Name</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Your Profile</a>
              <a href="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Settings</a>
              <a href="/signout" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar