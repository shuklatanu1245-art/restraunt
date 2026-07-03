"use client";

import React, { useState } from 'react';
import { Star, MessageSquare, User, Phone, CheckCircle2, Heart } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [ratings, setRatings] = useState({
    foodQuality: 0,
    serviceQuality: 0,
    ambience: 0,
    overallExperience: 0
  });

  const [hoverRatings, setHoverRatings] = useState({
    foodQuality: 0,
    serviceQuality: 0,
    ambience: 0,
    overallExperience: 0
  });

  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const categories = [
    { key: 'foodQuality', label: 'Food Quality', desc: 'Taste, presentation, and freshness' },
    { key: 'serviceQuality', label: 'Service Quality', desc: 'Speed, politeness, and attentiveness' },
    { key: 'ambience', label: 'Ambience & Vibe', desc: 'Cleanliness, music, lighting, and seating' },
    { key: 'overallExperience', label: 'Overall Experience', desc: 'Value for money and overall impression' }
  ];

  const handleRatingSelect = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: null }));
    }
  };

  const handleHoverSelect = (category, value) => {
    setHoverRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple Validation: Require all ratings
    const newErrors = {};
    categories.forEach(cat => {
      if (ratings[cat.key] === 0) {
        newErrors[cat.key] = 'Please select a star rating';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementById(`rating-heading-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ratings,
          comments,
          customerDetails: {
            name: name || 'Anonymous',
            mobile: mobile || 'N/A'
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submission error:', err);
      setSubmitError('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[85vh] bg-cream flex items-center justify-center p-4 py-16">
        <div className="bg-white border border-accent/15 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-fadeInUp">
          <div className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-12 h-12 fill-[#25D366]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Submission Successful</span>
            <h2 className="font-serif text-3xl font-black text-primary">Thank You!</h2>
            <p className="text-sm text-dark-muted font-sans max-w-xs mx-auto leading-relaxed">
              We appreciate you taking the time to share your feedback. Your inputs help us elevate our standards and serve you better!
            </p>
          </div>

          <div className="pt-4 border-t border-accent/10 space-y-3 font-sans">
            <Link
              href="/menu"
              className="w-full py-3.5 bg-[#7A0C16] hover:bg-primary-light text-cream hover:text-accent text-xs font-bold uppercase rounded-xl shadow-lg transition-all block text-center"
            >
              Back to Menu
            </Link>
            
            <Link
              href="/"
              className="text-xs text-dark-muted font-semibold underline hover:text-primary block"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-accent/15 rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp">
        
        {/* Banner */}
        <div className="bg-primary text-cream p-8 text-center space-y-2 border-b border-accent/20">
          <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Customer Reviews</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Help Us Improve</h2>
          <p className="text-xs text-cream/70 font-sans max-w-sm mx-auto">
            Your rating fuels our fire! Tell us about your dining, service, and atmosphere experience today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          
          {/* Star ratings grid */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary border-b border-accent/10 pb-3 flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span>Rate Your Experience</span>
            </h3>

            <div className="space-y-6">
              {categories.map((cat) => {
                const currentRating = ratings[cat.key];
                const currentHover = hoverRatings[cat.key];
                const activeStars = currentHover || currentRating;

                return (
                  <div key={cat.key} className="space-y-2.5 p-3 rounded-2xl hover:bg-cream-dark/20 transition-colors duration-150">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 id={`rating-heading-${cat.key}`} className="font-sans font-bold text-sm text-primary">
                          {cat.label}
                        </h4>
                        <p className="text-xs text-dark-muted font-sans">
                          {cat.desc}
                        </p>
                      </div>
                      {errors[cat.key] && (
                        <span className="text-[10px] text-[#E53E3E] font-bold uppercase tracking-wider bg-[#E53E3E]/5 px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>

                    {/* Star Row */}
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingSelect(cat.key, star)}
                          onMouseEnter={() => handleHoverSelect(cat.key, star)}
                          onMouseLeave={() => handleHoverSelect(cat.key, 0)}
                          className="p-1 focus:outline-none transition-transform active:scale-95 duration-100"
                          aria-label={`Rate ${star} stars out of 5 for ${cat.label}`}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors duration-150 ${
                              star <= activeStars
                                ? 'text-accent fill-accent'
                                : 'text-accent/20'
                            }`}
                          />
                        </button>
                      ))}
                      {currentRating > 0 && (
                        <span className="text-xs font-bold text-accent font-sans ml-2 uppercase tracking-wide">
                          {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][currentRating - 1]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 pt-4 border-t border-accent/10">
            <h3 className="font-serif text-lg font-bold text-primary pb-1 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <span>Share More Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="block text-xs font-bold text-primary uppercase tracking-wide">
                  Your Name (Optional):
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="block text-xs font-bold text-primary uppercase tracking-wide">
                  Mobile Number (Optional):
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    id="phone-input"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-white border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="comments-textarea" className="block text-xs font-bold text-primary uppercase tracking-wide">
                Suggestions or Comments:
              </label>
              <textarea
                id="comments-textarea"
                rows={3}
                placeholder="Let us know what we did well, or how we can improve..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full bg-white border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-sans resize-none"
              />
            </div>
          </div>

          {/* Database connected badge */}
          <div className="p-4 bg-[#25D366]/5 rounded-2xl border border-[#25D366]/20 text-[10px] text-dark-muted font-sans leading-relaxed flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0"></span>
            <span><strong className="text-[#25D366]">Connected to Database:</strong> Your feedback is saved securely to our Neon PostgreSQL cloud database in real-time.</span>
          </div>

          {/* Error message */}
          {submitError && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-600 font-sans font-semibold text-center">
              ⚠️ {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-primary hover:bg-primary-light text-cream hover:text-accent font-sans text-xs font-bold uppercase rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving to Database...</span>
              </>
            ) : (
              <span>Submit Feedback</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
