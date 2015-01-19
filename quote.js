(function () {
	jQuery.get('http://api.theysaidso.com/qod?category=inspire', function (data, textStatus) {
		var $x = document.querySelector('#quote');
		$x.innerHTML = [
			'<p>',
				'<a href="http://theysaidso.com/quote/' + data.contents.id + '">',
					'“' + data.contents.quote + '”',
				'</a>',
			'</p>',
			'<small class="no-wrap">',
				'<a href="https://www.google.com/search?q=' + data.contents.author + '">',
					'— ' + data.contents.author,
				'</a>',
			'</small>'
		].join('');
	});
})();