export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number | null;
  postedDate: string;
}

export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
} 