import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="glass-panel p-4 rounded-2xl overflow-hidden shadow-xl relative">
        <Image
          src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147"
          height={600}
          width={600}
          alt="Featured Products"
          className="w-full aspect-[4/3] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          priority
        />

        {/* Enhanced Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        
        {/* Enhanced Floating Stats Cards */}
        <div className="absolute top-4 left-4 glass-panel px-4 py-3 rounded-lg backdrop-blur-md bg-white/95 shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium text-gray-900">Premium Quality</p>
          </div>
          <p className="text-xs text-gray-600 mt-1">100% Satisfaction</p>
        </div>
        
        <div className="absolute bottom-4 right-4 glass-panel px-4 py-3 rounded-lg backdrop-blur-md bg-white/95 shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-sm font-medium text-gray-900">Fast Shipping</p>
          </div>
          <p className="text-xs text-gray-600 mt-1">Worldwide Delivery</p>
        </div>

        {/* New Feature Badge */}
        <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full backdrop-blur-md bg-white/95 shadow-lg">
          <p className="text-xs font-medium text-blue-600">New Arrivals</p>
        </div>
      </div>

      {/* Enhanced Additional Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse" />
    </div>
  );
}