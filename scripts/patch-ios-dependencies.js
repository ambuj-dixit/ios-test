const fs = require('fs');
const path = require('path');

console.log('🚀 Running World-Class iOS Dependency Patches...');

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
    // Use regex to be more flexible with whitespace
    const targetRegex = new RegExp(replacement.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(targetRegex, replacement.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Patched: ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed or already patched: ${filePath}`);
  }
}

// 1. Fix react-native-date-picker
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

// 2. Fix react-native-screens (Ensuring UIKit is present in WindowTraits)
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. Fix CocoaPods Privacy Script
patchFile('node_modules/react-native/scripts/cocoapods/privacy_manifest_utils.rb', [
  {
    target: 'def self.add_aggregated_privacy_manifest(installer)',
    replacement: 'def self.add_aggregated_privacy_manifest(installer); return; ',
    check: 'return;'
  }
]);

console.log('✨ Dependency patches finalized.');
