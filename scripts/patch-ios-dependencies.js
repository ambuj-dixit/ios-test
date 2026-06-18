const fs = require('fs');
const path = require('path');

console.log('🚀 Final Nuclear Patching sequence starting...');

// Deep search for files because path structures vary on CI
function findAndPatch(fileName, targetStr, replacementStr) {
    const root = process.cwd();
    const search = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file !== 'ios' && file !== 'android' && file !== '.git') search(fullPath);
            } else if (file === fileName) {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes(targetStr)) {
                    fs.writeFileSync(fullPath, content.replace(new RegExp(targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacementStr));
                    console.log(`✅ Patched: ${fullPath}`);
                }
            }
        }
    };
    search(root);
}

// 1. Force Yoga to ignore ALL warnings at the source level
const yogaFiles = ['Yoga.cpp', 'YGNode.cpp', 'YGStyle.cpp', 'YGEnums.cpp', 'YGConfig.cpp', 'Utils.cpp'];
const pragmaStart = '#pragma clang diagnostic push\n#pragma clang diagnostic ignored "-Weverything"\n';
const pragmaEnd = '\n#pragma clang diagnostic pop';

yogaFiles.forEach(file => {
    findAndPatch(file, '#include', pragmaStart + '#include');
    // Ensure the end is appended
    const root = process.cwd();
    const searchAndAppend = (dir) => {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const p = path.join(dir, f);
            if (fs.statSync(p).isDirectory()) {
                if (f !== 'ios' && f !== 'android' && f !== '.git') searchAndAppend(p);
            } else if (f === file) {
                let content = fs.readFileSync(p, 'utf8');
                if (!content.includes('pragma clang diagnostic pop')) {
                    fs.writeFileSync(p, content + pragmaEnd);
                }
            }
        }
    };
    searchAndAppend(root);
});

// 2. Fix other known library issues
findAndPatch('RNDatePickerManager.mm', '#import "RNDatePickerManager.h"', '#import <UIKit/UIKit.h>\n#import "RNDatePickerManager.h"');
findAndPatch('RNSScreenWindowTraits.mm', '@implementation RNSScreenWindowTraits', '#import <UIKit/UIKit.h>\n@implementation RNSScreenWindowTraits');

console.log('✨ Absolute final patches applied.');
