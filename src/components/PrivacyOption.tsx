import { ToggleSwitch } from './ToggleSwitch';
import { cn } from '../lib/utils';

interface PrivacyOptionProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    currentTheme: 'light' | 'dark';
    children?: React.ReactNode;
}

export function PrivacyOption({
    label,
    description,
    checked,
    onChange,
    disabled = false,
    currentTheme,
    children
}: PrivacyOptionProps) {
    return (
        <div className={children ? "space-y-2" : ""}>
            <div className="flex items-center justify-between">
                <div>
                    <label className={cn(
                        "text-sm font-medium",
                        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    )}>{label}</label>
                    <p className={cn(
                        "text-xs",
                        currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    )}>{description}</p>
                </div>
                <ToggleSwitch
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    currentTheme={currentTheme}
                />
            </div>
            {children}
        </div>
    );
}
