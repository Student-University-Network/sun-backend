import { Gender } from '@prisma/client';
import { date, nativeEnum, object, string, TypeOf, z } from 'zod';

export const updateProfileSchema = object({
	body: object({
		firstName: string().min(3, 'Firstname is too short'),
		lastName: string(),
		gender: nativeEnum(Gender).optional(),
		middleName: string().optional(),
		dateOfBirth: z.coerce.date().optional(),
	}),
});

export type updateProfileInput = TypeOf<typeof updateProfileSchema>['body'];

export const changePasswordSchema = object({
	body: object({
		currentPassword: string({
			required_error: 'Current Password is required',
		}).min(4, 'Password too short!'),
		newPassword: string({
			required_error: 'Password is required',
		}).min(4, 'New Password too short'),
		confirmPassword: string({
			required_error: 'Confirm password is required',
		}).min(4, 'Confirm Password is too short'),
	})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: 'Passwords do not match',
		})
		.refine((data) => data.currentPassword !== data.newPassword, {
			message: 'Please choose a password different than current password',
		}),
});

export type changePasswordInput = TypeOf<typeof changePasswordSchema>['body'];
