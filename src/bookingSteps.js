/**
 * Created by tiberiu on 21/06/16.
 */

import ui from './ui';
import request from './bookingRequest';
import roomsData from './roomsData';
import servicesData from './servicesData';

const steps = {
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
			$('#app-wrapper').trigger('nextStep');
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
			$('#app-wrapper').trigger('nextStep');
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
			$('#app-wrapper').trigger('nextStep');
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
		template: () => {
			ui.addSpecialMessage('roomsSlider', {
				rooms: roomsData
			});

			$('#rooms-slider').slick({
				variableWidth: true,
				slidesToShow: 2,
				dots: false,
				prevArrow: '<span class="arrow left"><i class="fa fa-chevron-left"></i></span>',
				nextArrow: '<span class="arrow right"><i class="fa fa-chevron-right"></i></span>'
			});

			$('#rooms-slider .booking-button .btn').on('click', function (event) {
				event.preventDefault();
				request.chosenRoom = $(this).data('room');

				console.log(request);

				$('#app-wrapper').trigger('nextStep');
			});
		}
	},

	5: {
		input: {
			show: false
		},
		message: {
			text: 'Nice. Do you want to book other services too?',
			delay: 2500
		},
		template: () => {
			ui.addSpecialMessage('servicesSlider', {
				services: servicesData
			});

			$('#services-slider').slick({
				variableWidth: true,
				slidesToShow: 2,
				dots: false,
				prevArrow: '<span class="arrow left"><i class="fa fa-chevron-left"></i></span>',
				nextArrow: '<span class="arrow right"><i class="fa fa-chevron-right"></i></span>'
			});

			$('#services-slider .booking-button .btn').on('click', function (event) {
				event.preventDefault();
				if (!_.isArray(request.additionalServices)) {
					request.additionalServices = [];
				}

				request.additionalServices.push($(this).data('service'));

				console.log(request);

				$('#app-wrapper').trigger('nextStep');
			});
		}
	},

	6: {
		input: {
			show: false
		},
		message: {
			text: 'Right on! Now all we need is your payment details.',
			delay: 2500
		},
		template: () => {
			ui.addSpecialMessage('paymentDetails');

			$('#payment-details form').on('submit', function (event) {
				event.preventDefault();

				request.name = $(this).find('input.name').val();

				$('#app-wrapper').trigger('nextStep');
			});
		}
	},

	7: {
		input: {
			show: false
		},
		message: {
			text: 'Your booking is completed!',
			delay: 2500
		}
	}
};

export default steps;
