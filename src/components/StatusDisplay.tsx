import { cn } from '../lib/utils';
import type { UserPreferences } from '../types';

interface StatusDisplayProps {
    preferences: UserPreferences;
    currentTheme: 'light' | 'dark';
}

export function StatusDisplay({ preferences, currentTheme }: StatusDisplayProps) {
    const activeEffects = [
        preferences.blurChatNames ? 'Blur Names' : '',
        preferences.hideChatContent ? 'Hide Content' : ''
    ].filter(Boolean);

    return (
        <div className="mt-4 text-center">
            <p className={cn(
                "text-xs",
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
                {activeEffects.length > 0
                    ? `Active: ${activeEffects.join(' + ')}`
                    : "No effects active"
                }
            </p>
            <p className={cn(
                "text-xs mt-1",
                currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            )}>
                Auto-apply: {preferences.autoApply ? '✅ Enabled' : '❌ Disabled'}
            </p>
        </div>
    );
}
