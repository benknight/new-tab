(function () {
	var start = new XDate(2015, 0, 21);
	var daysSinceStart = start.diffDays();
	$('progress')
		.animate({'value': daysSinceStart}, 400)
		.attr('title', Math.floor(daysSinceStart) + ' days since start.');
})();
