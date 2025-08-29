import styles from './AddPromptButton.module.css';

interface AddPromptButtonProps {
    onAddClick: () => void;
}

export const AddPromptButton = ({ onAddClick }: AddPromptButtonProps) => {
    return (
        <button className={ styles['add-button'] } onClick={ onAddClick }>
            ADD PROMPT
        </button>
    );
}