"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Title Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block">Get In Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-primary">Contact & Location</h1>
          <p className="text-dark-muted text-sm font-sans leading-relaxed">
            Have questions about our catering services, reservations, or digital ordering? Write us a message or visit us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Maps */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Block */}
            <div className="bg-white border border-accent/15 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4">
                Connect Directly
              </h2>
              
              <div className="space-y-5 text-sm text-dark-muted font-sans">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-accent/10">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-bold text-primary block text-sm">Restaurant Address</span>
                    <span className="text-xs">{restaurantConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-accent/10">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-bold text-primary block text-sm">Call/WhatsApp Support</span>
                    <a href={`tel:${restaurantConfig.phone}`} className="text-xs hover:text-accent transition-colors block">
                      Phone: {restaurantConfig.phone}
                    </a>
                    <a href={`https://wa.me/${restaurantConfig.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-accent transition-colors block">
                      WhatsApp: {restaurantConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-accent/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-bold text-primary block text-sm">Email Support</span>
                    <a href={`mailto:${restaurantConfig.email}`} className="text-xs hover:text-accent transition-colors">
                      {restaurantConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-accent/10">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-bold text-primary block text-sm">Operating Hours</span>
                    {restaurantConfig.openingHours.map((schedule, idx) => (
                      <span key={idx} className="text-xs block mt-0.5">
                        <strong className="text-primary">{schedule.days}:</strong> {schedule.hours}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="bg-white border border-accent/15 rounded-3xl p-4 shadow-md overflow-hidden space-y-4">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider px-2">Our Location on Map</h3>
              <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden relative bg-cream-dark">
                {/* Embed a Google Map with a secure default iframe for Gourmet Bengaluru */}
                <iframe
                  title="QR Bites Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3887.971933099955!2d77.59372131528659!3d12.971891490855855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1625243890123!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 transition-all duration-300"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-white border border-accent/15 rounded-3xl p-6 sm:p-10 shadow-md">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6 animate-fadeInUp">
                <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-primary">Message Sent!</h3>
                  <p className="text-xs text-dark-muted font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We have received your query and our team will get back to you at your email address within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-primary text-accent text-xs font-bold uppercase rounded-xl shadow hover:bg-primary-light"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span>Send Us a Message</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold text-primary uppercase tracking-wide">
                      Your Name <span className="text-[#E53E3E]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-primary uppercase tracking-wide">
                      Email Address <span className="text-[#E53E3E]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-bold text-primary uppercase tracking-wide">
                    Subject (Optional)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="E.g., Catering inquiry, Table reservation"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold text-primary uppercase tracking-wide">
                    Your Message <span className="text-[#E53E3E]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Enter your message details here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary hover:bg-primary-light text-cream hover:text-accent font-sans text-xs font-bold uppercase rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-accent" />
                  <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
