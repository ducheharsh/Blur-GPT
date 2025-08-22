// Content script for auto-applying blur effects on ChatGPT pages
(function() {
  'use strict';



  // Function to check and apply preferences on page load
  async function checkAndApplyPreferences() {
    try {
      // Check if we're on a ChatGPT page
      const isChatGPTPage = window.location.hostname.includes('chat.openai.com') || 
                           window.location.hostname.includes('chatgpt.com');
      
      if (!isChatGPTPage) {
        console.log('Not on ChatGPT page, skipping auto-apply');
        return;
      }

      console.log('On ChatGPT page, checking preferences...');
      
      // Get stored preferences from Chrome storage
      const result = await chrome.storage.sync.get(['blur-gpt-preferences']);
      if (!result['blur-gpt-preferences']) {
        console.log('No Blur GPT preferences found in Chrome storage');
        return;
      }

      const preferences = result['blur-gpt-preferences'];
      console.log('Found Blur GPT preferences:', preferences);
      
      // Apply if auto-apply is enabled and any effects are configured
      if (preferences.autoApply && (preferences.blurChatNames || preferences.hideChatContent)) {
        console.log('Auto-applying Blur GPT preferences:', preferences);
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
          applyEffects(preferences.blurChatNames, preferences.hideChatContent, preferences.contentHoverVisible);
        }, 100);
      } else {
        console.log('Auto-apply disabled or no effects configured');
      }
    } catch (error) {
      console.error('Error checking preferences:', error);
    }
  }

  // Function to apply effects (same logic as in the popup)
  function applyEffects(blurNames, hideChatContent, contentHoverVisible) {
    // Add CSS styles for effects
    const style = document.createElement('style');
    style.setAttribute('data-blur-gpt', 'true');
    style.textContent = `
      .blur-gpt-blurred {
        filter: blur(5px) !important;
        transition: filter 0.3s ease !important;
        color: inherit !important;
      }
      .blur-gpt-blurred:hover {
        filter: none !important;
        color: inherit !important;
      }
      .blur-gpt-content-hidden {
        filter: blur(10px) !important;
        transition: filter 0.3s ease !important;
      }
      .blur-gpt-content-hidden:not(.blur-gpt-hover-visible) {
        pointer-events: none !important;
      }
      .blur-gpt-content-hidden.blur-gpt-hover-visible:hover {
        filter: none !important;
      }
    `;
    document.head.appendChild(style);

    // Function to apply effects to elements
    const applyEffectsToSpan = (span) => {
      const spanElement = span;
      
      // Remove existing classes first
      spanElement.classList.remove('blur-gpt-blurred');
      
      if (blurNames) {
        spanElement.classList.add('blur-gpt-blurred');
      }
    };



    const applyEffectsToChatContent = (contentElement) => {
      const element = contentElement;
      
      // Remove existing classes first
      element.classList.remove('blur-gpt-content-hidden', 'blur-gpt-hover-visible');
      
      if (hideChatContent) {
        element.classList.add('blur-gpt-content-hidden');
        if (contentHoverVisible) {
          element.classList.add('blur-gpt-hover-visible');
        }
      }
    };

    // Selectors for chat names
    const selectors = [
      'aside a.__menu-item .truncate span',
      'aside a[class*="menu-item"] .truncate span',
      'aside a .truncate span',
      'aside .group .truncate span',
      'aside a[href*="/c/"] .truncate span'
    ];

    // Apply effects to chat names (spans)
    if (blurNames) {
      console.log('Applying blur to chat names...');
      selectors.forEach(selector => {
        const spans = document.querySelectorAll(selector);
        console.log(`Found ${spans.length} spans with selector: ${selector}`);
        spans.forEach(applyEffectsToSpan);
      });
    }



    // Apply effects to chat content
    if (hideChatContent) {
      console.log('Applying blur to chat content...');
      const contentSelectors = [
        'article[data-testid*="conversation-turn"]',
        'article[data-turn]',
        '.markdown.prose',
        '[data-message-author-role]'
      ];
      
      contentSelectors.forEach(selector => {
        const contentElements = document.querySelectorAll(selector);
        console.log(`Found ${contentElements.length} content elements with selector: ${selector}`);
        contentElements.forEach(applyEffectsToChatContent);
      });
    }

    // Mutation observer for dynamically loaded content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            
            // Apply to spans if blurring names
            if (blurNames) {
              selectors.forEach(selector => {
                const spans = element.querySelectorAll(selector);
                spans.forEach(applyEffectsToSpan);
              });
            }
            

            
            // Apply to chat content if hiding content
            if (hideChatContent) {
              const contentSelectors = [
                'article[data-testid*="conversation-turn"]',
                'article[data-turn]',
                '.markdown.prose',
                '[data-message-author-role]'
              ];
              contentSelectors.forEach(selector => {
                const contentElements = element.querySelectorAll(selector);
                contentElements.forEach(applyEffectsToChatContent);
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Store observer reference for cleanup
    window.chatBlurObserver = observer;
  }

  // Check and apply preferences with better timing
  console.log('Blur GPT content script loaded, checking preferences...');
  
  // Check immediately
  checkAndApplyPreferences();

  // Check when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded, checking preferences...');
      checkAndApplyPreferences();
    });
  }

  // Check when page is fully loaded
  window.addEventListener('load', () => {
    console.log('Page fully loaded, checking preferences...');
    setTimeout(checkAndApplyPreferences, 1000);
  });

  // Also check after a longer delay to catch late-loading content
  setTimeout(() => {
    console.log('Delayed check for preferences...');
    checkAndApplyPreferences();
  }, 2000);

  // Listen for navigation events (for SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(checkAndApplyPreferences, 1000);
    }
  }).observe(document, { subtree: true, childList: true });

  // Also listen for Chrome storage changes (in case preferences are updated from popup)
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes['blur-gpt-preferences']) {
      console.log('Storage changed, reapplying preferences...');
      setTimeout(checkAndApplyPreferences, 100);
    }
  });

})();
