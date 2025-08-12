export interface ClipboardResult {
  ok: boolean;
  error?: string;
}

export async function copyToClipboard(text: string): Promise<ClipboardResult> {
  try {
    await navigator.clipboard.writeText(text);
    return { ok: true };
  } catch (error) {
    // Fallback: create a hidden textarea, select, execCommand('copy')
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, 99999); // For mobile devices
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return { ok, error: ok ? undefined : 'Copy command failed' };
    } catch (fallbackError) {
      return { 
        ok: false, 
        error: 'Clipboard not available. Please manually copy the text.' 
      };
    }
  }
}

export function selectText(element: HTMLElement): void {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);
}
