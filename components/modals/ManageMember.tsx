'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useModal } from '@/hooks/useModal';
import { Separator } from '../ui/separator';
import { ServerWithMemberWithTypes } from '@/types';
import { map } from 'zod';
import { ScrollArea } from '../ui/scroll-area';
import {
  AlarmCheck,
  AlertTriangle,
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import UserAvatar from '../extras/UserAvatar';
import { MemberRole } from '@prisma/client';

import qs from 'query-string';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const roleMapIcon = {
  GUEST: null,
  ADMIN: <ShieldAlert className="w-4 h-4 text-rose-600" />,
  MODERATOR: <ShieldCheck className="w-4 h-4 text-blue-600" />,
};

export const ManageMember = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState('');
  const router = useRouter();

  const { server } = data as { server: ServerWithMemberWithTypes };

  const isModalOpen = isOpen && type === 'manageMember';

  const onRoleChange = async (
    name: string,
    memberId: string,
    role: MemberRole
  ) => {
    try {
      setIsLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const resp = await axios.patch(url, { role });
      router.refresh();
      toast.success(`${name} is now ${role}!`);
      onOpen('manageMember', { server: resp.data });
    } catch (e) {
      toast.error('Something Went Wrong! ' + e);
    } finally {
      setIsLoading('');
    }
  };

  const onHandleKick = async (name: string, memberId: string) => {
    try {
      setIsLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const resp = await axios.delete(url);
      router.refresh();
      toast.success(`${name} is Kicked From The Server`);
      onOpen('manageMember', { server: resp.data });
    } catch (e) {
      toast.error('Something Went Wrong! ' + e);
    } finally {
      setIsLoading('');
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden px-2">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Server Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Let's Manager Our Family! ✨
          </DialogDescription>
        </DialogHeader>
        <div className="py-10">
          <Separator />
        </div>
        <ScrollArea className="px-4 max-h-[500px] pr-6">
          {server?.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-x-2 mt-1  mb-2"
            >
              <UserAvatar
                src={member.memberProfile.imageUrl}
                className="h-20 w-20"
              />
              <div className="flex flex-col gap-y-[1px]">
                <div className="text-xs flex font-semibold items-center gap-x-2">
                  {member.memberProfile.name}
                  {roleMapIcon[member.role]}
                </div>
                <p className="text-xs text-zinc-500">
                  {member.memberProfile.email}
                </p>
              </div>
              {server.adminId !== member.memberId &&
                isLoading !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-600" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                onRoleChange(
                                  member.memberProfile.name,
                                  member.id,
                                  'GUEST'
                                )
                              }
                            >
                              <User className="w-4 h-4 mr-2" />
                              Guest
                              {member.role === 'GUEST' && (
                                <Check className="ml-2 w-4 h-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                onRoleChange(
                                  member.memberProfile.name,
                                  member.id,
                                  'MODERATOR'
                                )
                              }
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Moderator
                              {member.role === 'MODERATOR' && (
                                <Check className="ml-2 w-4 h-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                          onClick={() =>
                            onHandleKick(member.memberProfile.name, member.id)
                          }
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span>Kick</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {isLoading === member.id && (
                <Loader2 className="w-5 h-5 animate-spin ml-auto text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
