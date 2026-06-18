const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Surgical iOS Dependency Optimization...');

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
  }
}

// 1. Fix Yoga.podspec - Use Ruby comment # instead of //
patchFile('node_modules/react-native/ReactCommon/yoga/Yoga.podspec', [
  {
    target: "'-Werror',",
    replacement: "# '-Werror',",
    check: "# '-Werror',"
  }
]);

// 2. react-native-date-picker: UIKit & Enum casting
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

// 3. react-native-screens: UIKit in Traits
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 4. Source-level Warning Suppression for Yoga (Absolute safety)
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
      console.log(`☢️  Nuclear Pragma applied: ${file}`);
    }
  }
});

console.log('✨ Dependency optimization complete.');
