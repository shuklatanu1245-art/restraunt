import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request) {
  try {
    const result = await sql`SELECT value FROM settings WHERE key = 'theme'`;
    if (result.length > 0) {
      return NextResponse.json({ success: true, theme: result[0].value });
    }
    return NextResponse.json({ success: true, theme: null });
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    
    // Check if theme exists
    const checkResult = await sql`SELECT * FROM settings WHERE key = 'theme'`;
    
    if (checkResult.length === 0) {
      await sql`
        INSERT INTO settings (key, value)
        VALUES ('theme', ${JSON.stringify(data)})
      `;
    } else {
      await sql`
        UPDATE settings
        SET value = ${JSON.stringify(data)}
        WHERE key = 'theme'
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
