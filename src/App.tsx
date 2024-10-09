import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar, Footer, ProductDetail, LoginForm } from "./components"
import { Hero, Shop, Categories, Bentogrid, Banner, VideoCarousel, BestSelling, Featured, Products, Cart } from "./sections"
import { Product } from './types/Product'

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
  }

  const MainContent = () => (
    <>
      <Hero />
      <Shop />
      <Categories onProductSelect={handleProductSelect} />
      <Bentogrid />
      <Banner />
      <VideoCarousel />
      <BestSelling />
      <Featured />
    </>
  )

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products" element={<Products selectedProduct={selectedProduct} />} />
          <Route path="/" element={<Categories onProductSelect={() => {}} />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App