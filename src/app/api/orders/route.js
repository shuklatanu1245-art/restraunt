import { NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

// POST /api/orders — Save a placed order to Neon PostgreSQL
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, table, items, total } = body;

    if (!orderId || !items || !total) {
      return NextResponse.json(
        { error: 'Order ID, items and total are required.' },
        { status: 400 }
      );
    }

    await initializeDatabase();

    const result = await sql`
      INSERT INTO orders (order_id, table_number, items, total_amount, status)
      VALUES (
        ${orderId},
        ${table || 'N/A'},
        ${JSON.stringify(items)},
        ${total},
        'placed'
      )
      ON CONFLICT (order_id) DO NOTHING
      RETURNING id, order_id, created_at
    `;

    return NextResponse.json({
      success: true,
      message: 'Order saved successfully!',
      order: result[0]
    });

  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { error: 'Failed to save order.' },
      { status: 500 }
    );
  }
}

// GET /api/orders — Get all orders (for kitchen/admin display)
export async function GET() {
  try {
    await initializeDatabase();

    const orders = await sql`
      SELECT * FROM orders ORDER BY created_at DESC LIMIT 100
    `;

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders.' },
      { status: 500 }
    );
  }
}
