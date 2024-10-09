import React from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types/Product';

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const product: Product | undefined = location.state?.product;

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-64 h-64 object-contain mr-8"
        />
        <div>
          <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-md text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;