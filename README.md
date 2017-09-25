# AngularJS Material Theme custom CSS loader for [webpack](http://webpack.github.io/)

Adds your AngularJS Material theme custom CSS into your webpack Javascript Bundle.

ng-md-theme-loader does not minify or process your CSS at all, and instead uses standard loaders such as [sass-loader](https://github.com/webpack-contrib/sass-loader). This gives you enough flexibility to pick and choose your loaders.

## Install

```bash
npm install ng-md-theme-loader --save-dev
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

[Documentation: ng-material's theme implementation](https://github.com/angular/material/blob/master/docs/guides/THEMES_IMPL_NOTES.md#the-mini-dsl)

ng-md-theme-loader creates a JS module that registers custom CSS template with [$mdThemingProvider](https://material.angularjs.org/1.1.4/#custom-theme-styles)  e.g.

```javascript
require('!ng-md-theme-loader!file.theme.css');
```
generates the javascript:
```javascript
angular.module('ngMaterial').run(['$mdThemingProvider', function(c) { c.registerStyles('content of the ?.theme.css file') }]);
```


### `module`

By default ng-md-theme-loader adds a run method to the global 'ngMaterial' module which should be explicitly required by your app for using Angular Material.
You can override this by setting the `module` parameter, e.g.

```javascript
require('!ng-md-theme-loader?module=myApp!file.theme.css');
```
 generates the javascript:
```javascript
angular.module('myApp').run(['$mdThemingProvider', function(c) { c.registerStyles('content of the ?.theme.css file') }]);
```

NOTE: specified module should be preliminary defined in your application

### Parameter Interpolation

`module` parameter is interpolated using 
[Webpack's standard interpolation rules](https://github.com/webpack/loader-utils#interpolatename).

### Using with npm requires

This module relies on angular being available on `window` object. However, in cases angular is connected from `node_modules` via `require('angular')`, option to force this module to get the angular should be used:

```javascript
require('!ng-md-theme-loader?requireAngular!file.theme.css');
```

generates the javascript:
```javascript
var angular = require('angular');
angular.module('ngMaterial').run(['$mdThemingProvider', function(c) { c.registerStyles('content of the ?.theme.css file') }]);
```

## Webpack Config

It's recommended to adjust your `webpack.config` so `ng-md-theme-loader` is applied automatically on all files ending with e.g. `.theme.css`. For Webpack 1 this would be something like:

```javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.theme\.css$/,
        loader: 'ng-md-theme'
      },
      {
        test: /\.theme\.scss$/,
        loader: 'ng-md-theme!sass'
      }
      // other loaders...
    ]
  }
};
```
For Webpack 2 this would be something like:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.theme\.css$/,
        use: [
          { loader: 'ng-md-theme-loader'},
        ]
      },
      {
        test: /\.theme\.scss$/,
        use: [
          { loader: 'ng-md-theme-loader'},
          { loader: 'sass-loader' }
        ]
      }
      // other loaders...
    ]
  }
};
```
Make sure you already have `sass-loader` installed. Then you only need to write: `require('file.theme.css')`.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
