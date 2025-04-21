import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            About BandayGlam
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            We're revolutionizing the way people express themselves through custom apparel. 
            Our mission is to make design accessible to everyone.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, BandayGlam emerged from a simple idea: everyone deserves to wear 
              their creativity. We noticed a gap between professional design tools and user-friendly 
              interfaces, and we set out to bridge it.
            </p>
            <p className="text-gray-600">
              Today, we're proud to offer a platform that combines powerful design capabilities 
              with an intuitive user experience, making custom apparel design accessible to everyone.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/about-story.jpg"
              alt="Our Story"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly push boundaries to create better design experiences."
              },
              {
                title: "Sustainability",
                description: "Environmental responsibility is at the core of our production process."
              },
              {
                title: "Community",
                description: "We believe in fostering creativity and supporting designers worldwide."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "/images/team/sarah.jpg"
            },
            {
              name: "Mike Chen",
              role: "Head of Design",
              image: "/images/team/mike.jpg"
            },
            {
              name: "Emma Davis",
              role: "Tech Lead",
              image: "/images/team/emma.jpg"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 