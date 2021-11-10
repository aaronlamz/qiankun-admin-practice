const IS_PRD = process.env.NODE_ENV === 'production'
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const setupPlugin = (config) => {
    if (IS_PRD) {
        const plugins = []
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        )
        config.plugins = [...config.plugins, ...plugins]
    }
}

const setupMinimizer = (config) => {
    const minimizer = []
    minimizer.push(
        new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        })
    )

    config.optimization.minimizer = [
        ...config.optimization.minimizer,
        ...minimizer,
    ]
}

const setupSplitChunks = (config) => {
    config.optimization.splitChunks = {
        cacheGroups: {
            common: {
                name: 'chunk-common',
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 1,
                reuseExistingChunk: true,
                enforce: true,
            },
            vendors: {
                name: 'chunk-vendors',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'initial',
                priority: 2,
                reuseExistingChunk: true,
                enforce: true,
            },
            elementUI: {
                name: 'chunk-elementplus',
                test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                chunks: 'all',
                priority: 3,
                reuseExistingChunk: true,
                enforce: true,
            },
        },
    }
}

const setupOptimization = (config) => {
    if (IS_PRD) {
        setupMinimizer(config)
        setupSplitChunks(config)
    }
}

const setupConfigureWebpack = (config) => {
    setupOptimization(config)
    setupPlugin(config)
}

module.exports = {
    setupConfigureWebpack,
}
