'use client';
import { useParams, useRouter } from 'next/navigation';
import ActionToolKit from '../customComponents/ActionToolKit';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NavigationItemProp {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProp) => {
  const param = useParams();
  const router = useRouter();
  return (
    <ActionToolKit side="right" align="center" label={name}>
      <button className="group relative flex items-center">
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            param?.serverId !== id && 'group-hover:h-[20px]',
            param?.serverId === id ? 'h-[38px]' : 'h-[8px]'
          )}
        />
        <div
          className={cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            param?.serverId === id &&
              'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <Image fill src={imageUrl} alt="Server" />
        </div>
      </button>
    </ActionToolKit>
  );
};

export default NavigationItem;
