"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const LOCATIONS = [
  "Pune", "Mumbai", "Bangalore", "Delhi", 
  "Haryana", "Chennai", "Hyderabad", "Kolkata",
  "Ahmedabad", "Jaipur", "Remote"
];

const CATEGORIES = [
  "IT", "Teacher", "MBA", "Consulting", "Software Developer",
  "Finance", "Healthcare", "Education", "Marketing", "Engineering",
  "AI & ML", "Cloud Computing", "Data Science", "Product Management",
  "Sales & Marketing", "Finance & Administration", "Customer Service",
  "Cyber Security", "DevOps", "Design", "Management", "Quality Assurance",
  "Mobile Development", "Database Management", "Networking", "Technical Support",
  "Blockchain", "Game Development", "IT Support"
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    description: "",
    qualification: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/profile");
      return;
    }

    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/jobs", { 
          withCredentials: true,
          signal: controller.signal 
        });
        const jobsData = Array.isArray(res.data) ? res.data : (res.data.jobs || []);
        setJobs(jobsData);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
          setJobs([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();

    return () => {
      controller.abort();
    };
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateJob = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const res = await api.put(`/jobs/${editingJob._id}`, formData);
        setJobs(prev => prev.map(job => job._id === editingJob._id ? res.data : job));
        setEditingJob(null);
      } else {
        const res = await api.post("/jobs", formData);
        setJobs(prev => [res.data.job, ...prev]);
      }
      setFormData({ 
        title: "", company: "", location: "", 
        salary: "", category: "", description: "", 
        qualification: "" 
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      category: job.category,
      description: job.description,
      qualification: job.qualification || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete job: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 mt-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Job Dashboard
          </span>
          <span className="ml-3">🚀</span>
        </h1>

        {/* Job Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <form onSubmit={handleAddOrUpdateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Location</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              {editingJob ? "Update Job" : "Add Job"}
            </button>
          </form>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              ⚠️ Error: {error}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              📭 No jobs found
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="group bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 transition-all duration-200 ease-in-out"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {job.title}
                        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {job.category}
                        </span>
                      </h2>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span className="flex items-center">
                          🏢 {job.company}
                        </span>
                        <span className="flex items-center">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center">
                          💰 {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 flex space-x-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors flex items-center"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}