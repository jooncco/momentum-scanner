export function formatFloat(num: number): string {
    if (num >= 1_000_000) {
        // Format as 1,000M for numbers >= 1,000,000
        return (num / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 }) + 'M';
    } else if (num >= 1_000) {
        // Format as 1K for numbers >= 1,000
        return (num / 1_000).toLocaleString(undefined, { maximumFractionDigits: 0 }) + 'K';
    } else {
        return num.toString();
    }
} 