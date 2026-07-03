import React from 'react';
import { ShieldCheck, Heart, Users, Utensils, Star, Clock } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block bg-primary/5 px-3 py-1 rounded-full w-fit mx-auto">
            Our Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-primary tracking-tight">
            About Taste Bite
          </h1>
          <p className="text-dark-muted text-sm sm:text-base font-sans leading-relaxed">
            Discover the philosophy, journey, and dedicated team behind Gwalior's premier contactless gourmet destination.
          </p>
        </div>

        {/* Hero Family Photo and Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-accent/20">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
              alt="Family eating delicious food together at Taste Bite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-cream">
              <span className="text-xs font-bold uppercase tracking-wider block text-accent">Taste Bite Family</span>
              <span className="font-serif text-xl sm:text-2xl font-black mt-0.5 block">Bringing Families Closer, One Bite at a Time.</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary">
              Crafting Togetherness
            </h2>
            <p className="text-dark-muted text-sm sm:text-base font-sans leading-relaxed">
              Founded in 2018, <strong>{restaurantConfig.name}</strong> was born out of a simple idea: that dining should be a celebration of great taste, shared conversations, and absolute convenience. We wanted to build a space where families could gather without the typical friction of dining out.
            </p>
            <p className="text-dark-muted text-sm sm:text-base font-sans leading-relaxed">
              By blending authentic recipes with advanced, table-side digital ordering, we give you control over your dining pace. No waiting for menus or bills — just pure, uninterrupted time with your loved ones.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-accent/15 rounded-2xl p-4 bg-white shadow-sm flex items-center space-x-3">
                <Heart className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs font-bold text-primary">Made with Love</span>
              </div>
              <div className="border border-accent/15 rounded-2xl p-4 bg-white shadow-sm flex items-center space-x-3">
                <Utensils className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs font-bold text-primary">Pure Ingredients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Pillars / Core Values */}
        <div className="bg-white border border-accent/15 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h3 className="font-serif text-2xl font-bold text-primary">Our Core Values</h3>
            <p className="text-xs text-dark-muted font-sans">What drives us to deliver the finest culinary experiences day in and day out.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-accent/10 mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-sans font-bold text-primary text-base">Uncompromised Quality</h4>
              <p className="text-xs text-dark-muted leading-relaxed">
                From fresh farm produce to our signature ground chais and spices, every ingredient undergoes rigorous safety and quality checks.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-accent/10 mx-auto sm:mx-0">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-sans font-bold text-primary text-base">Community & Vibe</h4>
              <p className="text-xs text-dark-muted leading-relaxed">
                We design our spaces to be warm, comfortable, and inclusive, inviting friends, families, and professionals to build connections.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-accent/10 mx-auto sm:mx-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-sans font-bold text-primary text-base">Modern Convenience</h4>
              <p className="text-xs text-dark-muted leading-relaxed">
                By prioritizing digital-first innovations, we value your time. Scan, order, pay, and receive your food with zero delay.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-cream rounded-3xl p-8 sm:p-12 border border-accent/20 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="font-serif text-3xl font-black">Experience Taste Bite Today</h3>
            <p className="text-cream/80 text-sm font-sans">
              Come visit us at Maharaja Complex DD Nagar Gwalior, or explore our menu and order instantly from your phone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 font-sans">
              <Link
                href="/menu"
                className="bg-white text-primary hover:bg-cream hover:text-primary-dark text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Explore Menu
              </Link>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 border border-white/20 text-cream text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
