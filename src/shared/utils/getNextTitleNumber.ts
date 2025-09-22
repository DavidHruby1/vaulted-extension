import type { Prompt } from '@/shared/types';

export const getNextTitleNumber = (prompts: Prompt[], editedId?: string): number => {
    const titleRegex: RegExp = /^Title_(\d+)$/;

    const usedNumbers = new Set<number>();

    for (const prompt of prompts) {
        if (editedId && prompt.id === editedId) continue;

        const match = prompt.title.match(titleRegex);
        if (match) {
            const titleNumber = parseInt(match[1], 10);
            usedNumbers.add(titleNumber);
        }
    }

    let num = 1;
    while (usedNumbers.has(num)) {
        num++;
    }

    return num;
}