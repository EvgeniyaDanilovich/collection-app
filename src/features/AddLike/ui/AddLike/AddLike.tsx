import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageKeys } from '../../../../shared/const/localStorage';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { addLike, selectLikedUserId, selectLikesCount } from '../../../../entities/Item';
import { Icon, IconColor, IconHover, IconType } from '../../../../shared/ui/Icon/Icon';
import { ReactComponent as LickIcon } from '../../../../shared/assets/icons/like.svg';
import { ReactComponent as FullLickIcon } from '../../../../shared/assets/icons/full_like.svg';

export const AddLike = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const likedUsersId = useSelector(selectLikedUserId);
    const likesCount = useSelector(selectLikesCount);

    const likedByUser = likedUsersId?.includes(Number(userId));

    const handleLike = () => {
        if (userId && likesCount !== undefined && likedUsersId) {
            const index = likedUsersId?.indexOf(Number(userId));
            const copyLikedUsersId = [...likedUsersId];

            const count: number = likedByUser ? likesCount - 1 : likesCount + 1;
            const usersId = (): number[] => {
                if (likedByUser) {
                    copyLikedUsersId.splice(index, 1);
                    return copyLikedUsersId;
                } else {
                    return [...copyLikedUsersId, Number(userId)];
                }
            };

            const data = {
                id: Number(id),
                like: {
                    count: count,
                    usersId: usersId()
                }
            };
            dispatch(addLike(data));
        }
    };

    return (
        <div className={'d-flex align-self-center gap-1 mb-5 mt-2'}>
            {likesCount && <div>{likesCount}</div>}
            <div onClick={handleLike}>
                {likedByUser ? <Icon Svg={FullLickIcon} type={IconType.FILL} color={IconColor.RED} hover={IconHover.RED} />
                    : <Icon Svg={LickIcon} type={IconType.FILL} color={IconColor.RED} hover={IconHover.RED} />}
            </div>
        </div>
    );
};
