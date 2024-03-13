import { ItemWithDetails } from '../../../../entities/Item';
import { Collection } from '../../../../entities/Collection';

export interface MainPageSchema {
    lastAddedItems: ItemWithDetails[],
    biggestCollections: Collection[],
    isLoading: boolean,
    error?: string
}
