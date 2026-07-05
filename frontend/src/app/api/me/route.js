const jwt = require('jsonwebtoken');
const { db, users } = require('@judgecode/backend');
const { eq } = require('drizzle-orm');

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader || !cookieHeader.includes('token=')) {
    return Response.json({ error: 'Not logged in' }, { status: 401 });
  }

  const token = cookieHeader
    .split(';')
    .find(c => c.trim().startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    return Response.json({ error: 'No token found' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userRows = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (userRows.length === 0) return Response.json({ error: 'User not found' }, { status: 401 });
    return Response.json({ user: userRows[0] });
  } catch (err) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
