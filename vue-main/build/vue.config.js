const { setupConfigureWebpack } = require('./config.webpack.js')
const devServer = require('./devServer.js')

module.exports = {
    indexPath: 'index.html',
    publicPath: `/admin/`,
    assetsDir: 'static',
    configureWebpack: (config) => {
        setupConfigureWebpack(config)
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'Admin Template'
            return args
        })
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/variable/index.scss";`,
            },
        },
    },
    devServer,
}
