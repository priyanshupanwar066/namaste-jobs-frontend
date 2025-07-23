"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Rocket, 
  Users, 
  Handshake, 
  MapPin, 
  Lightbulb, 
  Briefcase 
} from "lucide-react";                           
import { useEffect, useState } from "react";

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Namaste Jobs
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your premier destination for connecting talent with opportunity across Indias dynamic job market
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Rocket className="h-12 w-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            To revolutionize job searching in India through innovative technology, personalized career guidance, 
            and direct access to top employers across all industries.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Briefcase, title: "Diverse Listings", color: "text-blue-600", 
            content: "10,000+ active job postings across 50+ industries" },
          { icon: Users, title: "Trusted Network", color: "text-purple-600",
            content: "Partnered with 500+ leading Indian companies" },
          { icon: Lightbulb, title: "Career Growth", color: "text-green-600",
            content: "Personalized career development resources" },
          { icon: MapPin, title: "Nationwide Reach", color: "text-red-600",
            content: "Opportunities in 100+ cities across India" },
          { icon: Handshake, title: "Direct Hiring", color: "text-orange-600",
            content: "Connect directly with company HR teams" },
          { icon: Briefcase, title: "Quick Apply", color: "text-pink-600",
            content: "One-click application process" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <feature.icon className={`h-12 w-12 mb-6 ${feature.color}`} />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.content}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Career Journey Today</h2>
          <Link
            href="/jobs"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold
            hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-lg"
          >
            Explore Job Opportunities →
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;