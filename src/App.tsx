import { Navbar, Footer } from "./components"
import { Hero, Shop, Categories, Bentogrid, Banner, VideoCarousel } from "./sections"

const App = () => {

  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Shop />
        <Categories />
        <Bentogrid />
        <Banner />
        <VideoCarousel />
        <Footer />
      </div>
    </>
  )
}

export default App