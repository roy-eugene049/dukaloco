import { Navbar } from "./components"
import { Hero, Shop, Categories } from "./sections"

const App = () => {

  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Shop />
        <Categories />
      </div>
    </>
  )
}

export default App