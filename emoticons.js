(function () {
  var emoticons = [
    // Default set
    '♘', '★', '☯', '♥', '✈', '✓', '☃', '❄︎', '⌘', '✪', '☂', '➳'

    // Winter
    // '❅', '❆', '❄', '✴', '✶', '✵', '❈', '✷'
  ];
  emoticons.sort(function() { return 0.5 - Math.random(); });
  document.querySelector('#emoticons').innerHTML = emoticons.join('').substr(0, 7);
})();