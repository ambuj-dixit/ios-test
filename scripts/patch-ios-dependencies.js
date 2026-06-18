const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Professional Nuclear Build Fix...');

/**
 * Recursively find a file in a directory.
 */
function findFileRecursive(base, fileName) {
    const files = fs.readdirSync(base);
    for (const file of files) {
        const fullPath = path.join(base, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'ios' || file === 'android' || file === '.git') continue;
            const found = findFileRecursive(fullPath, fileName);
            if (found) return found;
        } else if (file === fileName) {
            return fullPath;
        }
    }
    return null;
}

function patchFile(filePath, replacements) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;

    replacements.forEach(replacement => {
        if (replacement.check && content.includes(replacement.check)) return;

        const escapedTarget = replacement.target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const targetRegex = new RegExp(escapedTarget, 'g');
        content = content.replace(targetRegex, replacement.replacement);
    });

    if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Patched: ${fullPath}`);
    }
}

// 1. Fix Yoga.podspec (Surgical Fix for Werror and syntax)
const yogaPodspec = findFileRecursive(path.join(process.cwd(), 'node_modules'), 'Yoga.podspec');
if (yogaPodspec) {
    patchFile(yogaPodspec, [
        {
            target: "'-Werror',",
            replacement: "# '-Werror',", // Correct Ruby comment
            check: "# '-Werror',"
        }
    ]);
}

// 2. Fix react-native-date-picker & react-native-screens (Missing UIKit)
const datePickerManager = findFileRecursive(path.join(process.cwd(), 'node_modules'), 'RNDatePickerManager.mm');
if (datePickerManager) {
    patchFile(datePickerManager, [
        {
            target: '#import "RNDatePickerManager.h"',
            replacement: '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"',
            check: '#import <UIKit/UIKit.h>'
        }
    ]);
}

const screenTraits = findFileRecursive(path.join(process.cwd(), 'node_modules'), 'RNSScreenWindowTraits.mm');
if (screenTraits) {
    patchFile(screenTraits, [
        {
            target: '@implementation RNSScreenWindowTraits',
            replacement: '#import <UIKit/UIKit.h>\n\n@implementation RNSScreenWindowTraits',
            check: '#import <UIKit/UIKit.h>'
        }
    ]);
}

// 3. Absolute Nuclear Source-level Suppression for Yoga
const yogaDir = path.join(process.cwd(), 'node_modules/react-native/ReactCommon/yoga/yoga');
if (fs.existsSync(yogaDir)) {
    const yogaFiles = fs.readdirSync(yogaDir).filter(f => f.endsWith('.cpp') || f.endsWith('.h'));
    yogaFiles.forEach(file => {
        const fullPath = path.join(yogaDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        if (!content.includes('pragma clang diagnostic ignored "-Weverything"')) {
            content = '#pragma clang diagnostic push\n#pragma clang diagnostic ignored "-Weverything"\n' + content + '\n#pragma clang diagnostic pop';
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`☢️  Nuclear Pragma applied to Yoga source: ${file}`);
        }
    });
}

console.log('✨ Build stabilization patches finalized.');
