export interface InputField {
    name: string,
    value: string
}

export interface InputBooleanField {
    name: string,
    value: boolean
}

export interface Item {
    id: number,
    userId: number,
    collectionId: number,
    name: string,
    tags: string,
    stringFields: InputField[],
    textareaFields: InputField[],
    checkboxFields: InputBooleanField[],
    dateFields: InputField[],
    numberFields: InputField[],
}
