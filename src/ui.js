/**
 * Created by tiberiu on 17/06/16.
 */

class UI {
	constructor() {
	}

	init() {
		this.$chatInput = $('#chat-input');
		this.$messages = $('#messages-container');

		var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
		var isSafari = navigator.userAgent.indexOf('Safari') > -1;
		var isMac = (navigator.userAgent.indexOf('Mac OS') != -1);
		var isWindows = !isMac;

		if (isChrome && isSafari) {
			isSafari = false;
		}

		if (isSafari || isWindows) {
			$('body').css('-webkit-text-stroke', '0.5px');
		}

		$('body').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.message, .message-loading', (event) => {
			this.$messages.scrollTop(this.$messages.prop('scrollHeight'));
		});

		$('body').on('init', '.message.special', (event) => {
			$(event.target).parent().addClass('fadeInUp');
			$(event.target).show();
		});
	}

	render(templateName, parent, data) {
		let template = require(`ejs!./templates/${templateName}.ejs`);
		$(parent).append(template(data));
	}

	addMessage(type, message, delay) {
		let _this = this;
		let templateName = type === 'user' ? 'userMessage' : 'operatorMessage';

		this.render(templateName, this.$messages, { message: message });
	}

	addSpecialMessage(templateName, data, delay) {
		let _this = this;

		this.render(templateName, this.$messages, data);
	}

	showInput(placeholder) {
		if (placeholder) {
			this.$chatInput.find('input[type=text]').attr('placeholder', placeholder);
		}

		this.$chatInput.fadeIn(300);
	}

	hideInput() {
		this.$chatInput.fadeOut(300);
	}

	showLoading() {
		this.render('loading', this.$messages);
		this.$messages.scrollTop(this.$messages.prop('scrollHeight'));
	}

	hideLoading() {
		this.$messages.find('.message-loading').remove();
	}
}

const ui = new UI();

export default ui;
