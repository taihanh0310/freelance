var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    bootstrap: './src/app/bootstrap',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '..', '..', 'public', 'build'),
    publicPath: '/pharma/public/build/',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015']
        }
      },
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|woff|woff2|ttf)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: {
      Check$: path.resolve(__dirname, 'src/common/helpers/check.js'),
      Helper$: path.resolve(__dirname, 'src/common/helpers/index.js'),
      Config$: path.resolve(__dirname, 'src/common/config/index.js'),
      Routes$: path.resolve(__dirname, 'src/common/config/routes.js'),
      ScriptHOC$: path.resolve(__dirname, 'src/common/hoc/Script.js'),
      Button$: path.resolve(__dirname, 'src/common/components/Button.js'),
      Buttons$: path.resolve(__dirname, 'src/common/components/Buttons.js'),
      Container$: path.resolve(__dirname, 'src/common/components/Container.js'),
      Divider$: path.resolve(__dirname, 'src/common/components/Divider.js'),
      Flag$: path.resolve(__dirname, 'src/common/components/Flag.js'),
      Header$: path.resolve(__dirname, 'src/common/components/Header.js'),
      Icon$: path.resolve(__dirname, 'src/common/components/Icon.js'),
      Icons$: path.resolve(__dirname, 'src/common/components/Icons.js'),
      Image$: path.resolve(__dirname, 'src/common/components/Image.js'),
      Images$: path.resolve(__dirname, 'src/common/components/Images.js'),
      Input$: path.resolve(__dirname, 'src/common/components/Input.js'),
      Label$: path.resolve(__dirname, 'src/common/components/Label.js'),
      Labels$: path.resolve(__dirname, 'src/common/components/Labels.js'),
      List$: path.resolve(__dirname, 'src/common/components/List.js'),
      Item$: path.resolve(__dirname, 'src/common/components/Item.js'),
      Loader$: path.resolve(__dirname, 'src/common/components/Loader.js'),
      Segment$: path.resolve(__dirname, 'src/common/components/Segment.js'),
      Segments$: path.resolve(__dirname, 'src/common/components/Segments.js'),
      Grid$: path.resolve(__dirname, 'src/common/components/Grid.js'),
      Row$: path.resolve(__dirname, 'src/common/components/Row.js'),
      Column$: path.resolve(__dirname, 'src/common/components/Column.js'),
      Menu$: path.resolve(__dirname, 'src/common/components/Menu.js'),
      Content$: path.resolve(__dirname, 'src/common/components/Content.js'),
      Form$: path.resolve(__dirname, 'src/common/components/Form.js'),
      Field$: path.resolve(__dirname, 'src/common/components/Field.js'),
      Fields$: path.resolve(__dirname, 'src/common/components/Fields.js'),
      Table$: path.resolve(__dirname, 'src/common/components/Table.js'),
      Dropdown$: path.resolve(__dirname, 'src/common/components/Dropdown.js'),
      Dimmer$: path.resolve(__dirname, 'src/common/components/Dimmer.js'),
      SegmentLoader$: path.resolve(__dirname, 'src/common/components/SegmentLoader.js'),
      ConfirmModal$: path.resolve(__dirname, 'src/common/components/ConfirmModal.js'),
      Select$: path.resolve(__dirname, 'src/common/components/Select.js'),
      Checkbox$: path.resolve(__dirname, 'src/common/components/Checkbox.js'),
      Pagination$: path.resolve(__dirname, 'src/common/components/Pagination.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    new webpack.optimize.CommonsChunkPlugin('init'),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
      'ReactReduxI18n': 'react-redux-i18n',
      'Redux': 'redux',
      'ReactRedux': 'react-redux',
      'ReactRouter': 'react-router',
      'ReactRouterRedux': 'react-router-redux',
      'ReactModal': 'react-modal',
      'Numeral': 'numeral',
      'axios': 'axios',
      'Moment': 'moment',
      'Keyboard': 'keyboardjs',
      'ScriptHOC': 'ScriptHOC',
      'Config': 'Config',
      'Check': 'Check',
      'Helper': 'Helper',
      'Button': 'Button',
      'Buttons': 'Buttons',
      'Container': 'Container',
      'Divider': 'Divider',
      'Flag': 'Flag',
      'Header': 'Header',
      'Icon': 'Icon',
      'Icons': 'Icons',
      'Image': 'Image',
      'Images': 'Images',
      'Input': 'Input',
      'Label': 'Label',
      'Labels': 'Labels',
      'List': 'List',
      'Item': 'Item',
      'Loader': 'Loader',
      'Segment': 'Segment',
      'Segments': 'Segments',
      'Grid': 'Grid',
      'Row': 'Row',
      'Column': 'Column',
      'Menu': 'Menu',
      'Content': 'Content',
      'Form': 'Form',
      'Field': 'Field',
      'Fields': 'Fields',
      'Table': 'Table',
      'Dropdown': 'Dropdown',
      'Dimmer': 'Dimmer',
      'SegmentLoader': 'SegmentLoader',
      'ConfirmModal': 'ConfirmModal',
      'Select': 'Select',
      'Checkbox': 'Checkbox',
      'Routes': 'Routes',
      'Pagination': 'Pagination'
    })
  ]
};