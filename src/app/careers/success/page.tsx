'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <CheckCircleIcon className="h-24 w-24 text-green-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900"
            >
              Application Submitted Successfully!
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-600 leading-relaxed">
                Thank you for your interest in joining Taylor's Collision. We have received your application and will review it carefully.
              </p>
              
              <p className="text-lg text-gray-600">
                Our team will contact you soon if your qualifications match our requirements.
              </p>
              
              <div className="h-px w-24 bg-gray-200 mx-auto my-8"></div>
              
              <p className="text-gray-500">
                In the meantime, feel free to explore more about us
              </p>
              
              <div className="flex justify-center gap-4 pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Return Home
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"></div>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10"></div>
      </section>
      
      <Footer />
    </main>
  )
} 