import { Collection } from '../../../../entities/Collection';

export interface ProfileSchema {
    collections: Collection[],
    isLoading: boolean,
    error?: string,
}
