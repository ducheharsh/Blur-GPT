import type { ThemeMode } from '../types';
import { cn } from '../lib/utils';

interface HeaderProps {
    currentTheme: 'light' | 'dark';
    selectedTheme: ThemeMode;
    onThemeChange: (theme: ThemeMode) => void;
}

export function Header({ currentTheme, selectedTheme, onThemeChange }: HeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <img
                    src="/icon.png"
                    alt="Blur GPT Logo"
                    className="w-8 h-8 rounded-lg"
                />
                <h1 className="text-2xl font-bold">Blur GPT</h1>
            </div>

            {/* Theme Toggle */}
            <div className={cn(
                "flex items-center space-x-1 rounded-lg p-1",
                currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            )}>
                {(['light', 'system', 'dark'] as const).map((theme) => (
                    <button
                        key={theme}
                        onClick={() => onThemeChange(theme)}
                        className={cn(
                            "px-2 py-1 text-xs rounded-md transition-colors",
                            selectedTheme === theme
                                ? 'bg-blue-500 text-white'
                                : currentTheme === 'dark'
                                    ? 'text-gray-400 hover:text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                        )}
                    >
                        {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
                    </button>
                ))}
            </div>
        </div>
    );
}
