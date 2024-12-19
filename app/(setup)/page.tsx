import { db } from '@/lib/db';
import { intialProfile } from '@/lib/intialProfile';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const profile = await intialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          memberId: profile?.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }
  redirect(`/servers`);

  return <div>Home</div>;
};

export default Home;
