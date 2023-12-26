import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
export const loginSchema = toTypedSchema(
	yup.object({
		email: yup
			.string()
			.required('Email is required')
			.email('Invalid email')
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters')
			.transform((value) => value.trim()),
	})
)

export const registerSchema = toTypedSchema(
	yup.object({
		firstName: yup
			.string()
			.required('First name is required')
			.min(2, 'First name must be at least 2 characters')
			.transform((value) => value.trim()),
		lastName: yup
			.string()
			.required('Last name is required')
			.min(2, 'Last name must be at least 2 characters')
			.transform((value) => value.trim()),
		email: yup
			.string()
			.required('Email is required')
			.email('Invalid email')
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters'),
		confirmPassword: yup
			.string()
			.required('Confirm Password is required')
			.oneOf([yup.ref('password')], 'Passwords must match'),
	})
)

export const forgetPasswordSchema = toTypedSchema(
	yup.object({
		email: yup
			.string()
			.required('Email is required')
			.email('Invalid email')
			.transform((value) => value.trim()),
	})
)

export const contactSchema = toTypedSchema(
	yup.object({
		name: yup
			.string()
			.required('Name is required')
			.min(2, 'Name must be at least 2 characters')
			.transform((value) => value.trim()),
		email: yup
			.string()
			.required('Email is required')
			.email('Invalid email')
			.transform((value) => value.trim()),
		subject: yup
			.string()
			.required('Subject is required')
			.min(2, 'Subject must be at least 2 characters')
			.transform((value) => value.trim()),
		message: yup
			.string()
			.required('Message is required')
	})
)
