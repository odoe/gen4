/**
 * Look to `util/build/buildControlDefault.js` for more information on available options and their default values.
 */

var profile = {
  // `basePath` is relative to the directory containing this profile file; in this case, it is being set to the
  // src/ directory, which is the same place as the `baseUrl` directory in the loader configuration. (If you change
  // this, you will also need to update run.js.)
  basePath: '../dist/',

  // This is the directory within the release directory where built packages will be placed. The release directory
  // itself is defined by `build.sh`. You should probably not use this; it is a legacy option dating back to Dojo
  // 0.4.
  // If you do use this, you will need to update build.sh, too.
  // releaseName: '',

  // Builds a new release.
  action: 'release',

  // Strips all comments and whitespace from CSS files and inlines @imports where possible.
  cssOptimize: 'comments',

  // Excludes tests, demos, and original template files from being included in the built version.
  mini: true,

  // plugins: {
  //   "xstyle/css": "xstyle/build/amd-css"
  // },

  // Uses Closure Compiler as the JavaScript minifier. This can also be set to "shrinksafe" to use ShrinkSafe,
  // though ShrinkSafe is deprecated and not recommended.
  // This option defaults to "" (no compression) if not provided.
  optimize: 'uglify',

  // We're building layers, so we need to set the minifier to use for those, too.
  // This defaults to "shrinksafe" if not provided.
  layerOptimize: 'uglify',

  // A list of packages that will be built. The same packages defined in the loader should be defined here in the
  // build profile.
  packages: [
    // Using a string as a package is shorthand for `{ name: 'app', location: 'app' }`
    'app',
    'dijit',
    'dojo',
    'dojox',
    'dstore',
    'dgrid',
    'esri', {
      name: 'moment',
      location: 'moment',
      main: 'moment',
      trees: [
          // don't bother with .hidden, tests, min, src, and templates
          [".", ".", /(\/\.)|(~$)|(test|txt|src|min|templates)/]
      ],
      resourceTags: {
        amd: function (filename, mid) {
          return /\.js$/.test(filename);
        }
      }
    }
  ],

  // Build source map files to aid in debugging.
  // This defaults to true.
  useSourceMaps: false,

  // Strips all calls to console functions within the code. You can also set this to "warn" to strip everything
  // but console.error, and any other truthy value to strip everything but console.warn and console.error.
  // This defaults to "normal" (strip all but warn and error) if not provided.
  stripConsole: 'all',

  // The default selector engine is not included by default in a dojo.js build in order to make mobile builds
  // smaller. We add it back here to avoid that extra HTTP request. There is also an "acme" selector available; if
  // you use that, you will need to set the `selectorEngine` property in index.html, too.
  selectorEngine: 'acme',

  // Any module in an application can be converted into a "layer" module, which consists of the original module +
  // additional dependencies built into the same file. Using layers allows applications to reduce the number of HTTP
  // requests by combining all JavaScript into a single file.
  layers: {
    // This is the main loader module. It is a little special because it is treated like an AMD module even though
    // it is actually just plain JavaScript. There is some extra magic in the build system specifically for this
    // module ID.
    'dojo/dojo': {
      // By default, the build system will try to include `dojo/main` in the built `dojo/dojo` layer, which adds
      // a bunch of stuff we do not want or need. We want the initial script load to be as small and quick to
      // load as possible, so we configure it as a custom, bootable base.
      boot: true,
      customBase: true,
      include: [
        // include the app
        'app/main',
        // dpendencies that will be requested if not included
        // probably in a nested require block or something the build script can't resolve
        'dojox/gfx/path',
        'dojox/gfx/svg',
        'dojox/gfx/shape',
        // dgrid
        'dgrid/util/touch',
        // moment,
        'moment/moment',
        // esri stuff
        'esri/layers/FeatureLayer',
        'esri/layers/support/LabelClass',
        'esri/layers/graphics/controllers/SnapshotController',
        'esri/layers/graphics/sources/FeatureLayerSource',
        'esri/views/layers/GraphicsLayerView',
        'esri/views/layers/GroupLayerView',
        'esri/views/2d/layers/TiledLayerView2D',
        'esri/views/2d/layers/GraphicsLayerView2D',
        'esri/views/2d/layers/DynamicLayerView2D',
        'esri/views/2d/layers/VectorTileLayerView2D',
        'esri/portal/creators/VectorTileLayerCreator',
        'esri/portal/creators/layersCreator',
        'esri/portal/creators/TiledServiceLayerCreator',
        'esri/portal/creators/TiledElevationServiceLayerCreator'
      ],
      exclude: [
        'app/config'
      ],
      includeLocales: ['en-us', 'es']
    }//,

    // In this demo application, we load `app/main` on the client-side, so here we could build a separate layer containing
    // that code. (Practically speaking, you probably just want to roll everything into the `dojo/dojo` layer,
    // but this helps provide a basic illustration of how multi-layer builds work.) Note that when you create a new
    // layer, the module referenced by the layer is always included in the layer (in this case, `app/main`), so it
    // does not need to be explicitly defined in the `include` array.
    // 'app/main': {}
  },

  // Providing hints to the build system allows code to be conditionally removed on a more granular level than simple
  // module dependencies can allow. This is especially useful for creating tiny mobile builds. Keep in mind that dead
  // code removal only happens in minifiers that support it! Currently, only Closure Compiler to the Dojo build system
  // with dead code removal. A documented list of has-flags in use within the toolkit can be found at
  // <http://dojotoolkit.org/reference-guide/dojo/has.html>.
  staticHasFeatures: {
    // The trace & log APIs are used for debugging the loader, so we do not need them in the build.
    'dojo-trace-api': 0,
    'dojo-log-api': 0,

    // This causes normally private loader data to be exposed for debugging. In a release build, we do not need
    // that either.
    'dojo-publish-privates': 0,
    // This application is pure AMD, so get rid of the legacy loader.
    'dojo-sync-loader': 0,
    // `dojo-xhr-factory` relies on `dojo-sync-loader`, which we have removed.
    'dojo-xhr-factory': 0,
    // We are not loading tests in production, so we can get rid of some test sniffing code.
    'dojo-test-sniff': 0,
    'extend-esri': 0,
    "config-deferredInstrumentation": 0,
    "config-dojo-loader-catches": 0,
    "config-tlmSiblingOfDojo": 0,
    "dojo-amd-factory-scan": 0,
    "dojo-combo-api": 0,
    "dojo-config-api": 1,
    "dojo-config-require": 0,
    "dojo-debug-messages": 0,
    "dojo-dom-ready-api": 1,
    "dojo-firebug": 0,
    "dojo-guarantee-console": 1,
    "dojo-has-api": 1,
    "dojo-inject-api": 1,
    "dojo-loader": 1,
    "dojo-modulePaths": 0,
    "dojo-moduleUrl": 0,
    "dojo-requirejs-api": 0,
    "dojo-sniff": 1,
    "dojo-timeout-api": 0,
    "dojo-undef-api": 0,
    "dojo-v1x-i18n-Api": 1,
    "dom": 1,
    "host-browser": 1,
    "extend-dojo": 1
  },

  defaultConfig: {
    parseOnLoad: true,
    deps: ['app/main'],
    hasCache: {
      'extend-esri': 0,
      'dojo-has-api': 1,
      'dojo-undef-api': 0
    },
    paths: {
      'app/config': './config',
      'esri/layers/vector-tile': './vector-tile',
      'moment': './moment'
    }
  }
};
