import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get search and filter parameters
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const sortBy = searchParams.get('sortBy') || 'postedDate';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause for search and filters
    const where: Prisma.JobWhereInput = {
      AND: [
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        } : {},
        location ? {
          location: { contains: location, mode: 'insensitive' as const },
        } : {},
      ],
    };

    // Build orderBy clause
    const orderBy: Prisma.JobOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      jobs,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, location, salary } = body;

    // Validate required fields
    if (!title || !description || !location) {
      return NextResponse.json(
        { error: 'Title, description, and location are required' },
        { status: 400 }
      );
    }

    // Convert salary to integer if provided
    const salaryInt = salary ? parseInt(salary) : null;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary: salaryInt,
        postedDate: new Date(),
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
} 