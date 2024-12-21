import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get('serverId');
    if (!profile) {
      return new NextResponse('Un-Authorized Error', { status: 401 });
    }
    if (!serverId) {
      return new NextResponse('Served Id Missing Error', { status: 400 });
    }

    if (name === 'general') {
      return new NextResponse('Name Cannot Be General', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            memberId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log('Create New Channel Error', e);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
