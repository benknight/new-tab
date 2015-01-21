// Because I fucking hate dumb quotes.
// Regexes from https://github.com/kellym/smartquotesjs/blob/master/src/smartquotes.js
function smartQuotes (str) {
	return str
		.replace(/(\W|^)"(\S)/g, '$1\u201c$2')                                       // beginning "
		.replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
		.replace(/([^0-9])"/g,'$1\u201d')                                            // remaining " at end of word
		.replace(/(\W|^)'(\S)/g, '$1\u2018$2')                                       // beginning '
		.replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
		.replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
		.replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
		.replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
		.replace(/'''/g, '\u2034')                                                   // triple prime
		.replace(/("|'')/g, '\u2033')                                                // double prime
		.replace(/'/g, '\u2032');                                                    // prime
}

var qodURL = 'http://api.theysaidso.com/qod?category=inspire&v=' + (new Date().toISOString().substr(0, 10));

jQuery.get(qodURL, function (data, textStatus) {
	var $x = document.querySelector('#quote');
	$x.innerHTML = [
		'<p>',
			'<a href="http://theysaidso.com/quote/' + data.contents.id + '">',
				'“' + smartQuotes(data.contents.quote) + '”',
			'</a>',
		'</p>',
		'<small class="no-wrap">',
			'<a href="https://www.google.com/search?q=' + data.contents.author + '">',
				'— ' + data.contents.author,
			'</a>',
		'</small>'
	].join('');
});
