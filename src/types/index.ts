export interface UserPreferences {
    blurChatNames: boolean;
    hideChatContent: boolean;
    contentHoverVisible: boolean;
    autoApply: boolean;
    theme: 'light' | 'dark' | 'system';
}

export type ThemeMode = 'light' | 'dark' | 'system';
