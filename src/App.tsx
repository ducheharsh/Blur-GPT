import { useState } from "react"
import { cn } from "./lib/utils"
import type { UserPreferences } from "./types"
import { usePreferences } from "./hooks/usePreferences"
import { useTheme } from "./hooks/useTheme"
import { applyEffects, clearEffects as clearEffectsUtil } from "./utils/chromeExtension"
import {
  Header,
  PrivacyOption,
  SubOption,
  ActionButtons,
  StatusDisplay
} from "./components"

function App() {
  const { preferences, savePreferences } = usePreferences();
  const [isLoading, setIsLoading] = useState(false);
  const currentTheme = useTheme(preferences.theme);

  const handleToggle = async (key: keyof UserPreferences, value: boolean | string) => {
    const newPrefs = { ...preferences, [key]: value };
    await savePreferences(newPrefs);

    if (key === 'blurChatNames' || key === 'hideChatContent' || key === 'contentHoverVisible') {
      if (newPrefs.blurChatNames || newPrefs.hideChatContent) {
        await handleApplyEffects(newPrefs.blurChatNames, newPrefs.hideChatContent, newPrefs.contentHoverVisible);
      } else {
        await handleClearEffects();
      }
    }
  };

  const handleApplyEffects = async (blurNames?: boolean, hideChatContent?: boolean, contentHoverVisible?: boolean) => {
    setIsLoading(true);
    try {
      await applyEffects(
        blurNames ?? preferences.blurChatNames,
        hideChatContent ?? preferences.hideChatContent,
        contentHoverVisible ?? preferences.contentHoverVisible
      );
    } catch (error) {
      console.error('Error applying effects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearEffects = async () => {
    setIsLoading(true);
    try {
      // Clear all effect preferences (keep auto-apply, content hover, and theme)
      const clearedPrefs = {
        blurChatNames: false,
        hideChatContent: false,
        contentHoverVisible: preferences.contentHoverVisible,
        autoApply: preferences.autoApply,
        theme: preferences.theme
      };

      await savePreferences(clearedPrefs);
      await clearEffectsUtil();
    } catch (error) {
      console.error('Error clearing effects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAnyEffectActive = preferences.blurChatNames || preferences.hideChatContent;

  return (
    <div className={cn(
      "p-6 w-80 mx-auto min-h-screen transition-colors duration-200",
      currentTheme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-white text-gray-900'
    )}>
      <Header
        currentTheme={currentTheme}
        selectedTheme={preferences.theme}
        onThemeChange={(theme) => handleToggle('theme', theme)}
      />

      {/* Privacy Options */}
      <div className="space-y-4 mb-6">
        <PrivacyOption
          label="Blur Chat Names"
          description="Makes chat names unreadable but visible"
          checked={preferences.blurChatNames}
          onChange={(checked) => handleToggle('blurChatNames', checked)}
          disabled={isLoading}
          currentTheme={currentTheme}
        />

        <PrivacyOption
          label="Hide Chat Content"
          description="Blurs conversation messages and content"
          checked={preferences.hideChatContent}
          onChange={(checked) => handleToggle('hideChatContent', checked)}
          disabled={isLoading}
          currentTheme={currentTheme}
        >
          {/* Content Hover Toggle - only show when Hide Chat Content is enabled */}
          {preferences.hideChatContent && (
            <SubOption
              label="Show on Hover"
              description="Makes content visible when hovering over it"
              checked={preferences.contentHoverVisible}
              onChange={(checked) => handleToggle('contentHoverVisible', checked)}
              disabled={isLoading}
              currentTheme={currentTheme}
            />
          )}
        </PrivacyOption>

        <PrivacyOption
          label="Auto Apply"
          description="Automatically apply settings on new tabs"
          checked={preferences.autoApply}
          onChange={(checked) => handleToggle('autoApply', checked)}
          disabled={isLoading}
          currentTheme={currentTheme}
        />
      </div>

      <ActionButtons
        onApply={() => handleApplyEffects()}
        onClear={handleClearEffects}
        isLoading={isLoading}
        isAnyEffectActive={isAnyEffectActive}
        currentTheme={currentTheme}
      />

      <StatusDisplay
        preferences={preferences}
        currentTheme={currentTheme}
      />
    </div>
  )
}

export default App
