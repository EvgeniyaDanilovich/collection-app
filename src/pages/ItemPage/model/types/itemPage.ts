import { Comment } from '../../../../entities/Comment';

export interface ItemPageSchema {
    comments: Comment[],
    isLoading: boolean,
    error?: string,
}