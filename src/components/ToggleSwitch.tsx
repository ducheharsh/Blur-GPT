import { cn } from '../lib/utils';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    currentTheme: 'light' | 'dark';
}

export function ToggleSwitch({ checked, onChange, disabled = false, currentTheme }: ToggleSwitchProps) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only peer"
            />
            <div className={cn(
                "w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                currentTheme === 'dark'
                    ? 'bg-gray-700 peer-focus:ring-blue-800 after:border-gray-600 peer-checked:bg-blue-600'
                    : 'bg-gray-200 peer-focus:ring-blue-300 after:border-gray-300 peer-checked:bg-blue-600'
            )} />
        </label>
    );
}
