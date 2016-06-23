/**
 * Created by tiberiu on 17/06/16.
 */

import roomsData from './roomsData';

class UI {
	constructor() {
	}

	init() {
		let _this = this;

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

		$('body').on('click', '.btn.details:not(.disabled)', (event) => {
			event.preventDefault();
			let roomIdx = $(event.target).data('room');
			let roomData = roomsData[roomIdx];
			roomData.roomIdx = roomIdx;

			_this.hideRoomDetails();
			_this.render('roomDetails', _this.$messages, roomData);

			$('#room-details .images').slick({
				dots: false,
				prevArrow: '<span class="arrow left"><i class="fa fa-chevron-left"></i></span>',
				nextArrow: '<span class="arrow right"><i class="fa fa-chevron-right"></i></span>'
			});

			this.$messages.scrollTop(this.$messages.prop('scrollHeight'));
		});

		$('body').on('click', '.btn.hide-details', _this.hideRoomDetails);
	}

	render(templateName, parent, data) {
		let template = require(`ejs!./templates/${templateName}.ejs`);
		$(parent).append(template(data));
	}

	addMessage(type, message) {
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

	hideRoomDetails() {
		$('#room-details').remove();
		// $('#room-details').fadeOut(300, function () {
		// 	$(this).remove();
		// });
	}

	showRoomDetails(callback) {
		$('#room-details').fadeIn(300, callback);
	}
}

const ui = new UI();

export default ui;
