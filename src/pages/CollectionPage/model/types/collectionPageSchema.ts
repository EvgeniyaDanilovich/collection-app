import { Item } from '../../../../entities/Item';

export interface CollectionPageSchema {
    items: Item[],
    isLoading: boolean,
    error?: string,
}
