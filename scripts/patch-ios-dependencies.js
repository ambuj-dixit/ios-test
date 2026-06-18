const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function patchFile(relativePath, patcher) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    console.log(`[postinstall] Skipped missing ${relativePath}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const updated = patcher(original);

  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log(`[postinstall] Patched ${relativePath}`);
  } else {
    console.log(`[postinstall] ${relativePath} already compatible`);
  }
}

patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', source => {
  let updated = source;

  if (!updated.includes('#import <React/RCTUtils.h>')) {
    updated = updated.replace(
      '#import <React/RCTUIManager.h>\n',
      '#import <React/RCTUIManager.h>\n#import <React/RCTUtils.h>\n',
    );
  }

  updated = updated.replace(
    'UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;',
    'UIViewController *rootViewController = RCTPresentedViewController();',
  );

  return updated;
});
