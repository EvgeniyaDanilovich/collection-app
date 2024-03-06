export enum CollectionCategories {
    COINS= 'Coins',
    BOOKS = 'Books',
    STAMPS = 'Stamps',
    POSTCARDS = 'Postcards',
    DOLLS = 'Dolls'
}

export interface Collection {
    id: number,
    userId: number,
    name: string,
    description: string,
    category: CollectionCategories,
    imgUrl?: string,
    stringFields?: string[],
    textareaFields?: string[],
    checkboxFields?: string[],
    dateFields?: string[],
    numberFields?: string[],
}

export interface CollectionSchema {
    collection: Collection | null,
    isLoading: boolean,
    error?: string
}

