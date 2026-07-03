import { NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    await initializeDatabase();
    const body = await request.json();

    // 1. REGISTER ACTION
    if (action === 'register') {
      const { name, email, mobile } = body;
      if (!name || !email || !mobile) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
      }

      // Check if email already exists
      const existing = await sql`
        SELECT * FROM staff WHERE email = ${email}
      `;
      
      if (existing.length > 0) {
        return NextResponse.json({ error: 'Staff email already registered.' }, { status: 400 });
      }

      // Insert as pending
      const result = await sql`
        INSERT INTO staff (name, email, mobile, status)
        VALUES (${name}, ${email}, ${mobile}, 'pending')
        RETURNING id, name, email, mobile, status
      `;

      return NextResponse.json({
        success: true,
        message: 'Registration successful! Awaiting owner approval.',
        staff: result[0]
      });
    }

    // 2. LOGIN ACTION
    if (action === 'login') {
      const { email, mobile } = body;
      if (!email || !mobile) {
        return NextResponse.json({ error: 'Email and mobile number are required.' }, { status: 400 });
      }

      const result = await sql`
        SELECT * FROM staff WHERE email = ${email} AND mobile = ${mobile}
      `;

      if (result.length === 0) {
        return NextResponse.json({ error: 'Invalid email or mobile number.' }, { status: 401 });
      }

      const staff = result[0];
      if (staff.status === 'pending') {
        return NextResponse.json({
          success: false,
          status: 'pending',
          error: 'Your account is pending approval from the owner.'
        }, { status: 403 });
      }

      if (staff.status === 'rejected') {
        return NextResponse.json({
          success: false,
          status: 'rejected',
          error: 'Your request has been rejected by the owner.'
        }, { status: 403 });
      }

      return NextResponse.json({
        success: true,
        status: 'approved',
        message: 'Login successful!',
        staff: {
          id: staff.id,
          name: staff.name,
          email: staff.email,
          mobile: staff.mobile
        }
      });
    }

    // 3. UPDATE STATUS ACTION (Owner Approves/Rejects)
    if (action === 'update-status') {
      const { staffId, status } = body; // status: 'approved' or 'rejected'
      if (!staffId || !status) {
        return NextResponse.json({ error: 'Staff ID and status are required.' }, { status: 400 });
      }

      const result = await sql`
        UPDATE staff
        SET status = ${status}
        WHERE id = ${staffId}
        RETURNING id, name, email, status
      `;

      if (result.length === 0) {
        return NextResponse.json({ error: 'Staff member not found.' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Staff status updated to ${status} successfully!`,
        staff: result[0]
      });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });

  } catch (error) {
    console.error('Error in staff API:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    await initializeDatabase();

    // GET ALL STAFF (for Owner view)
    if (action === 'list') {
      const staffList = await sql`
        SELECT * FROM staff ORDER BY created_at DESC
      `;
      return NextResponse.json({ success: true, data: staffList });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Error in staff GET API:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
