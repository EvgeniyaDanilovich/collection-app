import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../../models/services/fetchItemById';
import { selectItem, selectLikedUserId, selectLikesCount } from '../../models/selectors/itemSelectors';
import { addLike } from '../../models/services/addLike';
import { localStorageKeys } from '../../../../shared/const/localStorage';

export const ItemInfo = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const item = useSelector(selectItem);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const likedUsersId = useSelector(selectLikedUserId);
    const likesCount = useSelector(selectLikesCount);

    useEffect(() => {
        if (id) {
            dispatch(fetchItemById(id));
        }
    }, []);

    const handleLike = () => {
        if (userId && likesCount !== undefined && likedUsersId) {
            const likedByUser = likedUsersId?.includes(Number(userId));
            const index = likedUsersId?.indexOf(Number(userId));
            const copyLikedUsersId = [...likedUsersId];

            const count: number = likedByUser ? likesCount - 1 : likesCount + 1;
            const usersId = (): number[] => {
                if (likedByUser) {
                    copyLikedUsersId.splice(index, 1);
                    return copyLikedUsersId;
                } else {
                    return [...copyLikedUsersId, Number(userId)]
                }
            };

            const data = {
                id: Number(id),
                like: {
                    count: count,
                    usersId: usersId()
                }
            };
            console.log(data);
            dispatch(addLike(data));
        }
    };

    return (
        <div>
            {item && (
                <div>
                    <div>Name: {item.name}</div>
                    <div>Tags: {item.tags}</div>
                    <div onClick={handleLike}>Add like</div>
                    <div>Likes: {item.like.count}</div>
                    <div>{item.stringFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>
                    <div>{item.textareaFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    <div>{item.checkboxFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    <div>{item.dateFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    <div>{item.numberFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>
                </div>
            )}

        </div>
    );
};
