import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { memberId } = params;
    const { searchParams } = new URL(req.url);

    const { role } = await req.json();
    const serverId = searchParams.get('serverId');
    if (!profile) {
      return new NextResponse('Un-Authorized User Error', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Un-Authorized Server Id Error', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        adminId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              memberId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            memberProfile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log('[MemberId] Role Change Error' + e);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { memberId } = params;
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');
    if (!profile) {
      return new NextResponse('Un-Authorized User Error', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('Un-Authorized Server Id Error', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        adminId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            memberId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            memberProfile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log('[MemberId] Role Change Error' + e);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
