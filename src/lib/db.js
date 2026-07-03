import { neon } from '@neondatabase/serverless';

// Create a SQL query function using the pooled connection
const sql = neon(process.env.DATABASE_URL);

export default sql;

/**
 * Initialize the database tables if they don't exist.
 * Call this once to set up the schema.
 */
export async function initializeDatabase() {
  try {
    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        food_quality INTEGER NOT NULL CHECK (food_quality BETWEEN 1 AND 5),
        service_quality INTEGER NOT NULL CHECK (service_quality BETWEEN 1 AND 5),
        ambience INTEGER NOT NULL CHECK (ambience BETWEEN 1 AND 5),
        overall_experience INTEGER NOT NULL CHECK (overall_experience BETWEEN 1 AND 5),
        comments TEXT,
        customer_name VARCHAR(255),
        customer_mobile VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) UNIQUE NOT NULL,
        table_number VARCHAR(10),
        items JSONB NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'placed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create staff table
    await sql`
      CREATE TABLE IF NOT EXISTS staff (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log('✅ Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}
