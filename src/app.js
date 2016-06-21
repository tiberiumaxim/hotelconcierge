/**
 * Created by tiberiu on 17/06/16.
 */

import ui from './ui';
import _ from 'lodash';
import appSteps from './bookingSteps';
import request from './bookingRequest';

$(document).ready(() => {
	app.init();
});

let app = {
	currentStep: 0,

	init() {
		ui.init();

		$('#app-wrapper').on('nextStep', app.nextStep);

		$('#chat-input form').submit((event) => {
			event.preventDefault();

			let input = $('#chat-input form input').val();
			$('#chat-input form input').val('');

			ui.addMessage('user', input);
			let step = appSteps[app.currentStep];
			step.resolveInput(input);
		});

		$('#app-wrapper').trigger('nextStep');
	},

	nextStep(event) {
		app.currentStep++;
		let step = appSteps[app.currentStep];

		if (step.delay) {
			return setTimeout(() => {
				app.runDelay(step);
			}, step.delay);
		} else if (step.loading) {
			ui.showLoading();
			return setTimeout(() => {
				app.runStep(step);
			}, step.loading);
		}

		app.runStep(step);
	},

	runDelay(step) {
		if (step.loading) {
			ui.showLoading();
			return setTimeout(() => {
				app.runStep(step);
			}, step.loading);
		}

		app.runStep(step);
	},

	runStep(step) {
		ui.hideLoading();
		if (step.input.show) {
			ui.showInput(step.input.placeholder);
		} else {
			ui.hideInput();
		}

		if (step.message) {
			ui.addMessage('operator', step.message.text, step.message.delay);
		}

		if (step.template) {
			step.template();
		}
	}
};
