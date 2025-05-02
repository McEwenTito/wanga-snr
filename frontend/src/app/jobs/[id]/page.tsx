import JobDetails from '@/components/JobDetails';

interface JobPageProps {
  params: {
    id: string;
  };
}

export default function JobPage({ params }: JobPageProps) {
  return <JobDetails jobId={params.id} />;
} 