import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check credentials as requested
    if (email === 'shuklatanu1245@gmail.com' && password === 'tastebite07') {
      // In a real app, use JWT or proper session management.
      // For this simple implementation, we'll just return a success response
      // and the frontend will store an admin token in sessionStorage or cookie.
      return NextResponse.json({ success: true, token: 'admin-super-secret-token' });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
