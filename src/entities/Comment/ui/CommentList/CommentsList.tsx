import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { isLoading, comments } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={cls.CommentList}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={cls.CommentList}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        comment={comment}
                        key={comment.id}
                    />
                ))
                : <p>{t('No comments')}</p>}
        </div>
    );
});
