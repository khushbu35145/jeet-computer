import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    usernameOrEmail: z.string().min(3, 'Username or email is required').max(100),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters')
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required')
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(10, 'Reset token is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters')
  })
});
