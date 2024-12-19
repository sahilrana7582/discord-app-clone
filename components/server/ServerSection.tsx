import { ChannelType, MemberRole } from '@prisma/client';
import { Plus, Settings } from 'lucide-react';
import ActionToolKit from '../customComponents/ActionToolKit';

interface ServerSectionProp {
  label: String;
  role?: MemberRole;
  sectionType: 'channel' | 'member';
  channelType?: ChannelType;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
}: ServerSectionProp) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType == 'channel' && (
        <ActionToolKit label="Create Channel" side="top" align="center">
          <button className="text-zinc-500 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus className="h-4 w-4 " />
          </button>
        </ActionToolKit>
      )}
      {role === MemberRole.ADMIN && sectionType == 'member' && (
        <ActionToolKit label="Manage Members" side="top" align="center">
          <button className="text-zinc-500 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Settings className="h-4 w-4 " />
          </button>
        </ActionToolKit>
      )}
    </div>
  );
};

export default ServerSection;
