import { Item } from '../../../../entities/Item';
import { Collection } from '../../../../entities/Collection';

export interface SearchPageSchema {
    searchedItems: Item[],
    searchedCollections: Collection[],
    isLoading: boolean,
    error?: string,
}