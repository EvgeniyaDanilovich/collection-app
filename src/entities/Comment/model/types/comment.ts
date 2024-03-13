import { Item } from '../../../Item';

export interface Comment {
    text: string;
    id: number;
    itemId: number;
    userId: number;
    item?: Item;
}
