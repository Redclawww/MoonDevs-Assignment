import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { users } from '@/global';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ username: user.username }, 'hello', {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}