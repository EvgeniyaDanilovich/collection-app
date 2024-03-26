import React, { useCallback, useEffect } from 'react';
import { ItemInfo } from '../../../entities/Item';
import { AddCommentForm } from '../../../features/AddCommentForm';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../model/services/fetchComments';
import { useParams } from 'react-router-dom';
import { selectComments, selectError, selectIsLoading } from '../model/selectors/itemPageSelectors';
import { addComment } from '../model/services/addComment';
import { Comment } from '../../../entities/Comment';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { CommentList } from '../../../entities/Comment/ui/CommentList/CommentsList';
import { BackButton } from '../../../shared/ui/BackButton/BackButton';
import { AddLike } from '../../../features/AddLike';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { itemPageActions } from '../model/slice/itemPageSlice';
import { useTranslation } from 'react-i18next';

const ItemPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const comments = useSelector(selectComments);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

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

    const handleCloseError = useCallback(() => {
        dispatch(itemPageActions.setError(undefined));
    }, [dispatch]);

    const handleFetchComments = useCallback((id: string)=> {
        dispatch(fetchComments(id));
    }, []);

    return (
        <div>
            <BackButton />
            <ItemInfo />
            <AddLike />
            <h5>{t('Comments')}</h5>
            <AddCommentForm onSendComment={handleSendComment} fetchComments={handleFetchComments} />
            <CommentList comments={comments} isLoading={isLoading} />

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default ItemPage;
