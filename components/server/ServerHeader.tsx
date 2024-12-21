'use client';
import { MemberRole, Server } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  ChevronDown,
  LogOut,
  Plus,
  PlusCircle,
  Settings,
  TrashIcon,
  UserPlus,
  Users,
} from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { ServerWithMemberWithTypes } from '@/types';

interface ServerHeaderProp {
  server: ServerWithMemberWithTypes;
  role: string;
}
const ServerHeader = ({ server, role }: ServerHeaderProp) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-2 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        <DropdownMenuItem
          onClick={() => onOpen('inviteModal', { server })}
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
        >
          Invite Code
          <UserPlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem className="py-2 px-3 text-sm cursor-pointer">
            Server Settings <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('manageMember', { server })}
            className="px-3 py-2 cursor-pointer text-sm"
          >
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 cursor-pointer text-sm">
            Create Channel
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-600  px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <TrashIcon className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className="text-rose-600  px-3 py-2 text-sm cursor-pointer"
          >
            Leave Server
            <LogOut className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
