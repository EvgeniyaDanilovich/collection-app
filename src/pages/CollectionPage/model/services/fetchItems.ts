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

        console.log(data);

        const queryParams = new URLSearchParams({
            collectionId,
            ...(sort && { _sort: sort }),
            ...(order && { _order: order }),
            ...(q && { q }),
            ...(tag && { tags: tag }),
        }).toString();

        console.log(queryParams);


        try {
            const response = await fetch(`${baseUrl}items?${queryParams}`);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
