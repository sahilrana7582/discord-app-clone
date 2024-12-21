'use client';
import CreateNewChannel from '../modals/CreateModal';
import CreateServerModal from '../modals/CreateServerModal';
import { DeleteChannel } from '../modals/DeleteChannel';
import EditChannel from '../modals/EditChannel';

const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <CreateNewChannel />
      <EditChannel />
      <DeleteChannel />
    </>
  );
};

export default ModalProvider;
