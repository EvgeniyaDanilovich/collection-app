import React, { useCallback, useEffect } from 'react';
import { ItemInfo } from '../../../entities/Item';
import { AddCommentForm } from '../../../features/AddCommentForm';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../model/services/fetchComments';
import { useParams } from 'react-router-dom';
import { selectComments, selectIsLoading } from '../model/selectors/itemPageSelectors';
import { addComment } from '../model/services/addComment';
import { Comment } from '../../../entities/Comment';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { CommentList } from '../../../entities/Comment/ui/CommentList/CommentsList';
import { BackButton } from '../../../shared/ui/BackButton/BackButton';
import { AddLike } from '../../../features/AddLike';
import { selectIsAuth } from '../../../features/AuthByUserName';

const ItemPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const comments = useSelector(selectComments);
    const isLoading = useSelector(selectIsLoading);
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (id) {
            dispatch(fetchComments(id));
        }
    }, []);

    const handleSendComment = useCallback((text: string) => {
        if (id && userId) {
            const data: Omit<Comment, 'id'> = {
                text,
                itemId: Number(id),
                userId: Number(userId)
            };
            dispatch(addComment(data));
        }
    }, [dispatch, userId, id]);

    return (
        <div>
            <BackButton />
            <ItemInfo />
            <AddLike />
            <h5>Comments</h5>
            {isAuth && <AddCommentForm onSendComment={handleSendComment} />}
            <CommentList comments={comments} isLoading={isLoading} />
        </div>
    );
};

export default ItemPage;
