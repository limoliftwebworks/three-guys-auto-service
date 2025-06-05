"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Blog() {
  const posts = [
    {
      title: "Understanding Auto Body Repair: A Complete Guide",
      excerpt:
        "Learn about the different types of auto body repair services and when you might need them. From minor dent removal to major collision repair...",
      image: "/images/autored1.png",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Auto Body Repair",
      slug: "understanding-auto-body-repair",
    },
    {
      title: "How to Maintain Your Car's Paint Job",
      excerpt:
        "Tips and tricks for keeping your car's paint looking fresh and protecting it from environmental damage. Learn about washing, waxing, and paint protection...",
      image: "/images/autored2.png",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "Car Care",
      slug: "maintain-car-paint-job",
    },
    {
      title: "What to Do After a Car Accident",
      excerpt:
        "A step-by-step guide on what to do immediately after a car accident, from ensuring safety to documenting damage and filing insurance claims...",
      image: "/images/autored3.png",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Safety",
      slug: "what-to-do-after-accident",
    },
    {
      title: "The Benefits of Professional Auto Detailing",
      excerpt:
        "Discover why professional auto detailing is important for your car's appearance and value. Learn about the different services included...",
      image: "/images/autored4.png",
      date: "February 28, 2024",
      readTime: "4 min read",
      category: "Car Care",
      slug: "benefits-auto-detailing",
    },
    {
      title: "Common Types of Car Paint and Their Differences",
      excerpt:
        "Understanding different types of car paint, from metallic to pearl finishes. Learn about durability, maintenance, and repair considerations...",
      image: "/images/autored1.png",
      date: "February 25, 2024",
      readTime: "5 min read",
      category: "Paint",
      slug: "car-paint-types",
    },
    {
      title: "How to Choose an Auto Body Shop",
      excerpt:
        "Important factors to consider when selecting an auto body shop. From certifications to equipment and customer reviews...",
      image: "/images/autored2.png",
      date: "February 20, 2024",
      readTime: "4 min read",
      category: "Tips",
      slug: "choose-auto-body-shop",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-primary-950 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Auto Body{" "}
              <span className="text-gradient animate-gradient">Blog</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Expert tips, guides, and insights about auto body repair, car
              maintenance, and keeping your vehicle in top condition.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts.map((post, index) => (
              <motion.article
                key={index}
                variants={item}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-display font-bold mb-3 text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-20 bg-white p-12 rounded-2xl shadow-lg max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest auto body repair tips, maintenance advice, and
              industry updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
