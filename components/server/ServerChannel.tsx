'use client';

import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import ActionToolKit from '../customComponents/ActionToolKit';
import { ModalType, useModal } from '@/hooks/useModal';

interface ServerChannelProp {
  name: string;
  type: ChannelType;
  channel: Channel;
  server: Server;
  role: string;
}

const iconMap = {
  [ChannelType.TEXT]: (
    <Hash className="flex-shrink w-6 h-6 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.AUDIO]: (
    <Mic className="flex-shrink w-6 h-6 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="flex-shrink w-6 h-6 text-zinc-500 dark:text-zinc-400" />
  ),
};
const ServerChannel = ({
  name,
  type,
  channel,
  server,
  role,
}: ServerChannelProp) => {
  const param = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = () => {
    router.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();

    onOpen(action, { channel, server });
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        param?.channelId === channel.id && ' bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      {iconMap[type]}
      <p
        className={cn(
          'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          param?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionToolKit label="Edit">
            <Edit
              onClick={() => onOpen('editChannel', { channel, server })}
              className="hidden group-hover:block w-4 h-4 text-indigo-400 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-600 transition"
            />
          </ActionToolKit>
          <ActionToolKit label="Delete">
            <Trash
              onClick={(e) => onAction(e, 'deleteChannel')}
              className="hidden group-hover:block w-4 h-4 text-rose-500 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-600 transition"
            />
          </ActionToolKit>
        </div>
      )}

      {channel.name === 'general' && (
        <div className="ml-auto flex items-center gap-x-2">
          <Lock className=" group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
        </div>
      )}
    </button>
  );
};

export default ServerChannel;
