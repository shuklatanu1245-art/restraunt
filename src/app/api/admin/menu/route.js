import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET all menu items
export async function GET(request) {
  try {
    const items = await sql`SELECT * FROM menu_items ORDER BY id ASC`;
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

// POST a new menu item
export async function POST(request) {
  try {
    const data = await request.json();
    const { key_id, name, price, category, description, image, popular } = data;

    if (!key_id || !name || !price || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO menu_items (key_id, name, price, category, description, image, popular)
      VALUES (${key_id}, ${name}, ${price}, ${category}, ${description || ''}, ${image || ''}, ${popular || false})
      RETURNING *
    `;

    return NextResponse.json({ success: true, item: result[0] });
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

// PUT to update an existing menu item
export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, name, price, category, description, image, popular } = data;

    if (!id || !name || !price || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      UPDATE menu_items
      SET name = ${name}, price = ${price}, category = ${category}, description = ${description || ''}, image = ${image || ''}, popular = ${popular || false}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, item: result[0] });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

// DELETE a menu item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing item ID' }, { status: 400 });
    }

    await sql`DELETE FROM menu_items WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
