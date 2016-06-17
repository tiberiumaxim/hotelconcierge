/**
 * Created by tiberiu on 17/06/16.
 */

import UI from './ui';
import _ from 'lodash';

$(document).ready(() => {
	app.init();
});

let request = {
	checkInDate: null,
	checkOutDate: null,
	persons: null,
	nights: null
};

let appSteps = {
	1: {
		input: {
			show: true,
			placeholder: 'Any time, like "Next Sunday" or "Tomorrow"'
		},
		message: {
			text: 'Hi! I\'m here to make your trip awesome!<br>Tell me, when would you like to arrive?',
			delay: 1000
		},
		resolveInput(input) {
			request.checkInDate = input;
			console.log('request', request);
			app.nextStep();
		}
	},

	2: {
		input: {
			show: true,
			placeholder: 'A number, like "3" or "5"'
		},
		message: {
			text: 'How many nights would you like to stay?',
			delay: 1500
		},
		resolveInput(input) {
			request.checkOutDate = input;
			console.log('request', request);
			app.nextStep();
		}
	},

	3: {
		input: {
			show: true,
			placeholder: 'A number, like "2" or "4"'
		},
		message: {
			text: 'How many persons?',
			delay: 1500
		},
		resolveInput(input) {
			request.persons = input;
			console.log('request', request);
			app.nextStep();
		}
	},

	4: {
		input: {
			show: false
		},
		message: {
			text: 'Ok, this is what we have free for this period:',
			delay: 2500
		},
		// resolveInput(input) {
		// 	// request.persons = input;
		// 	console.log('request', request);
		// 	app.nextStep();
		// }
	}
};

let ui;

let app = {
	currentStep: 0,

	init() {
		ui = new UI();

		app.nextStep();
		$('#chat-input form').submit((event) => {
			event.preventDefault();

			let input = $('#chat-input form input').val();
			$('#chat-input form input').val('');

			ui.addMessage('user', input);
			let step = appSteps[app.currentStep];
			step.resolveInput(input);
		});
	},

	nextStep() {
		app.currentStep++;
		let step = appSteps[app.currentStep];

		if (step.input.show) {
			ui.showInput(step.input.placeholder);
		} else {
			ui.hideInput();
		}

		if (step.message) {
			ui.addMessage('operator', step.message.text, step.message.delay);
		}
	}
};
