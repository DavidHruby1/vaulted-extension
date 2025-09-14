
export const capitalizeTitle = (title: string): string => {
    if (!title) return title;

    if (/^\d/.test(title)) return title;
    
    return title.charAt(0).toUpperCase() + title.slice(1);
}