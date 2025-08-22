import { useState, useEffect } from 'react';
import type { UserPreferences } from '../types';

const DEFAULT_PREFERENCES: UserPreferences = {
    blurChatNames: false,
    hideChatContent: false,
    contentHoverVisible: true,
    autoApply: false,
    theme: 'system'
};

export function usePreferences() {
    const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

    // Load preferences from Chrome storage
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const result = await chrome.storage.sync.get(['blur-gpt-preferences']);
                if (result['blur-gpt-preferences']) {
                    console.log('Loaded preferences from storage:', result['blur-gpt-preferences']);
                    setPreferences(result['blur-gpt-preferences']);
                } else {
                    console.log('No preferences found in storage, using defaults');
                    // Initialize with default preferences in storage
                    await chrome.storage.sync.set({ 'blur-gpt-preferences': DEFAULT_PREFERENCES });
                    setPreferences(DEFAULT_PREFERENCES);
                }
            } catch (error) {
                console.error('Error loading preferences:', error);
            }
        };

        loadPreferences();

        // Listen for storage changes to keep UI in sync
        const handleStorageChange = (changes: any, namespace: string) => {
            if (namespace === 'sync' && changes['blur-gpt-preferences']) {
                const newPrefs = changes['blur-gpt-preferences'].newValue;
                if (newPrefs) {
                    console.log('Storage changed, updating UI:', newPrefs);
                    setPreferences(newPrefs);
                }
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        // Cleanup listener on unmount
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    // Save preferences to Chrome storage
    const savePreferences = async (newPrefs: UserPreferences) => {
        try {
            console.log('Saving preferences to storage:', newPrefs);
            await chrome.storage.sync.set({ 'blur-gpt-preferences': newPrefs });
            setPreferences(newPrefs);
            console.log('Preferences saved successfully');
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return {
        preferences,
        savePreferences,
        setPreferences
    };
}
