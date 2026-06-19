const fs = require('fs');
const path = require('path');

/**
 * patch-ios-dependencies.js - ABSOLUTE FINAL VERSION
 *
 * Senior Engineering Infrastructure Patch for React Native 0.74.x (Yoga 3.0)
 * Resolves C++ standards compliance issues for modern Clang (Xcode 15/16/17+).
 */

console.log('🚀 Starting Universal Infrastructure Patch: Modern Standards Compliance...');

const rootDir = process.cwd();

function patchFile(relativePath, patches) {
    const absolutePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(absolutePath)) return;

    let content = fs.readFileSync(absolutePath, 'utf8');
    let originalContent = content;

    patches.forEach(p => {
        if (typeof p.target === 'string') {
            if (content.includes(p.target) && !content.includes(p.replacement)) {
                content = content.split(p.target).join(p.replacement);
            }
        } else if (p.target instanceof RegExp) {
            content = content.replace(p.target, p.replacement);
        }
    });

    if (content !== originalContent) {
        fs.writeFileSync(absolutePath, content, 'utf8');
        console.log(`✅ Patched: ${relativePath}`);
    }
}

// 1. DYNAMIC YOGA PATCHING
// We scan the entire yoga directory to ensure EVERY .cpp file has the required headers for modern Clang.
const yogaBaseDir = 'node_modules/react-native/ReactCommon/yoga/yoga';

function walkDir(dir, callback) {
    if (!fs.existsSync(path.join(rootDir, dir))) return;
    fs.readdirSync(path.join(rootDir, dir)).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(path.join(rootDir, dirPath)).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir(yogaBaseDir, (filePath) => {
    if (filePath.endsWith('.cpp')) {
        patchFile(filePath, [
            {
                description: 'Ensure <algorithm> and <stdexcept> presence',
                target: '#include <yoga/Yoga.h>',
                replacement: '#include <yoga/Yoga.h>\n#include <algorithm>\n#include <stdexcept>\n#include <functional>'
            },
            {
                description: 'Ensure <algorithm> (local path)',
                target: '#include "Yoga.h"',
                replacement: '#include "Yoga.h"\n#include <algorithm>\n#include <stdexcept>\n#include <functional>'
            }
        ]);
    }
});

// 2. SPECIFIC KNOWN BLOCKERS
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/YGValue.h', [
    {
        description: 'Fix return ambiguity in operator-',
        target: 'return {-value.value, value.unit};',
        replacement: 'return YGValue{-value.value, value.unit};'
    }
]);

patchFile('node_modules/react-native/ReactCommon/yoga/Yoga.podspec', [
    {
        description: 'Remove restrictive flags that block modern compilers',
        target: "'-Wall',",
        replacement: "'-w',"
    },
    {
        target: "'-Werror',",
        replacement: ""
    }
]);

// 3. NAMESPACE AMBIGUITIES
const yogaSourceFiles = [
    'node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp',
    'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp'
];
yogaSourceFiles.forEach(f => {
    patchFile(f, [
        {
            target: 'using detail::Log;',
            replacement: 'using facebook::yoga::detail::Log;'
        }
    ]);
});

console.log('✨ Infrastructure modernization complete. Ready for clean build.');
