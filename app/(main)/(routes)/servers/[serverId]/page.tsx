import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
interface ServeIdProp {
  params: {
    serverId: string;
  };
}
const ServerId = async ({ params }: ServeIdProp) => {
  const { serverId } = params;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
      },
    },
  });
  const channelId = server?.channels[0].id;
  redirect(`/servers/${serverId}/channels/${channelId}`);
  return <div>Yo</div>;
};

export default ServerId;
