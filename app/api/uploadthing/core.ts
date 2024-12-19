import { currentUser } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UploadThingError('You Must Logged In First');
  }

  return { userId: user.id };
};
export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: '16MB', maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  messageFile: f({
    image: { maxFileSize: '16MB', maxFileCount: 1 },
    pdf: { maxFileSize: '16MB', maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
