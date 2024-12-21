'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';
import { useModal } from '@/hooks/useModal';
import { useOrigin } from '@/hooks/useOrigin';

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [copy, setCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'inviteModal';

  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    setCopy(true);

    navigator.clipboard.writeText(inviteUrl);

    setTimeout(() => {
      setCopy(false);
      onClose();
    }, 1000);
    toast.success('Invite Code Copied');
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen('inviteModal', { server: resp.data });
      toast.success('New Url Created');
    } catch (e) {
      console.log(e, 'While Generating New Url');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite More Friends
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Let's Grow Our Family! ✨
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={true}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copy ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            disabled={isLoading}
            onClick={onNew}
          >
            Generate New Link
            <RefreshCcw className="h-1 w-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
