module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        port: 8888,
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                components: "@/components",
                views: "@/views",
            },
        },
    },
};
