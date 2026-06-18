const fs = require('fs');
const path = require('path');

console.log('🚀 Running Surgical iOS Dependency Patches...');

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
        return; // Already patched
    }
    content = content.split(replacement.target).join(replacement.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Patched: ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for: ${filePath}`);
  }
}

// 1. Fix react-native-date-picker (Missing UIKit and UIControlEvents cast)
patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', [
  {
    target: '#import "RNDatePickerManager.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"',
    check: '#import <UIKit/UIKit.h>'
  },
  {
    target: 'UIControlEventValueChanged',
    replacement: '(UIControlEvents)UIControlEventValueChanged'
  },
  {
    target: '(UIControlEvents)(UIControlEvents)', // Cleanup if already patched
    replacement: '(UIControlEvents)'
  }
]);

// 2. Fix react-native-screens (RNSScreenWindowTraits.mm - missing UIKit for orientation traits)
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '#import "RNSScreenWindowTraits.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RNSScreenWindowTraits.h"',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. Fix CocoaPods Privacy Script in React Native 0.72 (Crashes pod install)
patchFile('node_modules/react-native/scripts/cocoapods/privacy_manifest_utils.rb', [
  {
    target: 'def self.add_aggregated_privacy_manifest(installer)',
    replacement: 'def self.add_aggregated_privacy_manifest(installer); return; ',
    check: 'return;'
  }
]);

console.log('✨ All iOS patches applied successfully.');
