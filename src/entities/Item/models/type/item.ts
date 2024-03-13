import { Collection } from '../../../Collection';
import { User } from '../../../User';

export interface InputField {
    name: string,
    value: string
}

export interface InputBooleanField {
    name: string,
    value: boolean
}

export interface Like {
    count: number,
    usersId: number[]
}

export interface Item {
    id: number,
    userId: number,
    collectionId: number,
    name: string,
    tags: string[],
    like: Like,
    createdDate: string,
    stringFields: InputField[],
    textareaFields: InputField[],
    checkboxFields: InputBooleanField[],
    dateFields: InputField[],
    numberFields: InputField[],
}

export type PartialItem = {id: number} & Partial<Omit<Item, 'id'>>

export type ItemWithDetails = Item & {
    collection: Collection,
    user: User
}

export interface ItemSchema {
    item: Item | null;
    isLoading: boolean;
    error?: string;
}
