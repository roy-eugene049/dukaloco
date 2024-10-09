import { useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
}

export default function BestSellingComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=10')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.products)
        setLoading(false)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < products.length - 3 ? prevIndex + 1 : prevIndex))
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8 py-8 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Best Selling</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className={`p-2 rounded-full bg-lime-200 text-lime-800 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={`p-2 rounded-full bg-lime-200 text-lime-800 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 ${
              currentIndex >= products.length - 3 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex >= products.length - 3}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-lime-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-xl font-semibold">Best Selling</h3>
        </div>
        {products.slice(currentIndex, currentIndex + 3).map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
              <span className="absolute top-2 left-2 bg-lime-400 text-xs font-semibold px-2 py-1 rounded-full">
                Sale
              </span>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{product.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}