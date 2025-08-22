import { ToggleSwitch } from './ToggleSwitch';
import { cn } from '../lib/utils';

interface SubOptionProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    currentTheme: 'light' | 'dark';
}

export function SubOption({
    label,
    description,
    checked,
    onChange,
    disabled = false,
    currentTheme
}: SubOptionProps) {
    return (
        <div className={cn(
            "flex items-center justify-between ml-4 pl-4 border-l-2 transition-all duration-200 ease-in-out",
            currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        )}>
            <div>
                <label className={cn(
                    "text-sm font-medium",
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>{label}</label>
                <p className={cn(
                    "text-xs",
                    currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                )}>{description}</p>
            </div>
            <ToggleSwitch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                currentTheme={currentTheme}
            />
        </div>
    );
}
