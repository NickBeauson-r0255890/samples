var webpack = require('webpack');
var path = require('path');

var config = [
    {
        entry: [ path.resolve(__dirname, 'www', 'app.tsx'),
                 path.resolve(__dirname, 'www', 'index.html')
               ],
        output: {
            path: path.resolve(__dirname, 'dist', 'static'),
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
                    loader: 'style-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'css-loader',
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            ]
        }
    },
    {
        node: {
            fs: "empty",
            net: "empty"
        },
        entry: path.resolve(__dirname, 'server', 'app.ts'),
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
    }
];

module.exports = config;
