import Hero from '@/components/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Popular Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['T-Shirts', 'Hoodies', 'Tank Tops'].map((product) => (
              <div key={product} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={`/images/${product.toLowerCase().replace(' ', '')}.png`}
                    alt={product}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product}</h3>
                  <p className="text-gray-600">Starting at 120 d.h.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Free Design Tools',
              'Quality Guarantee',
              'Fast Shipping'
            ].map((feature) => (
              <div key={feature} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 