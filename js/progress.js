(function () {
	var year = 2015,
			month = 4,
			day = 1;
	var start = new XDate(year, month - 1, day);
	var daysSinceStart = start.diffDays();
	$(document.body).ready(function () {
		$('progress')
			.animate({'value': daysSinceStart}, 100)
			.attr('title', Math.floor(daysSinceStart) + ' days since start.');
	});
})();
