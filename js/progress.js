(function () {
	var start = new XDate(2015, 0, 21);
	var daysSinceStart = start.diffDays();
	$(document.body).ready(function () {
		$('progress')
			.animate({'value': daysSinceStart}, 100)
			.attr('title', Math.floor(daysSinceStart) + ' days since start.');
	});
})();
