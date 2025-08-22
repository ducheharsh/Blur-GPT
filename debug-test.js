// Debug script for ChatGPT Blur Extension
// Copy and paste this into the browser console on the ChatGPT page

console.log('=== ChatGPT Blur Debug Test ===');

// Test all selectors
const selectors = [
  'aside a.__menu-item .truncate span',
  'aside a[class*="menu-item"] .truncate span', 
  'aside a .truncate span',
  'aside .group .truncate span',
  'aside a[href*="/c/"] .truncate span'
];

console.log('Testing selectors...');
selectors.forEach((selector, index) => {
  const spans = document.querySelectorAll(selector);
  console.log(`Selector ${index + 1} (${selector}): Found ${spans.length} spans`);
  spans.forEach((span, i) => {
    console.log(`  - Span ${i + 1}: "${span.textContent}"`);
  });
});

// Test fallback approach
console.log('\nTesting fallback approach...');
const allSpans = document.querySelectorAll('span');
let fallbackMatches = [];
allSpans.forEach(span => {
  const text = span.textContent?.trim();
  const parent = span.closest('aside');
  if (text && text.length > 3 && parent && span.closest('a[href*="/c/"]')) {
    fallbackMatches.push(span);
  }
});

console.log(`Fallback found ${fallbackMatches.length} potential chat name spans:`);
fallbackMatches.forEach((span, i) => {
  console.log(`  - Fallback ${i + 1}: "${span.textContent}"`);
});

// Check page structure
console.log('\nPage structure analysis:');
const asides = document.querySelectorAll('aside');
console.log(`Found ${asides.length} aside elements`);

const chatLinks = document.querySelectorAll('a[href*="/c/"]');
console.log(`Found ${chatLinks.length} chat links`);

chatLinks.forEach((link, i) => {
  console.log(`  Chat link ${i + 1}:`, link.outerHTML.substring(0, 200) + '...');
});

// Test CSS injection
console.log('\nTesting CSS injection...');
const testStyle = document.createElement('style');
testStyle.setAttribute('data-blur-test', 'true');
testStyle.textContent = `
  .test-blur {
    filter: blur(5px) !important;
    background-color: red !important;
  }
`;
document.head.appendChild(testStyle);

// Apply test class to first found element
if (fallbackMatches.length > 0) {
  const testSpan = fallbackMatches[0];
  testSpan.classList.add('test-blur');
  console.log('Applied test blur to first span - you should see it blurred and red');
  
  setTimeout(() => {
    testSpan.classList.remove('test-blur');
    testStyle.remove();
    console.log('Removed test blur');
  }, 3000);
}

console.log('=== Debug test complete ===');
