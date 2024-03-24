import React, { memo } from 'react';
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

export const CommentCard = memo(({ comment, isLoading }: CommentCardProps) => {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className={cls.CommentCard}>
                <div className={cls.userField}>
                    <Placeholder as={'p'} animation="glow">
                        <Placeholder xs={4} style={{ height: '28px', width: '28px', borderRadius: '50%' }} />
                    </Placeholder>
                    <Placeholder as={'p'} animation="glow">
                        <Placeholder xs={6} style={{ height: '18px', width: '150px',}}  />
                    </Placeholder>
                </div>
                <Placeholder as={'p'} animation="glow">
                    <Placeholder xs={12} style={{ height: '50px' }} />
                </Placeholder>
            </div>
        );
    }

    const redirectToUser = () => {
        navigate(`${RoutePath.profile}${comment?.userId}`);
    };

    return (
        <>
            {comment &&
                <div className={cls.CommentCard}>
                    <div className={cls.userField} onClick={redirectToUser}>
                        <UserIcon className={cls.user} />
                        <p>{comment.user?.username}</p>
                    </div>
                    <p className={cls.text}>{comment.text}</p>
                </div>
            }
        </>
    );
});
