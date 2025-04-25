import Image from 'next/image'

export default function Hero() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-neon-blue">Custom</span>{' '}
              <span className="text-neon-purple">Design</span>{' '}
              <span className="text-black">on</span>{' '}
              <span className="text-neon-blue">Apparel</span>
            </h1>
            <p className="text-xl text-gray-600">
              Create unique, personalized clothing that stands out. Our custom design service brings your vision to life.
            </p>
            <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
          <div className="relative h-[500px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 rounded-lg blur-xl transform translate-x-4 translate-y-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg blur-lg transform translate-x-2 translate-y-2" />
            <div className="relative h-full">
              <Image
                src="/sample2.png"
                alt="Custom Apparel Design"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 