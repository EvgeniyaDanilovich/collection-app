import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';

interface Props {
    id: string;
    sort?: string;
    order?: string;
    q?: string;
    tag?: string
}

export const fetchItems = createAsyncThunk<Item[], Props, ThunkConfig<string>>(
    'collectionPage/fetchItems',
    async (data, thunkAPI) => {
        const { id: collectionId, sort, order, q, tag } = data;

        const queryParams = new URLSearchParams({
            collectionId,
            ...(sort && { _sort: sort }),
            ...(order && { _order: order }),
            ...(tag && { tags_like: tag }),
        }).toString();

        try {
            const response = await fetch(`${baseUrl}items?${queryParams}`);

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
