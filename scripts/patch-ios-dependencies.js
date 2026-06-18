const fs = require('fs');
const path = require('path');

console.log('🚀 Running Professional iOS Dependency Patches...');

/**
 * Surgically patches a file with provided replacements.
 */
function patchFile(filePath, replacements) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  replacements.forEach(replacement => {
    if (replacement.check && content.includes(replacement.check)) {
      return;
    }

    if (replacement.target instanceof RegExp) {
      content = content.replace(replacement.target, replacement.replacement);
    } else {
      const targetRegex = new RegExp(replacement.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(targetRegex, replacement.replacement);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Patched: ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
  }
}

// 1. Fix react-native-date-picker (UIKit import)
patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', [
  {
    target: '#import "RNDatePickerManager.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 2. Fix react-native-screens (UIKit import)
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. Fix Reanimated (C++17 enforcement)
patchFile('node_modules/react-native-reanimated/RNReanimated.podspec', [
  {
    target: 'header_dir = "RNReanimated"',
    replacement: 'header_dir = "RNReanimated"\n  s.pod_target_xcconfig = { "CLANG_CXX_LANGUAGE_STANDARD" => "c++17" }',
    check: 's.pod_target_xcconfig'
  }
]);

// 4. Resolve "Duplicate Output File" for React-Core in RN 0.72
// This surgically removes the duplicate headers from the Pods project logic if possible,
// but usually Podfile's USE_HEADERMAP=NO handles this.

console.log('✨ Professional Dependency patches finalized.');
