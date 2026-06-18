const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Safe & Professional iOS Dependency Optimization...');

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
    if (replacement.check && content.includes(replacement.check)) {
      return;
    }

    // Using string replacement instead of regex to avoid parsing issues
    if (content.includes(replacement.target)) {
        content = content.split(replacement.target).join(replacement.replacement);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Optimized: ${filePath}`);
  }
}

// 1. Fix react-native-date-picker: Missing UIKit and proper Enum casting
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

// 2. Fix react-native-screens: Missing UIKit in Traits
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. NUCLEAR PRAGMA INJECTION: Yoga Source Files
// We inject pragmas directly into source files to kill warnings at the compiler entry point.
const yogaFiles = [
  'node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGStyle.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGEnums.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGConfig.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/Utils.cpp'
];

yogaFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('pragma clang diagnostic ignored "-Weverything"')) {
      content = '#pragma clang diagnostic push\n#pragma clang diagnostic ignored "-Weverything"\n' + content + '\n#pragma clang diagnostic pop';
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`☢️  Nuclear Pragma applied to source: ${file}`);
    }
  }
});

console.log('✨ Safe dependency optimization complete.');
