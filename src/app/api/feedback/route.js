import { NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

// POST /api/feedback — Save feedback to Neon PostgreSQL
export async function POST(request) {
  try {
    const body = await request.json();
    const { ratings, comments, customerDetails } = body;

    // Validate ratings
    if (!ratings || !ratings.foodQuality || !ratings.serviceQuality || 
        !ratings.ambience || !ratings.overallExperience) {
      return NextResponse.json(
        { error: 'All star ratings are required.' },
        { status: 400 }
      );
    }

    // Ensure tables exist
    await initializeDatabase();

    // Insert feedback into database
    const result = await sql`
      INSERT INTO feedback (
        food_quality,
        service_quality,
        ambience,
        overall_experience,
        comments,
        customer_name,
        customer_mobile
      )
      VALUES (
        ${ratings.foodQuality},
        ${ratings.serviceQuality},
        ${ratings.ambience},
        ${ratings.overallExperience},
        ${comments || null},
        ${customerDetails?.name || null},
        ${customerDetails?.mobile || null}
      )
      RETURNING id, created_at
    `;

    return NextResponse.json({
      success: true,
      message: 'Feedback saved successfully!',
      feedbackId: result[0].id,
      createdAt: result[0].created_at
    });

  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback. Please try again.' },
      { status: 500 }
    );
  }
}

// GET /api/feedback — Retrieve all feedback (for admin use)
export async function GET() {
  try {
    await initializeDatabase();

    const feedbacks = await sql`
      SELECT * FROM feedback ORDER BY created_at DESC LIMIT 100
    `;

    return NextResponse.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback.' },
      { status: 500 }
    );
  }
}
