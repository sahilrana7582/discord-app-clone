import ChatHeader from '@/components/chats/ChatHeader';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

interface ChannelIdProp {
  params: {
    serverId: string;
    channelId: string;
  };
}
const SpecficChannel = async ({ params }: ChannelIdProp) => {
  const { serverId, channelId } = params;
  const channel = await db.channel.findUnique({
    where: {
      serverId,
      id: channelId,
    },
  });

  if (!channel) {
    redirect('/');
  }
  return (
    <div className="flex flex-col bg-white dark:bg-[#313338] h-full">
      <ChatHeader name={channel.name} type="channel" />
    </div>
  );
};

export default SpecficChannel;
