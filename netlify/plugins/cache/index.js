module.exports = {
  onPreBuild: async ({ utils }) => {
    await utils.cache.restore(['node_modules/**', 'build/**']);
  },
  onPostBuild: async ({ utils }) => {
    await utils.cache.save(['node_modules/**', 'build/**']);
  },
};