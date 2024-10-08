
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Categories = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products.slice(0, 3)));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  return (
    <div className="flex justify-center items-stretch w-full max-w-6xl mx-auto px-4 py-8 relative mt-12">
      {products.map((product, index) => (
        <div key={product.id} className="flex-1 bg-[#F8F9FB] rounded-lg shadow-sm p-6 flex flex-col justify-between border border-gray-200 min-w-[300px] ml-2">
          <div className="flex justify-between items-start h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-1">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <p className="text-2xl font-bold text-[#3B82F6] mb-4">${product.price.toFixed(2)}</p>
              </div>
              <button className="bg-[#D1F366] hover:bg-[#C1E356] text-black py-2 px-4 rounded-full flex items-center justify-center space-x-2 w-40">
                <span className="text-sm font-semibold">Shop now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center items-center w-1/2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-40 object-contain"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
            onClick={handleNext}
            className="bg-[#CDFB51] rounded-full p-2 shadow-md z-10"
            aria-label="Next product"
        >
            <ChevronRight className="w-6 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Categories;