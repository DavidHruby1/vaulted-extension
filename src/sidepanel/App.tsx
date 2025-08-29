import './index.css'
import { Layout } from '@components/layout/Layout';
import { AddPromptModal } from './components/modals/AddPromptModal';


function App() {
    return (
        <div>
            <Layout
                {/* prompts={ prompts } */}
                onAddClick={ () => setIsModalOpen(true) }
            />
            <AddPromptModal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen(false) }
                {/* onAddPrompt={ handleAddPrompt } */}
            />
        </div>
    );
}

export default App
