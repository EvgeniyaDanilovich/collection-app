export interface Collection {
    id: number,
    userId: number,
    name: string,
    description: string,
    category: string,
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

