import { memo } from 'react';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { ReactComponent as UserIcon } from '../../../../shared/assets/icons/user.svg';

interface CommentCardProps {
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { comment, isLoading } = props;
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className={`${cls.CommentCard} ${cls.loading}`}>
                <div className={cls.header}>
                    {/* <Skeleton width={30} height={30} border="50%" /> */}
                    <Placeholder animation={'wave'} border="50%" width={30} height={30} />
                    <Placeholder animation={'wave'} border="50%" width={100} height={16} className={cls.username} />
                    {/* <Skeleton height={16} width={100} className={cls.username} /> */}
                </div>
                {/* <Skeleton className={cls.text} width="100%" height={50} /> */}
                <Placeholder animation={'wave'} border="50%" width={'100%'} height={50} className={cls.text} />

            </div>
        );
    }

    if (!comment) {
        return null;
    }

    const redirectToUser = () => {
        navigate(`${RoutePath.profile}${comment.userId}`);
    }

    return (
        <div className={cls.CommentCard}>
            <div className={cls.userField} onClick={redirectToUser}>
                <UserIcon className={cls.user} />
                <p>{comment.user?.username}</p>
            </div>
            <p className={cls.text}>{comment.text}</p>
        </div>
    );
});
