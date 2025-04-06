import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createPostInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const updatePostInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  id: z.string().min(1),
});


export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

export type CreatePostInput = z.infer<typeof createPostInput>;

export type UpdatePostInput = z.infer<typeof updatePostInput>;
