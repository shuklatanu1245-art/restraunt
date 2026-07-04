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

    // Create menu_items table
    await sql`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        key_id VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        image TEXT,
        popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create settings table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB
      )
    `;

    // Seed menu items if empty
    const menuCountResult = await sql`SELECT COUNT(*) FROM menu_items`;
    if (menuCountResult[0].count === '0' || menuCountResult[0].count === 0) {
      const { menuItems } = await import('@/data/menu');
      for (const item of menuItems) {
        await sql`
          INSERT INTO menu_items (key_id, name, price, category, description, image, popular)
          VALUES (${item.id}, ${item.name}, ${item.price}, ${item.category}, ${item.description}, ${item.image}, ${item.popular})
        `;
      }
      console.log('✅ Menu items seeded');
    }

    // Seed default theme if empty
    const themeResult = await sql`SELECT * FROM settings WHERE key = 'theme'`;
    if (themeResult.length === 0) {
      const defaultTheme = {
        primary: "#E76F51",
        primaryDark: "#C94C2E",
        primaryLight: "#F4A261",
        accent: "#E07A5F",
        accentDark: "#C55D43",
        cream: "#FFF8F5",
        creamDark: "#F7EAE3",
        dark: "#3A221C",
        darkMuted: "#574039"
      };
      // Need to stringify for JSONB insertion in Neon Serverless correctly in some cases, or just pass the object
      await sql`
        INSERT INTO settings (key, value)
        VALUES ('theme', ${JSON.stringify(defaultTheme)})
      `;
      console.log('✅ Default theme seeded');
    }

    console.log('✅ Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}
