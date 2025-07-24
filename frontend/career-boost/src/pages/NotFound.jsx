import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-8xl font-bold mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
    <p className="mb-8 text-gray-500">The page you are looking for does not exist or has been moved.</p>
    <Link
      to="/"
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
    >
      Go to Homepage
    </Link>
  </div>
);

export default NotFound; 