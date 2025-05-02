import JobList from '@/components/JobList';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <Link
            href="/jobs/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create New Job
          </Link>
        </div>
        <JobList />
      </div>
    </main>
  );
}
