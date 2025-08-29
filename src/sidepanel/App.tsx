import './index.css'
import { useState } from 'react';
import { Layout } from '@components/layout/Layout';
import { AddPromptModal } from './components/modals/AddPromptModal';


function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Layout
                /* prompts={ prompts } */
                onAddClick={ () => setIsModalOpen(true) }
            />
            <AddPromptModal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen(false) }
                /* onAddPrompt={ handleAddPrompt } */
            />
        </div>
    );
}

export default App
