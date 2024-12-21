'use client';
import CreateNewChannel from '../modals/CreateNewChannel';
import CreateServerModal from '../modals/CreateServerModal';
import { DeleteChannel } from '../modals/DeleteChannel';
import EditChannel from '../modals/EditChannel';
import { InviteModal } from '../modals/InviteCode';
import { LeaveServer } from '../modals/LeaveServer';

const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <CreateNewChannel />
      <EditChannel />
      <DeleteChannel />
      <InviteModal />
      <LeaveServer />
    </>
  );
};

export default ModalProvider;
