import { Item } from '../../../../entities/Item';

export interface CollectionPageSchema {
    items: Item[],
    tags: string[],
    isLoading: boolean,
    error?: string,
}
