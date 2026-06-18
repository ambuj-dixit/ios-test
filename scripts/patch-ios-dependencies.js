const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Professional iOS Dependency Optimization...');

/**
 * Surgically patches a file with provided replacements.
 */
function patchFile(filePath, replacements) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found (Skipping): ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  replacements.forEach(replacement => {
    // Skip if the replacement check string is already present
    if (replacement.check && content.includes(replacement.check)) {
      return;
    }

    if (replacement.target instanceof RegExp) {
      content = content.replace(replacement.target, replacement.replacement);
    } else {
      const escapedTarget = replacement.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const targetRegex = new RegExp(escapedTarget, 'g');
      content = content.replace(targetRegex, replacement.replacement);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Optimized: ${filePath}`);
  } else {
    console.log(`ℹ️  Already optimized: ${filePath}`);
  }
}

// 1. react-native-date-picker: Missing UIKit and proper Enum casting
patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', [
  {
    target: '#import "RNDatePickerManager.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"',
    check: '#import <UIKit/UIKit.h>'
  },
  {
    target: 'UIControlEventValueChanged',
    replacement: '(UIControlEvents)UIControlEventValueChanged'
  }
]);

// 2. react-native-screens: Missing UIKit in Traits
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. react-native-reanimated: Ensure C++17 Podspec enforcement
patchFile('node_modules/react-native-reanimated/RNReanimated.podspec', [
  {
    target: 'header_dir = "RNReanimated"',
    replacement: 'header_dir = "RNReanimated"\n  s.pod_target_xcconfig = { "CLANG_CXX_LANGUAGE_STANDARD" => "c++17" }',
    check: 's.pod_target_xcconfig'
  }
]);

// 4. react-native-svg: Fix for rare compilation issues in 0.72
patchFile('node_modules/react-native-svg/ios/Utils/RCTConvert+RNSVG.m', [
  {
    target: '#import "RCTConvert+RNSVG.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RCTConvert+RNSVG.h"',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 5. Cleanup for CocoaPods Privacy Manifest logic (Ensures local stability)
patchFile('node_modules/react-native/scripts/cocoapods/privacy_manifest_utils.rb', [
  {
    target: 'def self.add_aggregated_privacy_manifest(installer)',
    replacement: 'def self.add_aggregated_privacy_manifest(installer); return; ',
    check: 'return;'
  }
]);

console.log('✨ Professional dependency optimization complete.');
