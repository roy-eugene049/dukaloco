import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types/Product';

interface ProductsProps {
  selectedProduct: Product | null;
}

const Products: React.FC<ProductsProps> = ({ selectedProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: false,
    priceRange: [0, Infinity],
    brand: '',
  });

  const { addToCart } = useCart();  // Access the cart context
  const navigate = useNavigate();   // For navigating to ProductDetail

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    let result = products;

    if (filters.inStock) {
      result = result.filter(product => product.stock > 0);
    }
    if (filters.outOfStock) {
      result = result.filter(product => product.stock === 0);
    }
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    if (filters.brand) {
      result = result.filter(product => product.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleSort = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (filterType: string, value: boolean | number[] | string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });  // Navigate to ProductDetail
  };

  const renderProductDetails = (product: Product) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-2">Brand: {product.brand}</p>
      <p className="mb-2">Category: {product.category}</p>
      <p className="mb-2">Rating: {product.rating}/5</p>
      <p className="mb-4">Stock: {product.stock}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => addToCart(product)}  // Add to cart action
      >
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {selectedProduct ? (
        renderProductDetails(selectedProduct)
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={filters.inStock}
                    onChange={e => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span className="ml-2">In stock</span>
                </label>
                <label className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={filters.outOfStock}
                    onChange={e => handleFilterChange('outOfStock', e.target.checked)}
                  />
                  <span className="ml-2">Out of stock</span>
                </label>
              </div>
              <div>
                <h3 className="font-medium mb-2">Price</h3>
                <input
                  type="range"
                  title="price"
                  min="0"
                  max="2000"
                  step="100"
                  className="w-full"
                  onChange={e => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                />
                <div className="flex justify-between">
                  <span>$0</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Brand</h3>
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder="Search brands"
                  onChange={e => handleFilterChange('brand', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} Products
              </p>
              <button className="flex items-center text-sm font-medium" onClick={handleSort}>
                Sort by: Alphabetically, A-Z
                {sortOrder === 'asc' ? (
                  <ChevronDown className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronUp className="ml-1 w-4 h-4" />
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => handleProductClick(product)}  // Navigate to product detail
                >
                  <div className="relative pb-[56.25%]">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      {product.discountPercentage > 0 && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;