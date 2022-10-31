const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const dir = path.resolve(__dirname)+'/app';

module.exports = (env, argv) => ({
    mode: 'development',
    entry: {
        app: dir + '/src/app.js',
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: './bundles/',
        path: dir + '/../public/bundles',
    },
    watchOptions: {
        poll: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_(.*)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
                components: {
                    test: /^[\\/]components[\\/]/,
                    name:'components',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [{
            test: /.js$/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                },
            },
        },
        ],
    },
    plugins: [
        new CopyPlugin([
            {from: dir + '/src/index.html', to: dir + '/../public/index.html'},
            {from: dir + '/assets', to: dir + '/../public/assets'},
        ]),
        new HtmlWebpackPlugin({
            title: 'Page Title',
            template: dir + '/src/index.html',
            filename: dir + '/../public/index.html',
            scriptLoading: 'defer',
        }),
        new GenerateSW({
            exclude: [
                /node_modules\/(.*)\.(?!(js$))/,
                /assets\/(.*)\.(woff2|woff|ttf|eot|otf|jpg|jpeg|png)$/,
            ],
            runtimeCaching: [
                {
                    // Routing via a matchCallback function:
                    urlPattern: /^.*\.(json|js|css|html)$/,
                    handler: 'StaleWhileRevalidate',
                },
                {
                    urlPattern: /^.*\.(woff2|woff|ttf|eot|otf|jpg|jpeg|png|svg)$/,
                    handler: 'CacheFirst',
                },
                ],
                swDest: dir +'/../public/service-worker.js',
                skipWaiting: true,
                clientsClaim: true,
                navigateFallbackDenylist:[
                    /\/api\//,
                    /\/media\//,
                    /\/share\//,
                    /\/worker/,
                ],
                navigateFallback:'/index.html',
                sourcemap: false


    }),
],
});