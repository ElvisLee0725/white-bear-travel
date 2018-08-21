import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWayPoints();
	}

	hideInitially() {
		this.itemsToReveal.addClass("reveal-item");
	}

	createWayPoints() {
	var percent = this.offsetPercentage;	
		this.itemsToReveal.each(function(){
			var currentItem = this; 	// Assign this to variable so "this" can be sent to WayPoint without being changed

			new Waypoint({
				element: currentItem,	// Tell WayPoint which item to watch
				handler: function() {	// What to do when seeing the item
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: percent	// Trigger handler when the element is loaded X percent from top of the page
			});
		});
	}

}

export default RevealOnScroll;