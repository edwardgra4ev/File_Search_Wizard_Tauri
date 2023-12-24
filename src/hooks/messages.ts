export async function warning_message(toast: any, message: string) {
	toast.current.show({
		severity: 'warn',
		summary: 'Warning',
		detail: message,
		life: 4000,
	})
}

export async function error_message(toast: any, message: string) {
	toast.current.show({
		severity: 'error',
		summary: 'Error',
		detail: message,
		life: 4000,
	})
}

export async function success_message(toast: any, message: string) {
	toast.current.show({
		severity: 'success',
		summary: 'Success',
		detail: message,
		life: 4000,
	})
}

export async function info_message(toast: any, message: string) {
	toast.current.show({
		severity: 'info',
		summary: 'Info',
		detail: message,
		life: 4000,
	})
}
