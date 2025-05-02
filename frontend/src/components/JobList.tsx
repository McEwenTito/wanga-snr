'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Job, JobListResponse } from '@/types/job';

const API_BASE_URL = 'http://localhost:8000';

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs?page=${currentPage}`, {
          credentials: 'include',
        });
        const data: JobListResponse = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/jobs/${job.id}`}>
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.location}</p>
              <p className="text-sm text-gray-500">
                Posted: {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
} 