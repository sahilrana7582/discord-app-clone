'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Button } from '../ui/button';

import { toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';
import qs from 'query-string';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { Loader2 } from 'lucide-react';

export const DeleteChannel = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const param = useParams();

  const isModalOpen = isOpen && type === 'deleteChannel';

  const { channel } = data;

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}/delete`,
        query: {
          serverId: param.serverId,
        },
      });

      await axios.delete(url);

      router.refresh();
      toast.success(`${channel?.name} Deleted`);

      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to Delete{' '}
            <span className="text-rose-500 font-semibold">
              #{channel?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex justify-between items-center w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
