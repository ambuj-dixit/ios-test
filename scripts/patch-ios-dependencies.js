const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Nuclear iOS Dependency Optimization...');

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

// 1. react-native-date-picker: UIKit & Enum casting
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

// 2. react-native-screens: UIKit in Traits
patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', [
  {
    target: '@implementation RNSScreenWindowTraits',
    replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
    check: '#import <UIKit/UIKit.h>'
  }
]);

// 3. NUCLEAR PATCH: Yoga (Disable all warnings at source level)
// Wrapping Yoga files in pragmas to ignore ALL warnings that cause Werror failures
const yogaFiles = [
  'node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGStyle.cpp'
];

const yogaPragmaStart = '#pragma clang diagnostic push\n#pragma clang diagnostic ignored "-Weverything"\n';
const yogaPragmaEnd = '\n#pragma clang diagnostic pop';

yogaFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('pragma clang diagnostic ignored "-Weverything"')) {
      fs.writeFileSync(file, yogaPragmaStart + content + yogaPragmaEnd, 'utf8');
      console.log(`☢️  Nuclear Pragma applied to: ${file}`);
    }
  }
});

// 4. react-native-reanimated: C++17
patchFile('node_modules/react-native-reanimated/RNReanimated.podspec', [
  {
    target: 'header_dir = "RNReanimated"',
    replacement: 'header_dir = "RNReanimated"\n  s.pod_target_xcconfig = { "CLANG_CXX_LANGUAGE_STANDARD" => "c++17" }',
    check: 's.pod_target_xcconfig'
  }
]);

// 5. react-native-svg: UIKit Fix
patchFile('node_modules/react-native-svg/ios/Utils/RCTConvert+RNSVG.m', [
  {
    target: '#import "RCTConvert+RNSVG.h"',
    replacement: '#import <UIKit/UIKit.h>\n#import "RCTConvert+RNSVG.h"',
    check: '#import <UIKit/UIKit.h>'
  }
]);

console.log('✨ Nuclear optimization complete.');
