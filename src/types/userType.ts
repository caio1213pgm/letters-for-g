export type User = {
  image?: string | null;
  id: string;
  email: string;
  name: string;
  emailVerified?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
