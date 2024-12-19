import { Plus } from 'lucide-react';
import ActionToolKit from '../customComponents/ActionToolKit';

const NavigationAction = () => {
  return (
    <div>
      <ActionToolKit label="Add A Server" side="left" align="end">
        <button className="group flex items-center justify-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 ">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionToolKit>
    </div>
  );
};

export default NavigationAction;
