export function formatDate(date: string): string {
    if (!date) return '';

    return new Date(date).toISOString().split('T')[0];
}