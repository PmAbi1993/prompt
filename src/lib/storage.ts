export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEYS = {
  THEME: 'prompt-builder-theme',
  FORM_DRAFT: 'prompt-builder-draft',
} as const;

// Theme management
export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return 'system';
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

export function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme;
}

// Form draft management
export function saveFormDraft(promptId: string, values: Record<string, any>): void {
  try {
    const drafts = getFormDrafts();
    drafts[promptId] = {
      values,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(drafts));
  } catch (error) {
    console.warn('Failed to save form draft:', error);
  }
}

export function getFormDraft(promptId: string): Record<string, any> | null {
  try {
    const drafts = getFormDrafts();
    const draft = drafts[promptId];
    
    // Return draft if it's less than 24 hours old
    if (draft && Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
      return draft.values;
    }
    
    // Clean up old draft
    if (draft) {
      delete drafts[promptId];
      localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(drafts));
    }
  } catch (error) {
    console.warn('Failed to read form draft:', error);
  }
  return null;
}

export function clearFormDraft(promptId: string): void {
  try {
    const drafts = getFormDrafts();
    delete drafts[promptId];
    localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(drafts));
  } catch (error) {
    console.warn('Failed to clear form draft:', error);
  }
}

function getFormDrafts(): Record<string, { values: Record<string, any>; timestamp: number }> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FORM_DRAFT);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to parse form drafts:', error);
    return {};
  }
}
