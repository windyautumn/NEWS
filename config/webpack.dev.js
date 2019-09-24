const base = require("./webpack.base")
const merge = require('webpack-merge')


module.exports = merge(base,{
    mode:"development",
    devtool: "source-map", // 生成映射源代码文件,找到源文件错误的地方

    // + 开发服务配置
    devServer: {
        port: 8001, // 默认端口是8080
        stats:'errors-only'
    },

})