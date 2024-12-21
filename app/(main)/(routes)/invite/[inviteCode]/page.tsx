import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const InvitePage = async ({ params }: { params: { inviteCode: string } }) => {
  const { inviteCode } = params;
  const profile = await currentProfile();

  if (!profile) {
    redirect('/sign-in');
  }

  if (!inviteCode) {
    redirect('/servers');
  }

  const existingServer = await db.server.findUnique({
    where: {
      inviteCode,
      members: {
        some: {
          memberId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [{ memberId: profile.id }],
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }
};

export default InvitePage;
