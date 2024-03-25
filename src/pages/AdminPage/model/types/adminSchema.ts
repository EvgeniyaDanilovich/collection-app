import { User } from '../../../../entities/User';

export interface AdminSchema {
    users: User[],
    isLoading: boolean,
    isUpdating: boolean,
    error?: string,
}
