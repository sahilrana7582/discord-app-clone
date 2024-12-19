import { Plus } from 'lucide-react';
import { Separator } from '../ui/separator';
import NavigationAction from './NavigationAction';
import { ScrollArea } from '../ui/scroll-area';
import ModeToggleTheme from '../ui/themeToggle';
import { UserButton } from '@clerk/nextjs';

const NavigationBar = () => {
  return (
    <div className="space-y-2 flex flex-col bg-[#e3e5e8] h-full items-center text-primary w-full dark:bg-[#1e1f22] py-3 border-0">
      <NavigationAction />
      <Separator className="h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto" />
      <ScrollArea className="flex-1 w-full gap-4 "></ScrollArea>

      <div className="flex flex-col gap-4 items-center mt-auto pb-4 ">
        <ModeToggleTheme />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
