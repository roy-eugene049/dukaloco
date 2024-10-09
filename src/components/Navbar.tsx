import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, User, ShoppingCart, X, Menu } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface SearchResults {
  products: Product[];
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
          const data: SearchResults = await response.json();
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

  const handleUserIconClick = () => {
    navigate('/login'); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <a href="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">Duka Loco</span>
          </a>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

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
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-10 h-10 rounded-md object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-800">{product.title}</p>
                                <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
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
            <button
              type="button"
              onClick={handleUserIconClick}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <User className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
                1
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navigation */}
      <div className="bg-[#CDFA7E] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex justify-center space-x-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">Home</a>
            <a href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900">Products</a>
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center">
                Collections <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md p-2">
                <a href="/collections/smart-home" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Smart Home</a>
                <a href="/collections/watches" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Watches</a>
              </div>
            </div>
            <a href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900">Blog</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">Contact</a>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white py-2 space-y-2">
              <a href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Home</a>
              <a href="/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Products</a>
              <a href="/collections/smart-home" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Collections</a>
              <a href="/blog" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Blog</a>
              <a href="/contact" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Contact</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;