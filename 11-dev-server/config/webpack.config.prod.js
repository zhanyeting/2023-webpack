const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


// 生产环境配置（exclude 公共配置）
module.exports = {
    output: {
        filename: 'js/[name].bundle.[contenthash].js',
        publicPath: 'http://localhost:8080/',   // 配置 cdn 位置路径
    },

    mode: 'production',
    
    // 优化项
    optimization: {
        minimize: true,    // 告知 webpack 使用 TerserPlugin
        runtimeChunk: {
            name: 'runtime~single'
        },
        minimizer: [
            new CssMinimizerPlugin(),  // 压缩 css 代码
            new TerserPlugin(),   // 压缩 js 代码

            // 有损压缩图片  npx cnpm i @squoosh/lib -S
            // new ImageMinimizerPlugin({   
            //   minimizer: {
            //     implementation: ImageMinimizerPlugin.squooshMinify,
            //     // options: {
            //     //   // Your options for `squoosh`
            //     //   encodeOptions: {
            //     //     mozjpeg: {
            //     //       // That setting might be close to lossless, but it’s not guaranteed
            //     //       // https://github.com/GoogleChromeLabs/squoosh/issues/85
            //     //       quality: 100,
            //     //     },
            //     //     webp: {
            //     //       lossless: 1,
            //     //     },
            //     //     avif: {
            //     //       // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
            //     //       cqLevel: 0,
            //     //     },
            //     //   },
            //     // }
            //   },
            // }),

            // 无损压缩图片，会使得图片文件依然很大
            // new ImageMinimizerPlugin({
            //   minimizer: {
            //     implementation: ImageMinimizerPlugin.imageminGenerate,
            //     options: {
            //       plugins: [
            //         ["gifsicle", { interlaced: true }],
            //         ["jpegtran", { progressive: true }],
            //         ["optipng", { optimizationLevel: 5 }],
            //         [
            //           "svgo",
            //           {
            //             plugins: [
            //               "preset-default",
            //               "prefixIds",
            //               {
            //                 name: "sortAttrs",
            //                 params: {
            //                   xmlnsOrder: "alphabetical",
            //                 },
            //               },
            //             ],
            //           },
            //         ],
            //       ],
            //     },
            //   },
            // }),
            
        ],
    },
    
    //  npx cnpm i -S imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo


    //关闭 webpack 的性能提示
    performance: {
        hints:false
    }
}
