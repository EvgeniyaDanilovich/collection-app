import { CollectionCategories } from '../../../../entities/Collection';
import { SelectOption } from '../../../../shared/ui/Select/Select';

export const options: SelectOption<CollectionCategories>[] = [
    { value: CollectionCategories.COINS, content: CollectionCategories.COINS },
    { value: CollectionCategories.BOOKS, content: CollectionCategories.BOOKS },
    { value: CollectionCategories.STAMPS, content: CollectionCategories.STAMPS },
    { value: CollectionCategories.POSTCARDS, content: CollectionCategories.POSTCARDS },
    { value: CollectionCategories.DOLLS, content: CollectionCategories.DOLLS },
];
