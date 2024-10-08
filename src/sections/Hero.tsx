import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: number
  title: string
  description: string
  images: string[]
  category: string
}

const CATEGORIES = ['smartphones', 'laptops', 'fragrances', 'skincare']

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          CATEGORIES.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`)
              .then(res => res.json())
              .then(data => data.products[0])
          )
        )
        setProducts(fetchedProducts.filter(Boolean))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return <div className="text-center text-2xl text-red-500">Error loading products. Please try again later.</div>
  }

  const currentProduct = products[currentProductIndex]

  if (!currentProduct) {
    return <div className="text-center text-2xl text-red-500">Error: Product not found.</div>
  }

  return (
    <div className="relative bg-white h-screen flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 text-gray-100 text-[200px] font-bold opacity-20 pointer-events-none">
        Speakers
      </div>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentProduct.title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {currentProduct.description.split('.')[0]}.<br />
            {currentProduct.description.split('.')[1] || ''}
          </p>
          <button className="bg-green-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition duration-300">
            Shop Now
          </button>
        </div>
        <div className="w-1/2 relative flex justify-center items-center">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.title}
            className="w-auto h-auto max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-10 flex items-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentProductIndex ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentProductIndex(index)}
          />
        ))}
      </div>
      <div className="absolute bottom-10 right-10 flex items-center space-x-4">
        <button
          onClick={prevProduct}
          className="bg-green-300 hover:bg-green-400 text-gray-800 rounded-full p-2 transition duration-300"
          aria-label="Previous product"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextProduct}
          className="bg-green-300 hover:bg-green-400 text-gray-800 rounded-full p-2 transition duration-300"
          aria-label="Next product"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default Hero;