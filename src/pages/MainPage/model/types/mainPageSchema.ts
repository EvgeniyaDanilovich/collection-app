import { ItemWithDetails } from '../../../../entities/Item';
import { Collection } from '../../../../entities/Collection';

export interface MainPageSchema {
    mainPageItems: ItemWithDetails[],
    isLoading: boolean,
    error?: string
}
