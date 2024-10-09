
const Featured = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div 
        className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1698729616671-698072e478e3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="absolute top-1/2 left-4 sm:left-8 transform -translate-y-1/2 w-full max-w-xs sm:max-w-sm bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Premium Bluetooth Calling Smartwatch</h2>
          <ul className="text-sm sm:text-base text-gray-600 space-y-1">
            <li>1.83" (4.64 cm) HD Display</li>
            <li>100+ Sports Modes</li>
            <li>10 Days Of Battery Life</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Featured