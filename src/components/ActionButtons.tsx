import { cn } from '../lib/utils';

interface ActionButtonsProps {
    onApply: () => void;
    onClear: () => void;
    isLoading: boolean;
    isAnyEffectActive: boolean;
    currentTheme: 'light' | 'dark';
}

export function ActionButtons({
    onApply,
    onClear,
    isLoading,
    isAnyEffectActive,
    currentTheme
}: ActionButtonsProps) {
    return (
        <div className="space-y-3">
            <button
                onClick={onApply}
                disabled={isLoading || !isAnyEffectActive}
                className={cn(
                    "w-full px-4 py-2 text-white rounded-lg disabled:cursor-not-allowed transition-colors",
                    currentTheme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600'
                        : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300'
                )}
            >
                {isLoading ? "Applying..." : "Apply Settings"}
            </button>

            <button
                onClick={onClear}
                disabled={isLoading || !isAnyEffectActive}
                className={cn(
                    "w-full px-4 py-2 text-white rounded-lg disabled:cursor-not-allowed transition-colors",
                    currentTheme === 'dark'
                        ? 'bg-red-600 hover:bg-red-700 disabled:bg-gray-600'
                        : 'bg-red-500 hover:bg-red-600 disabled:bg-gray-300'
                )}
            >
                {isLoading ? "Clearing..." : "Clear All Effects & Reset Toggles"}
            </button>
        </div>
    );
}
