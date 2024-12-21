import { Hash } from 'lucide-react';
import UserAvatar from '../extras/UserAvatar';

interface ChatHeaderProp {
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
}
const ChatHeader = ({ name, type, imageUrl }: ChatHeaderProp) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-11 border-b-2 border-neutral-200 dark:border-neutral-800">
      {type === 'channel' && (
        <Hash className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === 'conversation' && (
        <UserAvatar src={imageUrl} className="w-8 h-8 mr-4" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
