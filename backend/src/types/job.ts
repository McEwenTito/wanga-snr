export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  postedDate: Date;
}

export interface CreateJobInput {
  title: string;
  description: string;
  location: string;
  salary?: string;
} 