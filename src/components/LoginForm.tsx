
const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">
              New customer?{' '}
              <a href="#" className="text-[#84CC16] font-semibold">
                Create account
              </a>
            </p>
            <a href="#" className="text-sm text-gray-500">
              Forgot password?
            </a>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#CDFB51] hover:bg-[#C1E356] text-black font-semibold py-2 px-6 rounded-md"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm