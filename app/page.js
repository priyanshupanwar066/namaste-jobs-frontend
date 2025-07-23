"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

function PaginationFooter({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="p-5 text-center text-gray-500 flex justify-center items-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageOtherJobs, setCurrentPageOtherJobs] = useState(1);
  const [currentPageTechJobs, setCurrentPageTechJobs] = useState(1);
  const jobsPerPage = 10; // Updated to 10 jobs per page

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = fetch(`https://namaste-jobs-backend.onrender.com/api/jobs/${id}`);
, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();
        const jobsArray = Array.isArray(data) ? data : data.jobs || [];
        const sortedJobs = jobsArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const jobFilters = [
    { name: "Latest Jobs", category: "latest-jobs", color: "bg-red-600" },
    { name: "Job in Gujarat", location: "gujarat", color: "bg-green-800" },
    { name: "Job in Haryana", location: "haryana", color: "bg-purple-700" },
    { name: "Job in NCR", location: "ncr", color: "bg-gray-800" },
    { name: "Job in Noida", location: "noida", color: "bg-blue-800" },
    { name: "Job in Delhi", location: "delhi", color: "bg-indigo-800" },
    { name: "10th Pass", category: "10th-pass", color: "bg-red-600" },
    { name: "12th Pass", category: "12th-pass", color: "bg-purple-700" },
    { name: "Graduation Pass", category: "graduation", color: "bg-green-800" },
    { name: "B.Tech", category: "btech", color: "bg-black" },
    { name: "MBA Pass", category: "mba", color: "bg-indigo-800" },
    { name: "Diploma Pass", category: "diploma", color: "bg-blue-800" },
  ];

  const handleFilterClick = (category, location) => {
    let query = "/jobs?";
    if (category) query += `category=${encodeURIComponent(category)}`;
    if (location) query += `location=${encodeURIComponent(location)}`;
    router.push(query);
  };

  const isNew = (createdAt) => {
    const jobDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return jobDate > sevenDaysAgo;
  };

  const TECH_CATEGORIES = [
    "IT",
    "SOFTWARE DEVELOPER",
    "AI & ML",
    "CLOUD COMPUTING",
    "DATA SCIENCE",
    "CYBER SECURITY",
    "DEVOPS",
    "MOBILE DEVELOPMENT",
    "DATABASE MANAGEMENT",
    "NETWORKING",
    "TECHNICAL SUPPORT",
    "BLOCKCHAIN",
    "GAME DEVELOPMENT",
    "IT SUPPORT",
  ];

  // Paginate jobs
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );
  const otherJobs = jobs.filter((job) => !TECH_CATEGORIES.includes(job.category));
  const paginatedOtherJobs = otherJobs.slice(
    (currentPageOtherJobs - 1) * jobsPerPage,
    currentPageOtherJobs * jobsPerPage
  );
  const techJobs = jobs.filter((job) =>
    TECH_CATEGORIES.includes((job.category || "").toUpperCase())
  );
  const paginatedTechJobs = techJobs.slice(
    (currentPageTechJobs - 1) * jobsPerPage,
    currentPageTechJobs * jobsPerPage
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between mt-14 py-6 px-10 bg-gradient-to-br from-purple-800 via-indigo-700 to-teal-600 text-white rounded-xl overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex relative justify-center">
          <Image
            src="/namastejobs.png"
            alt="Success Journey"
            width={500}
            height={350}
            className="h-112 w-112 object-cover rounded-full shadow-2xl"
          />
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            <span className="text-yellow-300">Sahi Job</span> Chuno,
            <br />
            Apna Future Banao!
          </h1>
          <p className="text-lg font-medium italic">
            Aaj ka ek sahi decision, kal ka best future ban sakta hai
          </p>

          {/* Buttons */}
          <div className="mt-20 ml-20 flex gap-5 relative z-30">
            <Link
              href="/jobs"
              className="relative z-30 flex items-center px-6 py-3 bg-white text-gray-900 
             rounded-md font-medium text-base border border-gray-200 hover:bg-gray-100 
             transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Find Jobs
            </Link>

            <Link
              href="/about"
              className="relative z-30 flex items-center px-6 py-3 bg-blue-600 text-white 
             rounded-md font-medium text-base hover:bg-blue-700 transition-colors 
             duration-200 shadow-sm hover:shadow-md border border-blue-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute bottom-24 right-10 w-24 h-24 bg-white rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-94 right-336 w-24 h-24 bg-white rounded-full opacity-20 animate-ping"></div>

        {/* Wave Effect at Bottom */}
        <svg
          className="absolute bottom-[-5px] left-0 w-full "
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,218.7C640,203,800,149,960,149.3C1120,149,1280,203,1360,229.3L1440,256V320H0Z"
          ></path>
        </svg>
      </section>

      {/* New Section: Job Filters */}
      <section className="mt-16 px-4 py-12 bg-white rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
            Find Jobs By
            <span className="block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mt-2">
              Location & Qualification
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {jobFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() =>
                  handleFilterClick(filter.category, filter.location)
                }
                className={`
                  ${filter.color} 
                  text-white 
                  font-semibold 
                  py-4 
                  px-4 
                  rounded-xl 
                  shadow-md 
                  hover:shadow-xl 
                  transition-all 
                  duration-200 
                  transform 
                  hover:-translate-y-1 
                  active:translate-y-0
                  text-sm
                  md:text-base
                `}
              >
                {filter.name}
              </button>
            ))}
          </div>
         
          {/* What's Hot - Job Ticker */}
          <div className="relative mt-8 mb-4">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl transform rotate-1"></div>
            <div className="bg-white rounded-xl shadow-md py-3 px-4 border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </span>
                <h3 className="font-semibold text-gray-700">TRENDING TODAY</h3>
              </div>
              <Marquee
                speed={40}
                gradient={true}
                gradientColor={[255, 255, 255]}
                gradientWidth={50}
              >
                {jobs.slice(0, 10).map((job, index) => (
                  <Link
                    key={job._id}
                    href={`/jobs/${job._id}`}
                    className="mx-8 text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
                  >
                    <span className={`inline-flex items-center ${index % 2 === 0 ? 'text-red-600' : 'text-indigo-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      {job.title} @ <span className="font-bold">{job.company}</span> - {job.location}
                    </span>
                    {isNew(job.createdAt) && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">NEW</span>
                    )}
                  </Link>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

      <motion.div 
        variants={fadeInUp}
        className="mt-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8 space-x-4">
            <div className="h-10 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              Featured Job Categories
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Information Technology", icon: "💻", color: "bg-blue-50 text-blue-600 border-blue-200" },
              { name: "Healthcare", icon: "🏥", color: "bg-red-50 text-red-600 border-red-200" },
              { name: "Education", icon: "🎓", color: "bg-green-50 text-green-600 border-green-200" },
              { name: "Banking & Finance", icon: "💰", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
              { name: "Marketing", icon: "📊", color: "bg-purple-50 text-purple-600 border-purple-200" },
              { name: "Customer Service", icon: "🎧", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
              { name: "Manufacturing", icon: "🏭", color: "bg-gray-50 text-gray-600 border-gray-200" },
              { name: "Sales", icon: "🤝", color: "bg-pink-50 text-pink-600 border-pink-200" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className={`${category.color} border rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <h4 className="font-medium">{category.name}</h4>
                <p className="text-xs mt-2 opacity-75">
                  {Math.floor(Math.random() * 100) + 10} openings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Job Listings Section */}
      <section className="mt-16 px-6 py-12 transform transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Latest Posted Jobs */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center mb-8 space-x-4">
              <div className="h-10 w-1 bg-gradient-to-b from-red-400 to-red-600 rounded-full" />
              <h3 className="text-2xl font-bold text-gray-800">Newest Job Postings</h3>
              <span className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                Hot Jobs
              </span>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-red-500 to-pink-600">
                    <tr>
                      {["Job Title", "Company", "Location", "Posted", "Action"].map(
                        (header, idx) => (
                          <th key={idx} className="p-5 text-left text-white font-semibold">
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-5 font-medium text-gray-800">
                          <div className="flex items-center">
                            {isNew(job.createdAt) && (
                              <span className="inline-flex mr-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                            {job.title}
                          </div>
                        </td>
                        <td className="p-5 text-gray-600">{job.company}</td>
                        <td className="p-5">{job.location}</td>
                        <td className="p-5 text-gray-500 text-sm">
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-5">
                          <button
                            onClick={() => router.push(`/jobs/${job._id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PaginationFooter
                currentPage={currentPage}
                totalPages={Math.ceil(jobs.length / jobsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </motion.div>

          {/* Other Jobs */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center mb-8 space-x-4">
              <div className="h-10 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              <h3 className="text-2xl font-bold text-gray-800">Other Jobs</h3>
              <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {`${otherJobs.length} Jobs`}
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <tr>
                      {["Job Title", "Company", "Location", "Category", "Posted", "Action"].map(
                        (header, idx) => (
                          <th key={idx} className="p-5 text-left text-white font-semibold">
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOtherJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-5 font-medium text-gray-800">{job.title}</td>
                        <td className="p-5 text-gray-600">{job.company}</td>
                        <td className="p-5">{job.location}</td>
                        <td className="p-5">{job.category || "General"}</td>
                        <td className="p-5 text-gray-500 text-sm">
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-5">
                          <button
                            onClick={() => router.push(`/jobs/${job._id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PaginationFooter
                currentPage={currentPageOtherJobs}
                totalPages={Math.ceil(otherJobs.length / jobsPerPage)}
                onPageChange={setCurrentPageOtherJobs}
              />
            </div>
          </motion.div>

          {/* Tech Jobs */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center mb-8 space-x-4">
              <div className="h-10 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
              <h3 className="text-2xl font-bold text-gray-800">Tech Industry Jobs</h3>
              <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                {`${techJobs.length} Jobs`}
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-600 to-teal-600">
                    <tr>
                      {["Job Title", "Company", "Location", "Tech Stack", "Posted", "Action"].map(
                        (header, idx) => (
                          <th key={idx} className="p-5 text-left text-white font-semibold">
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTechJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-5 font-medium text-gray-800">{job.title}</td>
                        <td className="p-5 text-gray-600">{job.company}</td>
                        <td className="p-5">{job.location}</td>
                        <td className="p-5">{job.techStack || "Full Stack"}</td>
                        <td className="p-5 text-gray-500 text-sm">
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-5">
                          <button
                            onClick={() => router.push(`/jobs/${job._id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PaginationFooter
                currentPage={currentPageTechJobs}
                totalPages={Math.ceil(techJobs.length / jobsPerPage)}
                onPageChange={setCurrentPageTechJobs}
              />
            </div>
          </motion.div>
        </div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 mb-16 px-6 py-12 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl text-white shadow-xl"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NamasteJobs?</h2>
              <p className="text-indigo-200 max-w-2xl mx-auto">Discover the perfect job opportunity with Indias fastest-growing job portal designed for your career success</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Verified Employers",
                  description: "All our listings come from verified employers and companies to ensure legitimacy and safety."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Fast Applications",
                  description: "Apply to jobs with just a few clicks and track your application status in real-time."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  title: "Job Alerts",
                  description: "Get personalized job recommendations and alerts based on your skills and preferences."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-yellow-300 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-indigo-200">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 mb-16 px-6 py-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Hear from people who found their dream jobs through our platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Raj Sharma",
                  role: "Software Engineer at TechCorp",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  testimonial: "I was looking for a job change for months with no success until I found NamasteJobs. Within 2 weeks, I had 3 interviews and landed my dream job!"
                },
                {
                  name: "Priya Patel",
                  role: "Marketing Manager at BrandX",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  testimonial: "The job filters on NamasteJobs are fantastic! I could easily find positions matching my qualifications and location preferences."
                },
                {
                  name: "Amit Singh",
                  role: "Data Analyst at FinService",
                  image: "https://randomuser.me/api/portraits/men/67.jpg",
                  testimonial: "As a recent graduate, I was struggling to find entry-level positions. The Fresh Graduate filter on NamasteJobs showed me exactly what I needed."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image src="/api/placeholder/48/48" alt={testimonial.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.testimonial}&quot;</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-16 px-6 py-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white text-center shadow-xl"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
          <p className="text-lg text-indigo-100 mb-8">Join thousands of job seekers who found their perfect career match on NamasteJobs</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/jobs" 
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              Browse Jobs
            </Link>
            <Link 
              href="/register" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </motion.section>

      </section>
    </>
  );
}
