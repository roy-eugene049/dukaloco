import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types/Product';

interface CategoriesProps {
  onProductSelect: (product: Product) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onProductSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the API
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products.slice(0, 10)));  // Fetch 10 products
  }, []);

  // Navigate to the next set of products in the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= products.length ? 0 : prevIndex + 3
    );
  };

  // Navigate to the previous set of products in the carousel
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? products.length - 3 : prevIndex - 3
    );
  };

  // Navigate to the product details page when a product is clicked
  const handleShopNow = (product: Product) => {
    if (product) {
      onProductSelect(product);  // Trigger the callback to set the selected product
      navigate(`/product/${product.id}`, { state: { product } });  // Navigate to product detail page
    }
  };

  return (
    <div className="flex justify-center items-center w-full max-w-7xl mx-auto px-4 py-8 relative mt-12">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 transform -translate-y-1/2 top-1/2 bg-[#CDFB51] rounded-full p-2 shadow-md hover:bg-[#B9EA49] z-10 flex items-center justify-center"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Product Carousel */}
      <div className="flex justify-between items-stretch w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.slice(currentIndex, currentIndex + 3).map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-[#F8F9FB] rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start h-full">
                <div className="flex flex-col justify-between h-full w-1/2">
                  <div>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1E293B] mb-1">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-xl md:text-2xl font-bold text-[#3B82F6] mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="bg-[#D1F366] hover:bg-[#C1E356] text-black py-2 px-4 rounded-full flex items-center justify-center space-x-2"
                    onClick={() => handleShopNow(product)}
                  >
                    <span className="text-sm font-semibold">Shop now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center items-center w-1/2">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-32 w-32 md:h-40 md:w-40 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 transform -translate-y-1/2 top-1/2 bg-[#CDFB51] rounded-full p-2 shadow-md hover:bg-[#B9EA49] z-10 flex items-center justify-center"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Categories;