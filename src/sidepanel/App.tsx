import './index.css'
import { useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { AddPromptModal } from './components/modals/AddPromptModal';
import type { Prompt } from '@/shared/types';
import { getNextTitleNumber } from '@/shared/utils/getNextTitleNumber';
import { capitalizeTitle } from '@/shared/utils/capitalizeTitle';

function App() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdatePrompt = (id: string, updates: Partial<Prompt>) => {
        setPrompts(prevPrompts => {
            if (updates.title !== undefined && updates.title.trim() === '') {
                const otherPrompts = prevPrompts.filter(p => p.id !== id);
                const newTitleNumber = getNextTitleNumber(otherPrompts);
                updates.title = `Title_${newTitleNumber}`;
            }

            return prevPrompts.map(p => 
                p.id === id ? { ...p, ...updates } : p
            );
        });
    };

    const handleAddPrompt = (data: {title: string, tags: string[], text: string}) => {
        const finalTitle = data.title.trim() === ''
            ? `Title_${getNextTitleNumber(prompts)}`
            : capitalizeTitle(data.title.trim());

        const newPrompt: Prompt = {
            title: finalTitle,
            tags: data.tags,
            text: data.text,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            tokenCount: Math.ceil(data.text.length / 4) // Estimate for now - will be replaced with proper token counting function later
        };

        setPrompts(prevPrompts => [newPrompt, ...prevPrompts])
    }

    return (
        <div>
            <Layout
                prompts={ prompts }
                onAddClick={ () => setIsModalOpen(true) }
                onUpdatePrompt={ handleUpdatePrompt }
                nextTitleNumber={ getNextTitleNumber(prompts) }
            />
            <AddPromptModal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen(false) }
                onAddPrompt={ handleAddPrompt }
            />
        </div>
    );
}

export default App
