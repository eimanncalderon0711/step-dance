import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import {
  updateUserSchema,
} from '@/validators/user.validator';
import { createUserActions } from '@/actions/users';

export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await createUserActions(body);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Validate input
    const validated = updateUserSchema.parse(body);

    const user = await userService.updateUser(validated);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}