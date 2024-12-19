import NavigationBar from '@/components/navigation/NavigationBar';
import ModeToggleTheme from '@/components/ui/themeToggle';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col w-[72px] h-full z-30 fixed inset-y-0">
        <NavigationBar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default HomeLayout;
