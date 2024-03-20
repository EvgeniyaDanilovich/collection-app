import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';
import { getCurrentDate } from '../../../../shared/utils/getCurrentDate';
import { selectCollectionOwnerId } from '../../../../entities/Collection';

export const createItem = createAsyncThunk<Item, Partial<Item>, ThunkConfig<string>>(
    'collectionPage/createItem',
    async (item, thunkAPI) => {
        const currentDate = getCurrentDate();
        const userId = selectCollectionOwnerId(thunkAPI.getState());

        const data = {
            ...item,
            userId,
            like: {
                count: 0,
                usersId: [],
            },
            createdDate: currentDate,
        }

        try {
            const response = await fetch(`${baseUrl}items`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return  await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
