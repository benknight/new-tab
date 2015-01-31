// Because I fucking hate dumb quotes.
// Regexes stolen from https://github.com/kellym/smartquotesjs/blob/master/src/smartquotes.js
function smartQuotes (str) {
	return str
		.replace(/(\W|^)"(\S)/g, '$1\u201c$2') // beginning "
		.replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2') // ending "
		.replace(/([^0-9])"/g,'$1\u201d') // remaining " at end of word
		.replace(/(\W|^)'(\S)/g, '$1\u2018$2') // beginning '
		.replace(/([a-z])'([a-z])/ig, '$1\u2019$2') // conjunction's possession
		.replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3') // ending '
		.replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3') // abbrev. years like '93
		.replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
		.replace(/'''/g, '\u2034') // triple prime
		.replace(/("|'')/g, '\u2033') // double prime
		.replace(/'/g, '\u2032'); // prime
}

// Convert ugly hyphens to erotic dashes
function hyphenToDash (str) {
	return str
		.replace(/ - /g, ' – ')
		.replace(/ -- /g, ' – ')
		.replace(/"- /g, '" – ')
		.replace(/\n-/g, ' – ');
}

// Set font size based on word length
function setFontSizes ($quote) {
	var numWords = $quote.innerText.split(' ').length;
	if ((numWords >= 1) && (numWords < 20)) {
		$quote.style.fontSize = '125%';
	} else if ((numWords >= 20) && (numWords < 40)) {
		$quote.style.fontSize = '100%';
	} else if ((numWords >= 40) && (numWords < 60)) {
		$quote.style.fontSize = '75%';
	} else {
		$quote.style.fontSize = '50%';
	}
}

// --- r/quotes ---

// show a random quote from the top 6 hot posts on r/quotes.
// cache is broken once an hour

var qodURL1 = 'http://www.reddit.com/r/quotes/.json?v=' + (new Date().toISOString().substr(0, 13));

jQuery.get(qodURL1, function (data, textStatus) {
	var $quote = document.querySelector('#quote-1');
	// var randomIndex = Math.ceil(Math.random() * 6);
	var quoteData = data.data.children[1].data;
	$quote.innerHTML = [
		'<cite>r/quotes</cite>',
		'<p>',
			'<a href="' + quoteData.url + '">',
				smartQuotes(hyphenToDash(quoteData.title)),
			'</a>',
		'</p>',
	].join('');
	setFontSizes($quote);
});


// -- goodreads ---

var qodURL = 'https://www.goodreads.com/quotes_of_the_day/rss';

jQuery.get(qodURL, function (data, textStatus) {
	var $quote = document.querySelector('#quote-0');
	var item = data.querySelector('item');
	var dummyNode = document.createElement('div');
	dummyNode.innerHTML = item.querySelector('description').textContent;
	dummyNode.querySelector('a').setAttribute(
		'href',
		'https://www.google.com/search?q=' + dummyNode.querySelector('a').innerText
	);
	$quote.innerHTML = [
		'<cite>Goodreads.com</cite>',
		'<p><a href="https://www.google.com/search?q=' + dummyNode.querySelector('div:first-child').innerText + '">',
			dummyNode.querySelector('div:first-child').innerHTML,
		'</a></p>',
		'<small>' + hyphenToDash(dummyNode.querySelector('div:last-child').innerHTML) + '</small>'
	].join('');
	setFontSizes($quote);
});


// --- theysaidso.com ---

// theysaidso has really shitty quotes, but I'm keeping this code around for some reason.
// for inspriting quotes add &category=inspire

var qodURL2 = 'http://api.theysaidso.com/qod?v=' + (new Date().toISOString().substr(0, 10));
jQuery.get(qodURL2, function (data, textStatus) {
	var $quote = document.querySelector('#quote-2');
	$quote.innerHTML = [
		'<cite>Theysaidso.com</cite>',
		'<p>',
			'<a href="http://theysaidso.com/quote/' + data.contents.id + '">',
				smartQuotes(data.contents.quote),
			'</a>',
		'</p>',
		'<small class="no-wrap">',
			'<a href="https://www.google.com/search?q=' + data.contents.author + '">',
				'— ' + data.contents.author,
			'</a>',
		'</small>'
	].join('');
	setFontSizes($quote);
});