import { useState, useEffect } from 'react';
import { Search, ChevronDown, User, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults(null);
      }
    };

    const debounce = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <a href="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">Duka Loco</span>
          </a>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {searchQuery ? (
                <X
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                />
              ) : (
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              )}
              {searchResults && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
                  {isSearching ? (
                    <div className="p-4 text-center">Searching...</div>
                  ) : (
                    <>
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-700">Suggestions</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {searchResults.products.slice(0, 2).map((product) => (
                            <span key={product.id} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                              {product.title.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-700">Products</h3>
                        <div className="space-y-2 mt-1">
                          {searchResults.products.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex items-center space-x-2">
                              <img src={product.thumbnail} alt={product.title} className="w-10 h-10 rounded-md object-cover" />
                              <div>
                                <p className="text-sm font-medium text-gray-800">{product.title}</p>
                                <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-700">Collections</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Smart Home</span>
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Smart Watches</span>
                        </div>
                      </div>
                      <div className="p-2 text-xs text-gray-500 border-t">
                        Search for "{searchQuery}"
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                EN
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <User className="h-6 w-6" />
            </button>
            <button className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="bg-green-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
            <a href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Products</a>
            <a href="/collections" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Collections</a>
            <a href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</a>
            <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <User className="h-10 w-10 rounded-full" />
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
  );
};

export default Navbar;