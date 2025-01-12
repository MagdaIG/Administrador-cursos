module.exports = {
    // Configuración del servidor de desarrollo
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000", // URL de tu backend o JSON Server
                changeOrigin: true,
                pathRewrite: { "^/api": "" }, // Opcional, elimina el prefijo /api
            },
        },
    },
    // Alias personalizados
    configureWebpack: {
        resolve: {
            alias: {
                "@components": "@/components",
                "@views": "@/views",
                "@store": "@/store",
                "@assets": "@/assets",
            },
        },
    },
    // Configuración para la generación de mapas de origen en producción
    productionSourceMap: false,
};