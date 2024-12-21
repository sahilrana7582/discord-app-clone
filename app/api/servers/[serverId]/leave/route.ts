import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { serverId } = params;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Un-Authorized', { status: 401 });
    }
    if (!serverId) {
      return new NextResponse('Un-Authorized Server Id', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        adminId: {
          not: profile.id,
        },
      },
      data: {
        members: {
          deleteMany: {
            memberId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    return new NextResponse('Internal Error ' + e, { status: 500 });
  }
}
