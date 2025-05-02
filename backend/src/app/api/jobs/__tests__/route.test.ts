import { GET, POST } from '../route';
import { PrismaClient } from '@prisma/client';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Job } from '@prisma/client';

// Mock the Prisma client
jest.mock('@prisma/client');
const prisma = new PrismaClient();

describe('Jobs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jobs', () => {
    it('should return all jobs sorted by postedDate', async () => {
      const mockJobs: Job[] = [
        {
          id: 1,
          title: 'Software Engineer',
          description: 'Looking for a skilled software engineer',
          location: 'Remote',
          salary: '$100,000',
          postedDate: new Date('2024-01-01'),
        },
        {
          id: 2,
          title: 'Product Manager',
          description: 'Looking for a product manager',
          location: 'New York',
          salary: '$120,000',
          postedDate: new Date('2024-01-02'),
        },
      ];

      (prisma.job.findMany as jest.Mock).mockImplementation(() => Promise.resolve(mockJobs));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockJobs);
      expect(prisma.job.findMany).toHaveBeenCalledWith({
        orderBy: {
          postedDate: 'desc',
        },
      });
    });

    it('should handle database errors', async () => {
      (prisma.job.findMany as jest.Mock).mockImplementation(() => Promise.reject(new Error('Database error')));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch jobs' });
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job with valid data', async () => {
      const newJob = {
        title: 'Software Engineer',
        description: 'Looking for a skilled software engineer',
        location: 'Remote',
        salary: '$100,000',
      };

      const createdJob: Job = {
        ...newJob,
        id: 1,
        postedDate: new Date(),
      };

      (prisma.job.create as jest.Mock).mockImplementation(() => Promise.resolve(createdJob));

      const request = new Request('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(createdJob);
      expect(prisma.job.create).toHaveBeenCalledWith({
        data: {
          ...newJob,
          salary: newJob.salary || '',
        },
      });
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidJob = {
        title: 'Software Engineer',
        // Missing description and location
      };

      const request = new Request('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidJob),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error: 'Title, description, and location are required',
      });
      expect(prisma.job.create).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const newJob = {
        title: 'Software Engineer',
        description: 'Looking for a skilled software engineer',
        location: 'Remote',
        salary: '$100,000',
      };

      (prisma.job.create as jest.Mock).mockImplementation(() => Promise.reject(new Error('Database error')));

      const request = new Request('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to create job' });
    });
  });
}); 