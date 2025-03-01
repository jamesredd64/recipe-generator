import webpack from 'webpack';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import config from '../webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run webpack with a callback
webpack(config, (err, stats) => {
  if (err) {
    console.error('Webpack configuration error:', err);
    process.exit(1);
  }

  // Get JSON of stats
  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error('Webpack compilation errors:');
    info.errors.forEach(error => {
      console.error(error.message);
    });
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn('Webpack compilation warnings:');
    info.warnings.forEach(warning => {
      console.warn(warning.message);
    });
  }

  // Check for common issues
  checkCommonIssues(info);
});

function checkCommonIssues(stats) {
  // Check bundle sizes
  const bundleSizes = {};
  stats.assets.forEach(asset => {
    bundleSizes[asset.name] = (asset.size / 1024).toFixed(2) + ' KB';
  });
  console.log('\nBundle sizes:', bundleSizes);

  // Check for duplicate packages
  const packages = new Set();
  stats.modules.forEach(module => {
    if (module.name && module.name.includes('node_modules')) {
      const packageName = module.name.split('node_modules/')[1].split('/')[0];
      if (packages.has(packageName)) {
        console.warn(`Warning: Duplicate package found: ${packageName}`);
      }
      packages.add(packageName);
    }
  });

  // Check for large bundles
  const BUNDLE_SIZE_LIMIT = 244 * 1024; // 244KB
  stats.assets.forEach(asset => {
    if (asset.size > BUNDLE_SIZE_LIMIT) {
      console.warn(`Warning: Large bundle detected: ${asset.name} (${(asset.size / 1024).toFixed(2)} KB)`);
    }
  });
}
