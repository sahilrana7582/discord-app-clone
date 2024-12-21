import { Member, Profile, Server } from '@prisma/client';

export type ServerWithMemberWithTypes = Server & {
  members: (Member & { memberProfile: Profile })[];
};
