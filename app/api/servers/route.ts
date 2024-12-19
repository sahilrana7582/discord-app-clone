import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse('Un-Authorized', { status: 401 });
    }
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        adminId: profile.id,
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
        members: {
          create: [{ role: MemberRole.ADMIN, memberId: profile.id }],
        },
      },
    });
    return NextResponse.json(server);
  } catch (e) {
    console.log('Create Server Error', e);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
