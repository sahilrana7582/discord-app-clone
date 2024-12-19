import NavigationBar from '@/components/navigation/NavigationBar';
import ServerSideBar from '@/components/server/ServerSideBar';

const ServerLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: string;
}) => {
  const { serverId } = params;
  return (
    <div className="h-full">
      <div className="md:flex h-full w-60  z-20 flex-col fixed inset-y-0">
        <ServerSideBar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerLayout;
