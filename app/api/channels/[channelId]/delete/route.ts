import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { ChannelType, MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string; serverId: string } }
) {
  try {
    const { channelId } = params;
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Un-Authorized User', { status: 401 });
    }

    if (!serverId || !channelId) {
      return new NextResponse('Id is not Provided', { status: 400 });
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
          delete: {
            id: channelId,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    return new NextResponse('Intenal Error : ' + e, { status: 500 });
  }
}
