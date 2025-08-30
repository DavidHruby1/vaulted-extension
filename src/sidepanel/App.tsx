import './index.css'
import { useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { AddPromptModal } from './components/modals/AddPromptModal';
import type { Prompt } from '@/shared/types';


function App() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPrompt = (data: {title: string, tags: string[], text: string}) => {
        const newPrompt: Prompt = {
            ...data,
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
