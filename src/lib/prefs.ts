/**
 * Tiny wrapper around localStorage for *viewer conveniences only*
 * (theme, language). Game plans are never stored here: by design they
 * persist only through JSON export/import.
 */
const PREFIX = 'ti-companion:'

export const prefs = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(PREFIX + key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(PREFIX + key, value)
    } catch {
      /* private mode etc. — ignore */
    }
  },
}
