var webpack = require('webpack');
var path = require('path');
module.exports = {
  devtool: undefined,
  entry: [
    'babel-polyfill',
    'script!jquery/jquery.min.js',
    'script!jquery-ui-dist/jquery-ui.min.js',
    //'script!app/external/jquery.ui.rotatable.js',
    //'script!public/js/visibility.min.js',
    './app/app.production.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/js/ishopdesign.min.js',
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/api'
    ],
    alias: {
      ACTION_TYPES: 'app/actions/ACTION_TYPES',
      actions: 'app/actions/index',
      ISD_API: 'app/api/index',
      ISD_Container: 'app/components/Layouts/Container/Container',
      ISD_ContainerView: 'app/components/Layouts/Container/ContainerView',
      ISD_Row: 'app/components/Layouts/Row/Row',
      ISD_Column: 'app/components/Layouts/Column/Column',
      ISD_Resizable: 'app/components/UI/Helper/ResizableComponent',
      ISD_BaseTemplates: 'app/components/Plugins/Base/Templates',
      ISD_BaseElement: 'app/components/Plugins/Base/Index',
      ISD_BaseElementView: 'app/components/Plugins/Base/View',
      ISD_BaseControls: 'app/components/Plugins/Base/Controls',
      ISD_Plugins: 'app/components/PluginRegister',
      ISD_PluginsView: 'app/components/PluginRegisterView',
      //ISD built-in controls component
      ISD_Dropdown: 'app/components/UI/Controls/Dropdown',
      ISD_Colorpicker: 'app/components/UI/Controls/Colorpicker',
      ISD_SliderInputUnit: 'app/components/UI/Controls/SliderInputUnit',
      ISD_SelectImageButton: 'app/components/UI/Controls/SelectImageButton',
      ISD_Input: 'app/components/UI/Controls/Input',
      ISD_CustomCss: 'app/components/UI/Controls/CustomCss',
      ISD_AlignButton: 'app/components/UI/Controls/AlignButton',
      ISD_IconList: 'app/components/UI/Controls/IconList',
      ISD_BorderControl: 'app/components/UI/Controls/BorderControl',
      ISD_ElementBoxShadow: 'app/components/UI/Controls/ElementBoxShadow',
      ISD_ProductLibrary: 'app/components/UI/Controls/ProductLibrary',
      ISD_PostLibrary: 'app/components/UI/Controls/PostLibrary',
      //ISD_PAGES
      ISD_CategoryPage: 'app/components/Pages/Category',
      ISD_ProductPage: 'app/components/Pages/Product',
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'app')
      }
    ]
  }
}