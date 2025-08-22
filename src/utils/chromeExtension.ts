/**
 * Apply blur effects to ChatGPT content
 */
export async function applyEffects(
    blurNames: boolean,
    hideChatContent: boolean,
    contentHoverVisible: boolean
) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (blurNames: boolean, hideChatContent: boolean, contentHoverVisible: boolean) => {
            // Add CSS styles for blur effect
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
            const applyEffectsToSpan = (span: Element) => {
                const spanElement = span as HTMLElement;

                // Remove existing classes first
                spanElement.classList.remove('blur-gpt-blurred');

                if (blurNames) {
                    spanElement.classList.add('blur-gpt-blurred');
                    console.log('Applied blur to span:', spanElement.textContent);
                }
            };

            const applyEffectsToChatContent = (contentElement: Element) => {
                const element = contentElement as HTMLElement;

                // Remove existing classes first
                element.classList.remove('blur-gpt-content-hidden', 'blur-gpt-hover-visible');

                if (hideChatContent) {
                    element.classList.add('blur-gpt-content-hidden');
                    if (contentHoverVisible) {
                        element.classList.add('blur-gpt-hover-visible');
                    }
                    console.log('Applied blur to chat content:', element);
                }
            };

            // Try multiple selectors to find chat names
            const selectors = [
                'aside a.__menu-item .truncate span',
                'aside a[class*="menu-item"] .truncate span',
                'aside a .truncate span',
                'aside .group .truncate span',
                'aside a[href*="/c/"] .truncate span'
            ];

            let totalFound = 0;

            // Apply effects to chat names (spans)
            if (blurNames) {
                selectors.forEach((selector, index) => {
                    const spans = document.querySelectorAll(selector);
                    console.log(`Selector ${index + 1} (${selector}): Found ${spans.length} spans`);
                    spans.forEach(applyEffectsToSpan);
                    totalFound += spans.length;
                });
            }

            // Apply effects to chat content
            if (hideChatContent) {
                const contentSelectors = [
                    'article[data-testid*="conversation-turn"]',
                    'article[data-turn]',
                    '.markdown.prose',
                    '[data-message-author-role]'
                ];

                contentSelectors.forEach((selector, index) => {
                    const contentElements = document.querySelectorAll(selector);
                    console.log(`Content selector ${index + 1} (${selector}): Found ${contentElements.length} elements`);
                    contentElements.forEach(applyEffectsToChatContent);
                });
            }

            console.log('Total spans processed:', totalFound);

            // Fallback: If no spans found, try a broader approach
            if (blurNames && totalFound === 0) {
                console.log('No spans found with standard selectors, trying fallback approach...');
                const allSpans = document.querySelectorAll('span');
                let fallbackCount = 0;
                allSpans.forEach(span => {
                    const text = span.textContent?.trim();
                    const parent = span.closest('aside');
                    if (text && text.length > 3 && parent && span.closest('a[href*="/c/"]')) {
                        applyEffectsToSpan(span);
                        fallbackCount++;
                    }
                });
                console.log('Fallback approach found:', fallbackCount, 'spans');
            }

            // Also target any dynamically loaded content
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node as Element;

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
            (window as any).chatBlurObserver = observer;
        },
        args: [blurNames, hideChatContent, contentHoverVisible]
    });
}

/**
 * Clear all blur effects from the page
 */
export async function clearEffects() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // Remove all blur-gpt classes
            const allElements = document.querySelectorAll('.blur-gpt-blurred, .blur-gpt-chat-hidden, .blur-gpt-content-hidden');
            allElements.forEach(element => {
                element.classList.remove('blur-gpt-blurred', 'blur-gpt-chat-hidden', 'blur-gpt-content-hidden');
            });

            // Remove the injected CSS
            const injectedStyle = document.querySelector('style[data-blur-gpt]');
            if (injectedStyle) {
                injectedStyle.remove();
            }

            // Disconnect observer if it exists
            if ((window as any).chatBlurObserver) {
                (window as any).chatBlurObserver.disconnect();
                delete (window as any).chatBlurObserver;
            }

            console.log('All blur-gpt effects cleared');
        }
    });
}
