import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    comments?: Comment[];
    isLoading: boolean;
}

export const CommentList = memo(({ isLoading, comments }: CommentListProps) => {
    const { t } = useTranslation();

    return (
        <div>
            {!!comments?.length &&
                 comments.map((comment) => (
                    <CommentCard comment={comment} key={comment.id} />
                ))}

            {isLoading && (
                <>
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </>
            )}

            {!comments?.length && !isLoading && (<p>{t('No comments')}</p>)}
        </div>
    );
});
