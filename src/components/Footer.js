import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';

export default function Footer() {
  return (
    <footer className="bg-dark text-cream border-t border-accent/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-accent">
              {restaurantConfig.name}
            </h3>
            <p className="text-cream/70 text-sm max-w-xs font-sans leading-relaxed">
              {restaurantConfig.tagline}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-dark-muted flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all duration-300 shadow" aria-label="Facebook">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-dark-muted flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all duration-300 shadow" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-dark-muted flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all duration-300 shadow" aria-label="Twitter">
                <Twitter className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-accent border-l-2 border-accent pl-2.5">
              Opening Hours
            </h4>
            <div className="space-y-3 pt-1">
              {restaurantConfig.openingHours.map((schedule, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-cream/80">
                  <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-cream">{schedule.days}</span>
                    <span className="text-xs text-cream/60">{schedule.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-accent border-l-2 border-accent pl-2.5">
              Contact Us
            </h4>
            <div className="space-y-3 pt-1 text-sm text-cream/80 font-sans">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{restaurantConfig.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${restaurantConfig.phone}`} className="hover:text-accent transition-colors duration-200">
                  {restaurantConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${restaurantConfig.email}`} className="hover:text-accent transition-colors duration-200">
                  {restaurantConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-cream/10 text-center text-xs text-cream/50 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {restaurantConfig.name}. All Rights Reserved.</p>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/feedback" className="hover:text-accent transition-colors">Feedback</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/menu" className="hover:text-accent transition-colors">Digital Menu</Link>
            <span>•</span>
            <Link href="/staff" className="hover:text-accent transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
