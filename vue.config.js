module.exports = {
  devServer: {
    proxy: {
      '/movie': {
        target: 'http://huangjiangjun.top:9001/movie/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
}
