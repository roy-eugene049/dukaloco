import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: number
  title: string
  thumbnail: string
  category: string
}

interface Category {
  name: string
  image: string
}

const specificCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture"
]

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesPromises = specificCategories.map(async (category) => {
          try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=1`)
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            const product: Product = data.products[0]
            return {
              name: category,
              image: product.thumbnail
            }
          } catch (err) {
            console.error(`Error fetching category ${category}:`, err)
            return {
              name: category,
              image: '/placeholder.svg?height=100&width=100&text=Image+Not+Found'
            }
          }
        })

        const categoriesWithImages = await Promise.all(categoriesPromises)
        setCategories(categoriesWithImages)
        setVisibleCategories(categoriesWithImages.slice(0, itemsPerPage))
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
        setError('Failed to fetch categories. Please try again later.')
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const showNextCategory = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setVisibleCategories(categories.slice(nextIndex, nextIndex + itemsPerPage))
    }
  }

  const showPreviousCategory = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1
      setCurrentIndex(previousIndex)
      setVisibleCategories(categories.slice(previousIndex, previousIndex + itemsPerPage))
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0A2540]">Shop by Categories</h2>
      <div className="grid grid-cols-5 gap-4">
        {visibleCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="h-36 flex items-center justify-center bg-gray-100 transition-transform duration-300 ease-in-out group-hover:scale-105">
              <img src={category.image} alt={category.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-center text-[#0A2540] capitalize">{category.name.replace('-', ' ')}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        {currentIndex > 0 && (
          <button
            onClick={showPreviousCategory}
            className="bg-[#CDFB51] rounded-full p-2 shadow-md z-10"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-6 h-6 text-[#0A2540]" />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        {currentIndex + itemsPerPage < categories.length && (
          <button
            onClick={showNextCategory}
            className="bg-[#CDFB51] rounded-full p-2 shadow-md z-10"
            aria-label="Next category"
          >
            <ChevronRight className="w-6 h-6 text-[#0A2540]" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Shop;