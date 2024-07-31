import { z } from 'zod';

export const CreateUserZodDto = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export type CreateUserZodDto = z.infer<typeof CreateUserZodDto>;
