export default {
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/api/books': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  esbuild: {
    target: 'esnext',
  }
}