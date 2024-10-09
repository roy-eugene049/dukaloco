# DukaLoco - E-Commerce Platform

DukaLoco is a modern e-commerce web application designed to provide a seamless shopping experience. It features searching, sorting, and filtering of products, ensuring users can easily navigate and find what they're looking for.

This project is built using **React**, **React Router**, **TailwindCSS**, **Vite**, and **TypeScript**, offering a scalable, fast, and responsive user interface.

## Features

- **Product Search**: Users can search for products dynamically.
- **Sorting**: Products can be sorted by various parameters like price, rating, etc.
- **Filtering**: Filter products by category, price range, and more.
- **Responsive Design**: The application is responsive and works across multiple screen sizes.
- **Carousel Support**: Includes product carousels and video integrations.
- **Clean UI**: Styled using TailwindCSS for fast, clean, and consistent design.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: Enables dynamic routing in the application.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast frontend build tool and development server.
- **TypeScript**: Superset of JavaScript which adds static typing to enhance code quality.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/roy-eugene049/dukaloco.git

Navigate to the project directory:

```cd dukaloco

Install dependencies:

```npm install

Run the development server:

```npm run dev

Open your browser and navigate to:

http://localhost:5173

##Project Structure

The project's main structure is as follows:

├── src
│   ├── assets         # Static assets (images, videos)
│   ├── components     # Reusable UI components
│   ├── sections       # Main page components (Home, Products, etc.)
│   ├── types          # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Application entry point
│   └── ...
├── public             # Static public files
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── ...

Deployment
For deployment, you can build the project using:

npm run build

This will create an optimized production build in the dist folder, which can then be deployed to any static hosting provider like Vercel, Netlify, etc.