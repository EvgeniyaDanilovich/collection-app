import { Collection } from '../../../../entities/Collection';

export interface CollectionsPageSchema {
    collection: Collection[],
    isLoading: boolean,
    error?: string,
}
