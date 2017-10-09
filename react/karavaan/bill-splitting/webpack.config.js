var webpack = require('webpack');
var path = require('path');

var config = [
    {
        entry: [ path.resolve(__dirname, 'src', 'app.tsx'),
                 path.resolve(__dirname, 'src', 'index.html')
               ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    loader: 'file-loader',
                    options: {
                        name: 'index.html'
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.tsx']
        }
    }
];

module.exports = config;
