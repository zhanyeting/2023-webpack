const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

module.exports = (env) => {
    console.log(env.production, env.development, env);
    switch (true) {
        case env.production:
            return merge(commonConfig, prodConfig);

        case env.development:
            return merge(commonConfig, devConfig);
    
        default:
            throw new Error('No matching configuration was found!');
    }
}