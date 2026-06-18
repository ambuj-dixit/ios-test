const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Professional iOS Dependency Optimization (v6)...');

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

    if (content.includes(replacement.target)) {
        content = content.split(replacement.target).join(replacement.replacement);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Optimized: ${filePath}`);
  }
}

// 1. Fix Yoga.podspec - Correct Ruby comment and aggressively remove Werror
// We use a broader match to ensure it catches variations in whitespace
patchFile('node_modules/react-native/ReactCommon/yoga/Yoga.podspec', [
  {
    target: "'-Werror',",
    replacement: "# '-Werror',",
    check: "# '-Werror',"
  },
  {
    target: "'-Wall',",
    replacement: "# '-Wall',",
    check: "# '-Wall',"
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

// 4. NUCLEAR PRAGMA INJECTION: Yoga Source Files
// We use a recursive search to find every Yoga file regardless of internal structure changes
const yogaRoot = path.join(process.cwd(), 'node_modules/react-native/ReactCommon/yoga/yoga');
if (fs.existsSync(yogaRoot)) {
    const patchYogaSource = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                patchYogaSource(fullPath);
            } else if (file.endsWith('.cpp') || file.endsWith('.h')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (!content.includes('pragma clang diagnostic ignored "-Weverything"')) {
                    // Inject at the absolute top
                    const nuclearPragma = '#pragma clang diagnostic push\n#pragma clang diagnostic ignored "-Weverything"\n';
                    fs.writeFileSync(fullPath, nuclearPragma + content + '\n#pragma clang diagnostic pop', 'utf8');
                    console.log(`☢️  Nuclear Pragma applied: ${file}`);
                }
            }
        });
    };
    patchYogaSource(yogaRoot);
}

console.log('✨ Dependency optimization complete.');
