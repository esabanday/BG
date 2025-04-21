'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  colors: string[]
  sizes: string[]
}

type CartItem = Product & {
  quantity: number
  selectedColor: string
  selectedSize: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Custom T-Shirt",
    description: "Design your own unique t-shirt with our easy-to-use tools",
    price: 29.99,
    image: "/images/products/tshirt.jpg",
    colors: ["Red", "Blue", "Green", "Yellow"],
    sizes: ["Small", "Medium", "Large", "XLarge"]
  },
  {
    id: 2,
    name: "Custom Hoodie",
    description: "Create a cozy, personalized hoodie that stands out",
    price: 49.99,
    image: "/images/products/hoodie.jpg",
    colors: ["Black", "Gray", "Brown"],
    sizes: ["Small", "Medium", "Large", "XLarge"]
  },
  {
    id: 3,
    name: "Custom Tank Top",
    description: "Design the perfect tank top for your active lifestyle",
    price: 24.99,
    image: "/images/products/tank.jpg",
    colors: ["Red", "Blue", "Green", "Yellow"],
    sizes: ["Small", "Medium", "Large", "XLarge"]
  },
  {
    id: 4,
    name: "Custom Sweatshirt",
    description: "Stay warm in style with a custom-designed sweatshirt",
    price: 39.99,
    image: "/images/products/sweatshirt.jpg",
    colors: ["Red", "Blue", "Green", "Yellow"],
    sizes: ["Small", "Medium", "Large", "XLarge"]
  }
]

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0]
    }
    setCart([...cart, newItem])
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const categories = ['All', ...Array.from(new Set(products.map(p => p.name)))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">Express yourself with custom-designed apparel</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {/* Color and Size Selectors */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <div
                        key={size}
                        className="px-2 py-1 text-sm border rounded cursor-pointer hover:bg-gray-100"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                  <Link
                    href="/design-studio"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create your own design?</h2>
          <p className="text-gray-600 mb-8">
            Use our intuitive design studio to bring your vision to life
          </p>
          <Link
            href="/design-studio"
            className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Start Designing
          </Link>
        </div>
      </div>
    </div>
  )
} 