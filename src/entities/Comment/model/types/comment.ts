import { Item } from '../../../Item';
import { User } from '../../../User';

export interface Comment {
    text: string;
    id: number;
    itemId: number;
    userId: number;
    item?: Item;
    user? : User;
}
