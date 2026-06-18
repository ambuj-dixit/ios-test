const fs = require('fs');
const path = require('path');

/**
 * patch-ios-dependencies.js
 *
 * Senior Engineering Infrastructure Patch for React Native 0.74.x (Yoga 3.0)
 * Resolves C++ standards compliance issues for modern Clang (Xcode 15/16/17+).
 */

console.log('🚀 Starting Advanced Infrastructure Patch: Yoga 3.0 C++ Standards Compliance...');

const rootDir = process.cwd();

function patchFile(relativePath, patches) {
  const absolutePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(absolutePath)) {
    // Silently skip if file doesn't exist (useful for cross-version compatibility)
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');
  let originalContent = content;
  const fileName = path.basename(absolutePath);

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
    console.log(`✅ File patched successfully: ${relativePath}`);
  }
}

// 1. Yoga 3.0 Header Injection (Ensure <algorithm> is everywhere needed)
const yogaFiles = [
  'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGNodeStyle.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/YGConfig.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/algorithm/AbsoluteLayout.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/algorithm/CalculateLayout.cpp',
  'node_modules/react-native/ReactCommon/yoga/yoga/node/Node.cpp'
];

yogaFiles.forEach(file => {
  patchFile(file, [
    {
      description: 'Inject missing <algorithm> header',
      target: '#include <yoga/Yoga.h>',
      replacement: '#include <yoga/Yoga.h>\n#include <algorithm>'
    },
    {
        description: 'Inject missing <algorithm> header (local)',
        target: '#include "Yoga.h"',
        replacement: '#include "Yoga.h"\n#include <algorithm>'
    }
  ]);
});

// 2. Legacy/Compatibility Patches (for cases where old file structure might exist)
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp', [
  {
    description: 'Fix missing headers in legacy Yoga.cpp',
    target: '#include "Yoga.h"',
    replacement: '#include "Yoga.h"\n#include <algorithm>\n#include <functional>\n#include <stdexcept>'
  }
]);

// 3. Fix operator- return ambiguity in YGValue.h
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/YGValue.h', [
  {
    target: 'return {-value.value, value.unit};',
    replacement: 'return YGValue{-value.value, value.unit};'
  }
]);

// 4. Fix namespace issues if they appear
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp', [
  {
    target: 'using detail::Log;',
    replacement: 'using facebook::yoga::detail::Log;'
  }
]);

console.log('✨ Infrastructure modernization complete.');
