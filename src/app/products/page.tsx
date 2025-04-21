'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type Product = {
  id: number
  name: string
  price: number
  category: string
  colors: string[]
  sizes: string[]
  image: string
}

type CartItem = Product & {
  quantity: number
  selectedColor: string
  selectedSize: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Tote Bag',
    price: 19.99,
    category: 'Bags',
    colors: ['Black', 'White', 'Navy'],
    sizes: ['Standard'],
    image: '/images/products/tote1.png'
  },
  {
    id: 2,
    name: 'Custom Socks',
    price: 12.99,
    category: 'Socks',
    colors: ['Black', 'White', 'Gray'],
    sizes: ['S', 'M', 'L'],
    image: '/images/products/socks.png'
  },
  {
    id: 3,
    name: 'Classic T-Shirt',
    price: 24.99,
    category: 'T-Shirts',
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/products/tshirt.png'
  }
]

export default function Products() {
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

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-neon-blue">Shop</span>{' '}
          <span className="text-neon-purple">Products</span>
        </h1>

        {/* Cart Button */}
        <button 
          onClick={() => setShowCart(!showCart)}
          className="fixed top-24 right-4 bg-neon-purple text-white p-3 rounded-full shadow-lg z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-neon-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed top-0 right-0 w-96 h-screen bg-white shadow-lg p-6 z-40">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.selectedColor} - {item.selectedSize}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <span>${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-neon-blue text-white py-3 rounded-lg">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-neon-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockProducts
            .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
            .map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                  <p className="text-neon-purple font-bold mb-4">${product.price}</p>
                  <div className="flex space-x-2 mb-4">
                    {product.colors.map(color => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-neon-blue text-white py-2 rounded-lg hover:opacity-90"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
} 