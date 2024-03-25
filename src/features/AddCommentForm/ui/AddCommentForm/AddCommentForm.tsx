import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Textarea } from '../../../../shared/ui/Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import cls from './AddCommentForm.module.scss';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';

interface Props {
    onSendComment: (value: string) => void;
    fetchComments: (id: string) => void
}

export const AddCommentForm = memo(({ onSendComment, fetchComments }: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState<string>('');
    const socketRef = useRef<WebSocket | null>(null);
    const { id: itemId } = useParams();

    useEffect(() => {
        // const socket = new WebSocket('ws://localhost:8000/socket');
        const socket = new WebSocket('wss://collectionappserver-qn76hsor.b4a.run/socket');
        socketRef.current = socket;

        socket.onopen = () => {
            socket.send(JSON.stringify({
                method: 'connection',
                id: itemId
            }));
        };
        socket.onmessage = (event) => {
            const serverMessage = JSON.parse(event.data);
            switch (serverMessage.method) {
                case 'connection':
                    console.log(serverMessage);
                    break;
                case 'addComment':
                    commentsHandler();
                    break;
            }
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const commentsHandler = () => {
        if (itemId) {
            fetchComments(itemId);
        }
    };

    const onSendHandler = useCallback(() => {
        if (text && socketRef.current) {
            onSendComment(text);
            setText('');

            socketRef.current.send(JSON.stringify({
                method: 'addComment',
                id: itemId,
                comment: text
            }));
        }
    }, [text]);

    return (
        <div className={cls.form}>
            <Textarea value={text} setValue={setText} placeholder={t('Enter comment text')} />
            <Button onClick={onSendHandler} className={cls.submitBtn}>{t('Submit')}</Button>
        </div>
    );
});
