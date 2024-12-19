'use client';
import { useModal } from '@/hooks/useModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import FileUpload from '../extras/FileUpload';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';

import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(4, {
    message: 'Server Name Must Be Min. 4 Words.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server Image Is Required',
  }),
});

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const resp = await axios.post('/api/servers', data);

      router.refresh();
      handleClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const isModalOpen = isOpen && type === 'createServer';
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create New Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a heartbeat—your creation, your rules,
            <br /> change it anytime!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <FileUpload
                            endPoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormMessage />
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Server Name"
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display server name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary" type="submit">
                {isLoading ? (
                  <Loader2 className="w-8 h-8 font-bold text-white animate-spin" />
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
