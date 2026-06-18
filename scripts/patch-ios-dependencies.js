const fs = require('fs');
const path = require('path');

/**
 * patch-ios-dependencies.js
 *
 * World-Class Infrastructure Patch for React Native 0.72.x
 * Resolves C++ standards compliance issues for modern Clang (Xcode 15/16/17+).
 *
 * This script surgically updates the Yoga layout engine to handle strict C++20/C++26
 * rules regarding missing standard headers and implicit structural initializers.
 */

console.log('🚀 Starting Infrastructure Patch: Yoga C++ Standards Compliance...');

/**
 * Surgically patches a file with a set of replacements.
 * @param {string} relativePath - Path relative to project root.
 * @param {Array<{target: string, replacement: string, check?: string}>} patches
 */
function applySurgicalPatch(relativePath, patches) {
  const absolutePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️  File not found (skipping): ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');
  let originalContent = content;
  let appliedCount = 0;

  patches.forEach(({ target, replacement, check }) => {
    // Check if the patch (or the check string) already exists in the file
    const validationStr = check || replacement;
    if (content.includes(validationStr)) {
      return;
    }

    if (content.includes(target)) {
      // Use global replacement if needed, though for headers we usually want the first hit
      content = content.split(target).join(replacement);
      appliedCount++;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ Patched [${appliedCount} changes]: ${relativePath}`);
  } else {
    console.log(`ℹ️  Already compliant: ${relativePath}`);
  }
}

// --- 1. Patch Yoga.cpp ---
// Targets: Missing <algorithm>/<functional> and implicit YGEdges initialization
applySurgicalPatch('node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp', [
  {
    // Inject modern C++ template utilities
    target: '#include "Yoga.h"',
    replacement: '#include "Yoga.h"\n#include <algorithm>\n#include <functional>',
    check: '#include <algorithm>'
  },
  {
    // Fix implicit structural return for YGEdges
    // Modern Clang requires explicit typing for brace-enclosed initializer lists in this context
    target: 'return {left, top, right, bottom};',
    replacement: 'return YGEdges{left, top, right, bottom};'
  }
]);

// --- 2. Patch YGNode.cpp ---
// Target: Missing <algorithm> for math/comparison operations
applySurgicalPatch('node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp', [
  {
    target: '#include "YGNode.h"',
    replacement: '#include "YGNode.h"\n#include <algorithm>',
    check: '#include <algorithm>'
  }
]);

console.log('✨ Infrastructure patching complete. Ready for high-performance compilation.');
