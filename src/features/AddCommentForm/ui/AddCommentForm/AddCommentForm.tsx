import React, { memo, useCallback, useState } from 'react';
import { Textarea } from '../../../../shared/ui/Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

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
        <div>
            <Textarea value={text} setValue={setText} placeholder={t('Enter comment text')} />
            <Button onClick={onSendHandler}>{t('Submit')}</Button>
        </div>
    );
});
