
export interface Prompt {
    id: string,
    title: string,
    tags: string[],
    text: string,
    createdAt: number, // I will use Date.now() to convert date to a num for easier sorting and storing
    tokenCount?: number; // For now its optional
}