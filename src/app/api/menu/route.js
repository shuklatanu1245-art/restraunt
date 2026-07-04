import { NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

export async function GET(request) {
  try {
    // Ensure DB is initialized (for the first run after migration)
    await initializeDatabase();
    
    const items = await sql`SELECT * FROM menu_items ORDER BY id ASC`;
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
