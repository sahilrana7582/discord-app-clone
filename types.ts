import { Member, Profile, Server } from '@prisma/client';

export type ServerWithMemberWithTypes = Server & {
  members: Member & { profile: Profile };
};
