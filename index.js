var loaderUtils = require('loader-utils');

module.exports = function(content) {
  // console.log(content);
  this.cacheable && this.cacheable();

  var options = loaderUtils.getOptions(this) || {};
  var ngModule = getAndInterpolateOption.call(this, 'module', 'ngMaterial'); // ngMaterial is the global angular module that does not need to explicitly required
  var requireAngular = !!options.requireAngular || false;

  var theme;

  if (content.match(/^module\.exports/)) {
    var firstQuote = findQuote(content, false);
    var secondQuote = findQuote(content, true);
    theme = content.substr(firstQuote, secondQuote - firstQuote + 1);
  } else {
    theme = JSON.stringify(content);
  }

  return 'var theme = ' + theme + ';\n' +
    (requireAngular ? 'var angular = require(\'angular\');\n' : 'window.') +
    'angular.module(\'' + ngModule + '\').config([\'$mdThemingProvider\', function(c) { c.registerStyles(theme) }]);';

  function getAndInterpolateOption(optionKey, def) {
    return options[optionKey]
      ? loaderUtils.interpolateName(this, options[optionKey], {
        context: options.context,
        content: content,
        regExp: options[optionKey + 'RegExp'] || options['regExp']
      })
      : def;
  }

  function findQuote(content, backwards) {
    var i = backwards ? content.length - 1 : 0;
    while (i >= 0 && i < content.length) {
      if (content[i] === '"' || content[i] === '\'') {
        return i;
      }
      i += backwards ? -1 : 1;
    }
    return -1;
  }
};
