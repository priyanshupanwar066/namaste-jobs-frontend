"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Banknote, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`https://namaste-jobs-backend.onrender.com/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job details");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-28 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto mt-28 p-6 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found!</h2>
        <button
          onClick={() => router.push('/jobs')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Browse All Jobs
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto mt-28 p-6"
    >
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Jobs
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {job.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <InfoCard icon={<Briefcase className="h-8 w-8 text-blue-600" />} label="Company" value={job.company} />
          <InfoCard icon={<MapPin className="h-8 w-8 text-purple-600" />} label="Location" value={job.location} />
          <InfoCard icon={<Banknote className="h-8 w-8 text-green-600" />} label="Salary" value={job.salary} />
          <InfoCard
            icon={<Clock className="h-8 w-8 text-orange-600" />}
            label="Posted"
            value={new Date(job.createdAt).toLocaleDateString()}
          />
        </div>

        <div className="mt-8 space-y-6">
          <Section title="Job Description" content={job.description} />

          {job.requirements && (
            <SectionList title="Requirements" items={job.requirements} bgColor="bg-blue-50" />
          )}

          {job.responsibilities && (
            <SectionList title="Responsibilities" items={job.responsibilities} bgColor="bg-purple-50" />
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable UI components
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const Section = ({ title, content }) => (
  <div className="border-t border-gray-200 pt-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);

const SectionList = ({ title, items, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-xl`}>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      {items.split('\n').map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export default JobDetails;
