
export const formatTags = (tags: string[]): string[] => {
    return Array.from(new Set(
        tags.map(tag => {
            const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;

            if (cleanTag.charAt(0) === cleanTag.charAt(0).toUpperCase()) {
                return `#${cleanTag}`; // Already formatted correctly
            }
            
            return `#${cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1)}`;
        })
    ));
};