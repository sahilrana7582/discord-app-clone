import { currentProfile } from '@/lib/currentProfile';
import ServerHeader from './ServerHeader';
import { RedirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import Servers from '@/app/(main)/(routes)/servers/page';
import { ScrollArea } from '../ui/scroll-area';
import ServerSearch from './ServerSearch';
import { ChannelType } from '@prisma/client';
import { Separator } from '../ui/separator';
import ServerSection from './ServerSection';
import { channel } from 'diagnostics_channel';
import ServerChannel from './ServerChannel';

const ServerSideBar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();
  if (!profile) {
    RedirectToSignIn;
    return;
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
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

  if (!server) {
    redirect('/');
  }

  const textChannels = server?.channels.filter(
    (channel) => ChannelType.TEXT === channel.type
  );

  const audioChannel = server?.channels.filter(
    (channel) => ChannelType.AUDIO === channel.type
  );
  const videoChannel = server?.channels.filter(
    (channel) => ChannelType.VIDEO === channel.type
  );

  const role = server.members.find(
    (member) => member.memberId === profile.id
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="px-2">
        <div className="mt-2">
          <ServerSearch />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2 ">
            <ServerSection
              label="Text Channels"
              channelType={ChannelType.TEXT}
              sectionType="channel"
              role={role}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  name={channel.name}
                  type={channel.type}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
