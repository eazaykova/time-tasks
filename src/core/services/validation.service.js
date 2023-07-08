import { COLORS } from '@/config/colors.config';

class ValidationService {
	constructor() {
		this.errorBorderTimeout = {};
	}

	showError(element) {
		element.css('border-color', COLORS.error);
	}

	deleteError(element) {
		element.css('border-color', '');
	}
}

export default new ValidationService();
