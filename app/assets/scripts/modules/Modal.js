import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $(".open-modal");
		this.modal = $(".modal");
		this.modalCloseButton = $(".modal__close");
		this.events();
	}

	events() {
		this.openModalButton.click(this.openModal.bind(this)); // bind(this) can keep this pointing to the object itself
		this.modalCloseButton.click(this.closeModal.bind(this));

		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		if(e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		return false; // prevent href="#" from triggering
	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");
	}

}

export default Modal;