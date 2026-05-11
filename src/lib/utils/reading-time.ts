export function calculateReadingTime(content: string): string {
  const WPM = 225; // Average adult reading speed

  // 1. Strip HTML tags and Markdown syntax (simplified)
  const plainText = content
    .replace(/[#*`~_\[\]()]/g, "") // Remove common MD symbols
    .replace(/<[^>]*>/g, ""); // Remove HTML tags

  // 2. Count words
  const words = plainText.trim().split(/\s+/).length;

  // 3. Calculate minutes
  const minutes = Math.ceil(words / WPM);

  return `${minutes} min read`;
}
