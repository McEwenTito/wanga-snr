import { GET } from '../route';
import { PrismaClient } from '@prisma/client';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Job } from '@prisma/client';

// Mock the Prisma client
jest.mock('@prisma/client');
const prisma = new PrismaClient();

describe('Single Job API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jobs/[id]', () => {
    it('should return a single job by ID', async () => {
      const mockJob: Job = {
        id: 1,
        title: 'Software Engineer',
        description: 'Looking for a skilled software engineer',
        location: 'Remote',
        salary: '$100,000',
        postedDate: new Date('2024-01-01'),
      };

      (prisma.job.findUnique as jest.Mock).mockImplementation(() => Promise.resolve(mockJob));

      const request = new Request('http://localhost:3000/api/jobs/1');
      const response = await GET(request, { params: { id: '1' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockJob);
      expect(prisma.job.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return 404 if job is not found', async () => {
      (prisma.job.findUnique as jest.Mock).mockImplementation(() => Promise.resolve(null));

      const request = new Request('http://localhost:3000/api/jobs/999');
      const response = await GET(request, { params: { id: '999' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: 'Job not found' });
    });

    it('should return 400 for invalid job ID', async () => {
      const request = new Request('http://localhost:3000/api/jobs/invalid');
      const response = await GET(request, { params: { id: 'invalid' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid job ID' });
      expect(prisma.job.findUnique).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      (prisma.job.findUnique as jest.Mock).mockImplementation(() => Promise.reject(new Error('Database error')));

      const request = new Request('http://localhost:3000/api/jobs/1');
      const response = await GET(request, { params: { id: '1' } });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch job' });
    });
  });
}); 