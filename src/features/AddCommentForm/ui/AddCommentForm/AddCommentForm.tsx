import React, { memo, useCallback, useState } from 'react';
import { Textarea } from '../../../../shared/ui/Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import cls from './AddCommentForm.module.scss'

interface Props {
    onSendComment: (value: string) => void;
}

export const AddCommentForm = memo(({ onSendComment }: Props) => {
    const { t } = useTranslation();
    const [text, setText] = useState<string>('');

    const onSendHandler = useCallback(() => {
        if (text) {
            onSendComment(text);
            setText('');
        }
    }, [onSendComment, text]);

    return (
        <div className={cls.form}>
            <Textarea value={text} setValue={setText} placeholder={t('Enter comment text')} />
            <Button onClick={onSendHandler} className={cls.submitBtn}>{t('Submit')}</Button>
        </div>
    );
});
