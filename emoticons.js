(function () {
  var emoticons = [
    // Default set
    '♘', '★', '☯', '♥', '✈', '✓', '☃', '❄︎', '⌘', '✪', '☂', '➳'

    // Christmas
    // '❅', '❆', '❄', '✴', '✶', '✵', '❈', '✷'
  ];
  emoticons.sort(function() { return 0.5 - Math.random(); });
  document.querySelector('#x').innerHTML = emoticons.join('').substr(0, 7);
})();