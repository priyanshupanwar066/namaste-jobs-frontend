'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Briefcase, MapPin, Banknote, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Main content component that uses searchParams
const JobsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [error, setError] = useState(null);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: currentPage,
          limit: jobsPerPage,
          ...(category && { category }),
          ...(location && { location }),
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(`https://namaste-jobs-backend.onrender.com/api/jobs?${params}`, {
          signal: controller.signal,
          credentials: "include",
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
        setTotalJobs(data.totalJobs || 0);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(
          error.message || "Failed to connect to server. Check your internet connection and try again."
        );
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category, location, currentPage]);

  const renderPagination = () => (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
          } rounded-md`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="mb-4 text-right text-gray-600">
        Showing {(currentPage - 1) * jobsPerPage + 1} -{" "}
        {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs} jobs
      </div>

      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {category || location
            ? `${category} Jobs ${location && `in ${location}`}`
            : "All Job Listings"}
        </h1>
        <div></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h2>
                  <div className="flex items-center text-blue-600 mb-3">
                    <Briefcase className="h-5 w-5 mr-2" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>

                {job.salary && (
                  <div className="flex items-center text-gray-600">
                    <Banknote className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                )}

                {job.createdAt && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      Posted:{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/jobs/${job._id}`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Found</h2>
          <p className="text-gray-600 mb-6">Try adjusting your filters or check back later</p>
          <button
            onClick={() => router.push("/jobs")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Browse All Jobs
          </button>
        </div>
      )}

      {!loading && jobs.length > 0 && renderPagination()}
    </motion.div>
  );
};

// Main page component with Suspense boundary
const JobsPage = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
};

export default JobsPage;
