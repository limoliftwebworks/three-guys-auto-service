'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function ScheduleNow() {
  useEffect(() => {
    // Initialize Calendly widget when component mounts
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/taylorscollision/collision_estimate',
        parentElement: document.getElementById('calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Schedule Your Service
            </h1>
            <p className="text-lg text-blue-50">
              Book your appointment with our expert technicians. We'll get your vehicle back to its best condition.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div 
          id="calendly-inline-widget" 
          className="min-h-[700px] w-full rounded-lg shadow-xl bg-white"
        ></div>
      </div>

      {/* Calendly Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      
      <Footer />
    </main>
  );
} 