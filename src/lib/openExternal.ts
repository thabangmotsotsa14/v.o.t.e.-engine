import { toast } from "sonner";

/**
 * Open a URL in a new tab, with a clipboard-copy fallback for environments
 * (like the Lovable preview iframe) where some domains are blocked by the
 * browser's response-policy / sandboxing.
 *
 * - Always attempts window.open(url, "_blank")
 * - Always copies the URL to the clipboard (when permitted)
 * - Shows a toast confirming the URL was copied so the user can paste it
 *   into a normal browser tab if the new tab was blocked.
 */
export async function openExternal(url: string, label?: string) {
  // Try opening in a new tab first.
  let opened: Window | null = null;
  try {
    opened = window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    opened = null;
  }

  // Always copy to clipboard as a fallback.
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      copied = true;
    }
  } catch {
    copied = false;
  }

  const name = label ?? "link";
  if (opened) {
    toast.success(`Opening ${name} in a new tab`, {
      description: copied ? "Link also copied to clipboard." : url,
    });
  } else if (copied) {
    toast.message(`${name} link copied`, {
      description: "New tab was blocked. Paste the link into your browser.",
    });
  } else {
    toast.error(`Could not open ${name}`, { description: url });
  }
}