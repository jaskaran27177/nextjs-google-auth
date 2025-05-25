import { NextResponse } from "next/server";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

// Setup the PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function POST(request) {
  try {
    const { userId, redisKey } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Use provided Redis key if available, otherwise generate a default one
    const sessionKey = redisKey || `36259946`;

    // Insert the record into the database
    const result = await pool.query(
      "INSERT INTO user_redis_keys (user_id, redis_key) VALUES ($1, $2) RETURNING id",
      [userId, sessionKey]
    );

    return NextResponse.json({
      success: true,
      message: "User session recorded",
      id: result.rows[0].id,
      redisKey: sessionKey,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Failed to record user session", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Query to select all records from the user_redis_keys table
    const result = await pool.query("SELECT * FROM user_redis_keys");
    console.log("Fetched user sessions:", result.rows);
    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user sessions", error: error.message },
      { status: 500 }
    );
  }
}
