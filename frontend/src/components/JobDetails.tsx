'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:8000';

interface JobDetailsProps {
  jobId: string;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Jobs
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-semibold">{job.location}</p>
            </div>
            <div>
              <p className="text-gray-600">Posted Date</p>
              <p className="font-semibold">
                {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
            {job.salary && (
              <div>
                <p className="text-gray-600">Salary</p>
                <p className="font-semibold">{job.salary}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 