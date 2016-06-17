/**
 * Created by tiberiu on 17/06/16.
 */

export default class UI {
	constructor() {
		this.$chatInput = $('#chat-input form input');
		this.$loadingMessage = $('#message-loading');
		this.$messages = $('#messages-container');
	}

	render(templateName, parent, data) {
		let template = require(`ejs!./templates/${templateName}.ejs`);
		$(parent).append(template(data));
	}

	addMessage(type, message, delay) {
		let _this = this;
		let templateName = type === 'user' ? 'userMessage' : 'operatorMessage';

		if (delay) {
			this.showLoading();
			return setTimeout(() => {
				_this.hideLoading();
				_this.render(templateName, _this.$messages, { message: message });
				_this.$messages.scrollTop(_this.$messages.prop('scrollHeight'));
			}, delay);
		}

		this.render(templateName, this.$messages, { message: message });
		_this.$messages.scrollTop(_this.$messages.prop('scrollHeight'));
	}

	showInput(placeholder) {
		if (placeholder) {
			this.$chatInput.attr('placeholder', placeholder);
		}

		this.$chatInput.fadeIn('fast');
	}

	hideInput(placeholder) {
		if (placeholder) {
			this.$chatInput.attr('placeholder', placeholder);
		}

		this.$chatInput.fadeOut('fast');
	}

	showLoading() {
		this.$loadingMessage.show();
	}

	hideLoading() {
		this.$loadingMessage.hide();
	}
}
