import Link from 'next/link';
import { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h2>
            {job.salary && (
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                MK{job.salary.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 