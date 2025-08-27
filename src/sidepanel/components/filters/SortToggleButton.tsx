import styles from './SortToggleButton.module.css';
import { ChevronDown } from 'lucide-react';

export const SortToggleButton = () => {
    return (
        <button className={ styles['sort-toggler'] }>
            <ChevronDown size={16} />
        </button>
    );
}
