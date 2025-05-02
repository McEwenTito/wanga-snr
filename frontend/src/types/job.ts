export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: string;
  postedDate: string;
}

export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
} 