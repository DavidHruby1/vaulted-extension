import type { Prompt } from '@/shared/types';

export const getNextTitleNumber = (prompts: Prompt[]): number => {
    const titleRegex: RegExp = /^Title (\d+)$/;

    const titleNumbers: number[] = prompts
        .map(prompt => {
            const match = prompt.title.match(titleRegex);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter((num): num is number => num !== null);

    if (titleNumbers.length === 0) {
        return 1;
    }

    const maxNumber: number = Math.max(...titleNumbers);
    return maxNumber + 1; 
}