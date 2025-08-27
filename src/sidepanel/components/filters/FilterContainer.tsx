import styles from './FilterContainer.module.css';
import { Funnel as LucideFilter } from 'lucide-react';
import { ListFilter as LucideSort } from 'lucide-react';
import { FilterButton } from '@components/filters/FilterButton';
import { SortToggleButton } from './SortToggleButton';

export const FilterContainer = () => {
    return (
        <div className={ styles['filter-container'] }>
            <div>
                <FilterButton 
                    text="Clear All"
                    bgColor="var(--accent)"
                />
            </div>
            <div className={ styles.right}>
                <FilterButton 
                    text="Filter"
                    icon={ LucideFilter }
                />
                <FilterButton 
                    text="Sort"
                    icon={ LucideSort }
                />
                <SortToggleButton />
            </div>
        </div>
    );
}