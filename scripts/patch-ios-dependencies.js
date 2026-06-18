const fs = require('fs');
const path = require('path');

/**
 * patch-ios-dependencies.js
 *
 * Senior Engineering Infrastructure Patch for React Native 0.72.x
 * Resolves C++20/C++26 standards compliance issues for modern Clang (Xcode 15/16/17+).
 * This "New Approach" covers headers, ambiguous returns, and structural initializers
 * across Yoga.cpp, YGNode.cpp, YGValue.h, and CompactValue.h.
 */

console.log('🚀 Starting Advanced Infrastructure Patch: Yoga C++ Standards Compliance...');

const rootDir = process.cwd();

function patchFile(relativePath, patches) {
  const absolutePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️  File not found (skipping): ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');
  let originalContent = content;
  const fileName = path.basename(absolutePath);

  console.log(`🔍 Analyzing ${fileName}...`);

  patches.forEach(p => {
    if (typeof p.target === 'string') {
        if (content.includes(p.target)) {
            content = content.split(p.target).join(p.replacement);
            console.log(`  ✅ Applied: ${p.description}`);
        }
    } else if (p.target instanceof RegExp) {
        if (p.target.test(content)) {
            content = content.replace(p.target, p.replacement);
            console.log(`  ✅ Applied: ${p.description}`);
        }
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ File patched successfully: ${relativePath}`);
  } else {
    console.log(`ℹ️  No changes needed (already compliant): ${relativePath}`);
  }
}

// 1. Patch Yoga.cpp
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp', [
  {
    description: 'Inject missing headers (<algorithm>, <functional>, <stdexcept>)',
    target: '#include "Yoga.h"',
    replacement: '#include "Yoga.h"\n#include <algorithm>\n#include <functional>\n#include <stdexcept>'
  },
  {
    description: 'Fix ambiguous structural returns (YGEdges)',
    target: /return\s*\{([^}]*,[^}]*,[^}]*,[^}]*)\};/g,
    replacement: (match, inner) => {
        if (inner.includes('YGEdges')) return match;
        return `return YGEdges{${inner.trim()}};`;
    }
  },
  {
    description: 'Fix void return paths (setContext)',
    target: 'return node->setContext(context);',
    replacement: 'node->setContext(context);'
  },
  {
    description: 'Fix void return paths (setNodeType)',
    target: 'return node->setNodeType(nodeType);',
    replacement: 'node->setNodeType(nodeType);'
  },
  {
    description: 'Fix void return paths (markDirtyAndPropogateDownwards)',
    target: 'return node->markDirtyAndPropogateDownwards();',
    replacement: 'node->markDirtyAndPropogateDownwards();'
  },
  {
    description: 'Fix detail namespace ambiguity',
    target: 'using detail::Log;',
    replacement: 'using facebook::yoga::detail::Log;'
  }
]);

// 2. Patch YGNode.cpp
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/YGNode.cpp', [
  {
    description: 'Inject missing header (<algorithm>)',
    target: '#include <yoga/Yoga.h>',
    replacement: '#include <yoga/Yoga.h>\n#include <algorithm>'
  }
]);

// 2b. Patch YGNodeStyle.cpp
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/YGNodeStyle.cpp', [
  {
    description: 'Inject missing header (<algorithm>)',
    target: '#include <yoga/Yoga.h>',
    replacement: '#include <yoga/Yoga.h>\n#include <algorithm>'
  }
]);

// 3. Patch YGValue.h
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/YGValue.h', [
  {
    description: 'Fix operator- return ambiguity',
    target: 'return {-value.value, value.unit};',
    replacement: 'return YGValue{-value.value, value.unit};'
  }
]);

// 4. Patch CompactValue.h
patchFile('node_modules/react-native/ReactCommon/yoga/yoga/CompactValue.h', [
  {
    description: 'Fix brace-enclosed initializer ambiguity (zero)',
    target: 'return {zero};',
    replacement: 'return CompactValue{zero};'
  },
  {
    description: 'Fix brace-enclosed initializer ambiguity (data)',
    target: 'return {data};',
    replacement: 'return CompactValue{data};'
  }
]);

console.log('✨ Infrastructure modernization complete.');
