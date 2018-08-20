import $ from 'jquery'; // Import jquery from the NPM package 

class MobileMenu {
	constructor() {
		this.siteHeader = $('.site-header');
		this.menuIcon = $('.site-header__menu-icon');
		this.menuContent = $('.site-header__menu-content');
		this.events(); 	// events() is not a reserved function, we need to manually add this.
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this)); // Need to .bind(this) otherwise the this will be pointing to menuIcon which is clicked
	}

	toggleTheMenu() {
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
	}
}

export default MobileMenu;