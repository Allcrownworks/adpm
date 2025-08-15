'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sensation() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsZoomed(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Combined background and form container with zoom effect */}
      <div className={`fixed inset-0 w-full h-full transform transition-all duration-500 ease-in-out ${
        isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}>
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/complete3.jpg"
            alt="Background"
            className="block w-full h-full object-center object-fill"
            fill
            priority
          />
        </div>

        {/* Form Overlay */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-blue-00 p-8 rounded-lg shadow-lg max-w-md md:max-w-2xl w-full mx-auto bg-opacity-20 backdrop-filter backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}