"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github 
} from "lucide-react";
import axios from "axios";

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    message: "" 
  });

 // Update the onSubmit function
const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSubmitStatus({ success: false, message: "" });
  
  try {
    const response = await axios.post('/api/contact', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    });

    if (response.data.success) {
      setSubmitStatus({
        success: true,
        message: response.data.message
      });
      reset();
    }
  } catch (error) {
    console.error('Client Error:', error);
    setSubmitStatus({
      success: false,
      message: error.response?.data?.message || 'Network error. Please check your connection.'
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions or need assistance? Reach out to our team - we are here to help you 
          navigate your career journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <a 
                      href="mailto:priyanshupanwar841@gmail.com" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      priyanshupanwar841@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 7078041562</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Office Address</h3>
                    <address className="text-gray-600 not-italic">
                      123 Business Street<br />
                      Saharanpur, Uttarpradesh<br />
                      India - 247001
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                {[
                  { icon: Facebook, link: "#", color: "text-blue-600" },
                  { icon: Twitter, link: "#", color: "text-sky-500" },
                  { icon: Linkedin, link: "#", color: "text-blue-700" },
                  { icon: Github, link: "#", color: "text-gray-700" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className={`${social.color} hover:opacity-80 transition-opacity`}
                    aria-label={`${social.icon.name} page`}
                  >
                    <social.icon className="h-7 w-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Full Name *
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            className={`w-full px-4 py-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email Address *
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            id="email"
            className={`w-full px-4 py-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
            Subject *
          </label>
          <input
            {...register("subject", { required: "Subject is required" })}
            type="text"
            id="subject"
            className={`w-full px-4 py-3 border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Enter subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
            Message *
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 20,
                message: "Message must be at least 20 characters"
              }
            })}
            id="message"
            rows="5"
            className={`w-full px-4 py-3 border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Type your message here..."
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {submitStatus.message && (
              <div className={`p-4 rounded-lg ${
                submitStatus.success 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg
              hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-gray-100"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.432125867688!2d77.54031431510262!3d29.394239482123234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c149991a82b1f%3A0x5d3e8a6b2e3e3b7a!2sSaharanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v162987654321!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-2xl"
        ></iframe>
      </motion.div>
    </div>
  );
}