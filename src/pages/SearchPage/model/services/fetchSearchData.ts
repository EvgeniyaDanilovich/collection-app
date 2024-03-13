import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { searchByComments } from './searchByComments';
import { searchByItems } from './searchByItems';
import { searchByCollection } from './searchByCollection';
import { searchPageActions } from '../slice/searchPageSlice';

export const fetchSearchData = createAsyncThunk<void, string, ThunkConfig<string>>(
    'searchPage/fetchSearchData',
    async (q, thunkAPI) => {
        thunkAPI.dispatch(searchPageActions.cleanItems());

        await Promise.all([
            thunkAPI.dispatch(searchByComments(q)),
            thunkAPI.dispatch(searchByItems(q)),
            thunkAPI.dispatch(searchByCollection(q)),
        ]);
    }
);
