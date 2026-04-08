const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withModularHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      let podfileContent = fs.readFileSync(podfilePath, 'utf8');
      
      const modularHeaders = `  pod 'SDWebImage', :modular_headers => true\n  pod 'SDWebImageSVGCoder', :modular_headers => true`;
      
      if (!podfileContent.includes(modularHeaders)) {
        // Add modular headers after use_expo_modules!
        podfileContent = podfileContent.replace(
          /use_expo_modules!/,
          `use_expo_modules!\n${modularHeaders}`
        );
        fs.writeFileSync(podfilePath, podfileContent);
      }
      
      return config;
    },
  ]);
};

module.exports = withModularHeaders;
