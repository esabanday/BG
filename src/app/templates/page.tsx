import Image from 'next/image'

type Template = {
  id: number
  name: string
  category: string
  image: string
  trending?: boolean
}

const mockTemplates: Template[] = [
  {
    id: 1,
    name: 'Abstract Pattern 1',
    category: 'Art & Design',
    image: '/images/templates/template1.png',
    trending: true
  },
  {
    id: 2,
    name: 'Sports Logo',
    category: 'Sports',
    image: '/images/templates/template2.png',
    trending: true
  },
  {
    id: 3,
    name: 'Business Card',
    category: 'Business',
    image: '/images/templates/template3.png',
    trending: true
  },
  {
    id: 4,
    name: 'Holiday Theme',
    category: 'Holiday',
    image: '/images/templates/template4.png',
    trending: true
  },
  // More templates for the main grid
  {
    id: 5,
    name: 'Minimalist Logo',
    category: 'Business',
    image: '/images/templates/template5.png'
  },
  {
    id: 6,
    name: 'Abstract Art',
    category: 'Art & Design',
    image: '/images/templates/template6.png'
  },
  {
    id: 7,
    name: 'Team Jersey',
    category: 'Sports',
    image: '/images/templates/template7.png'
  },
  {
    id: 8,
    name: 'Christmas Special',
    category: 'Holiday',
    image: '/images/templates/template8.png'
  }
]

export default function Templates() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-neon-blue">Design</span>{' '}
          <span className="text-neon-purple">Templates</span>
        </h1>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search templates or describe what you're looking for..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              />
            </div>
            <select className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent">
              <option>All Categories</option>
              {Array.from(new Set(mockTemplates.map(t => t.category))).map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <select className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent">
              <option>Sort By</option>
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Trending</option>
            </select>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockTemplates.filter(t => t.trending).map((template) => (
              <div key={template.id} className="group relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white mb-2">{template.name}</p>
                    <button className="w-full bg-neon-blue text-white py-2 rounded-lg hover:opacity-90">
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Templates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockTemplates.map((template) => (
              <div key={template.id} className="group relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white mb-2">{template.name}</p>
                    <button className="w-full bg-neon-blue text-white py-2 rounded-lg hover:opacity-90">
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prompt Suggestions */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Need Inspiration?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Minimalist Business Logo',
              'Vintage Sports Design',
              'Abstract Art Pattern',
              'Holiday Celebration'
            ].map((prompt) => (
              <button
                key={prompt}
                className="p-4 border border-gray-300 rounded-lg hover:border-neon-blue hover:text-neon-blue transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 