const fs = require('fs');
const path = require('path');

/**
 * patch-ios-dependencies.js
 *
 * Senior Engineering Infrastructure Patch for React Native 0.72.x
 * Resolves C++20/C++26 standards compliance issues for modern Clang (Xcode 15/16/17+).
 */

console.log('🚀 Starting Advanced Infrastructure Patch: Yoga C++ Standards Compliance...');

function patchYogaFile(relativePath) {
  const absolutePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️  File not found (skipping): ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');
  let originalContent = content;
  const fileName = path.basename(absolutePath);

  console.log(`🔍 Analyzing ${fileName}...`);

  // 1. Inject missing headers
  if (fileName === 'Yoga.cpp') {
    if (!content.includes('<algorithm>')) {
      content = content.replace('#include "Yoga.h"', '#include "Yoga.h"\n#include <algorithm>\n#include <functional>');
      console.log('  ✅ Injected <algorithm> and <functional>');
    }
  } else if (fileName === 'YGNode.cpp') {
    if (!content.includes('<algorithm>')) {
      content = content.replace('#include "YGNode.h"', '#include "YGNode.h"\n#include <algorithm>');
      console.log('  ✅ Injected <algorithm>');
    }
  }

  // 2. Fix ambiguous brace-enclosed initializer list returns (C++20 strictness)
  // This looks for 'return { ... };' patterns where there are 3 commas (4 elements),
  // which matches the YGEdges struct initialization.
  if (fileName === 'Yoga.cpp') {
    const returnRegex = /return\s*\{([^}]*)\};/g;
    let matchCount = 0;

    content = content.replace(returnRegex, (match, inner) => {
      // Skip if already patched or contains a type cast
      if (inner.includes('YGEdges') || inner.includes('YGValue')) return match;

      const commaCount = (inner.match(/,/g) || []).length;
      if (commaCount === 3) {
        matchCount++;
        // Remove extra whitespace and newlines for a clean replacement
        const sanitizedInner = inner.trim();
        return `return YGEdges{${sanitizedInner}};`;
      }
      return match;
    });

    if (matchCount > 0) {
      console.log(`  ✅ Fixed ${matchCount} ambiguous structural returns (YGEdges)`);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ File patched successfully: ${relativePath}`);
  } else {
    console.log(`ℹ️  No changes needed (already compliant): ${relativePath}`);
  }
}

// Target standard Yoga paths in React Native 0.72.x
const yogaPath = 'node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp';
const ygNodePath = 'node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp';

patchYogaFile(yogaPath);
patchYogaFile(ygNodePath);

console.log('✨ Infrastructure modernization complete.');
