// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { baseUrl } from '../../../../shared/const/api';
// import { User } from '../../../../entities/User';
// import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
//
// interface Props {
//     userId: number;
//     status: string;
// }
//
// export const updateUserStatus = createAsyncThunk<User, Props, ThunkConfig<string>>(
//     'auth/updateUserStatus',
//     async (data, thunkAPI) => {
//         try {
//             const response = await fetch(`${baseUrl}users/${data.userId}`, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'PATCH',
//                 body: JSON.stringify({status: data.status}),
//             });
//             console.log(response);
//
//             if (!response.ok) {
//                 throw new Error();
//             } else {
//                 const newData = await response.json();
//                 console.log(newData);
//                 return newData;
//             }
//         } catch (e) {
//             return thunkAPI.rejectWithValue('Something went wrong');
//         }
//     }
// );

export {}