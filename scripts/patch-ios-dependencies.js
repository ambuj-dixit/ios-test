const fs = require('fs');
const path = require('path');

console.log('🚀 Running Professional iOS Dependency Patches...');

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
    const targetRegex = new RegExp(replacement.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(targetRegex, replacement.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Patched: ${filePath}`);
  }
}

// 1. Fix Yoga.podspec (Remove -Werror)
patchFile('node_modules/react-native/ReactCommon/yoga/Yoga.podspec', [
  {
    target: "'-Werror',",
    replacement: "// '-Werror',"
  }
]);

// 2. Fix react-native-date-picker
patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', [
  {
    target: '#import "RNDatePickerManager.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. Fix react-native-screens
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 4. Nuclear Pragma for Yoga Source (Double protection)
const yogaSourceFiles = [
  'node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGStyle.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGEnums.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGConfig.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/Utils.cpp'
];

yogaSourceFiles.forEach(file => {
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

console.log('✨ Dependency patches finalized.');
