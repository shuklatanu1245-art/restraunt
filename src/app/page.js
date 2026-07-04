import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Heart, MapPin, Phone, Clock, MessageSquare, Utensils } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import TableTentQR from '@/components/TableTentQR';
import sql from '@/lib/db';

export default async function Home() {
  let popularItems = [];
  try {
    const items = await sql`SELECT * FROM menu_items WHERE popular = true LIMIT 3`;
    // Format to match frontend structure if needed, or just use as is
    popularItems = items.map(item => ({...item, id: item.key_id, price: parseFloat(item.price)}));
  } catch (err) {
    console.error("Failed to fetch popular items:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-dark text-cream py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
            alt="Delicious Gourmet Cuisine"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center space-y-6 sm:space-y-8 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase">
            <Utensils className="w-4 h-4" />
            <span>Welcome to Contactless Dining</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Indulge in <span className="text-accent">Culinary Perfection</span>
          </h1>

          <p className="font-sans text-base sm:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
            {restaurantConfig.tagline}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto bg-primary text-cream hover:bg-primary-light hover:text-accent font-sans text-sm font-extrabold tracking-wide uppercase px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="#scan-to-order"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/25 text-cream font-sans text-sm font-bold tracking-wide uppercase px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              Scan Table QR
            </a>
          </div>
        </div>
      </section>

      {/* Scan to Order Explanation & Tent Card Generator */}
      <div id="scan-to-order">
        <TableTentQR />
      </div>

      {/* About Us Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual block */}
            <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/25">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                alt="Family eating delicious food together"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-primary text-accent px-6 py-4 rounded-xl shadow-lg border border-accent/15">
                <span className="block font-serif text-3xl font-black">Family</span>
                <span className="block font-sans text-[10px] uppercase font-bold tracking-wider text-cream">Moments & Memories</span>
              </div>
            </div>

            {/* Narrative block */}
            <div className="space-y-6">
              <div className="inline-block text-accent text-xs font-bold tracking-widest uppercase border-b-2 border-accent pb-1">
                Our Story
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                Crafting Culinary Memories Since 2018
              </h2>
              <p className="text-dark-muted font-sans leading-relaxed text-sm sm:text-base">
                At <strong>{restaurantConfig.name}</strong>, we believe dining should be an artful blend of delectable flavors, warm hospitality, and modern convenience. Our expert culinary team hand-selects organic spices, locally-sourced produce, and premium meats to cook up dishes that sing on your palate.
              </p>
              <p className="text-dark-muted font-sans leading-relaxed text-sm sm:text-base">
                By pioneering the table-side digital menu, we allow you to take complete control of your dining timeline. Browse our offerings at your own pace, send orders straight to the kitchen, and pay securely whenever you are ready. 
              </p>
              <div className="pt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-primary">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-sans text-sm font-bold">4.9 Star Rating</span>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <Heart className="w-5 h-5 fill-[#E53E3E] text-[#E53E3E]" />
                  <span className="font-sans text-sm font-bold">10k+ Happy Diners</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section className="py-20 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-widest uppercase block">Chef's Recommendations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">Popular Delicacies</h2>
            <p className="text-dark-muted text-sm font-sans">
              A curated selection of our guests' absolute favorites. Treat yourself to the best bites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-accent/10 hover:border-accent/30 group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden bg-cream-dark">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary/95 text-accent text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-accent/25">
                    Popular
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 text-primary text-xs font-black px-2.5 py-1 rounded-md shadow-sm border border-accent/10">
                    ₹{item.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-primary group-hover:text-accent transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-xs text-dark-muted font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={`/menu?select=${item.id}`}
                    className="w-full text-center py-2.5 bg-cream hover:bg-primary hover:text-white border border-primary/20 text-primary font-sans text-xs font-bold uppercase rounded-xl transition-all duration-300"
                  >
                    View & Order
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center space-x-2 text-primary font-sans font-bold uppercase tracking-wider hover:text-accent group text-sm"
            >
              <span>Explore Entire Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-widest uppercase block">Visual Feast</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">Ambience & Craft</h2>
            <p className="text-dark-muted text-sm font-sans">
              Take a virtual tour of our kitchen creations and cozy dining spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurantConfig.gallery.map((img) => (
              <div
                key={img.id}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-accent/15 transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Description Slide-in */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-cream space-y-1">
                  <h4 className="font-serif text-base font-bold text-accent">
                    {img.title}
                  </h4>
                  <p className="text-xs text-cream/80 font-sans leading-relaxed">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Summary Map Link */}
      <section className="py-16 bg-dark text-cream border-t border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-muted rounded-3xl p-8 sm:p-12 border border-accent/15 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-accent text-xs font-bold tracking-widest uppercase block">Ready to visit?</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">Find Us in Gwalior</h2>
              <p className="text-cream/70 text-sm max-w-md font-sans">
                {restaurantConfig.address}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2 text-xs text-cream/90 font-sans">
                <span className="flex items-center"><Phone className="w-4 h-4 text-accent mr-2" /> {restaurantConfig.phone}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 text-accent mr-2" /> Open Daily from 11:00 AM</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center bg-primary text-cream hover:bg-primary-light hover:text-accent font-sans text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow transition-all duration-300"
              >
                Get Directions
              </Link>
              <Link
                href="/feedback"
                className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-sans text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-accent" />
                <span>Share Feedback</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
