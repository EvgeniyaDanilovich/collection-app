import React, { useCallback, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import cls from './TagInput.module.scss';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { suggestionsTags } from '../../../../shared/const/tags';
import { Icon, IconHover, IconType } from '../../../../shared/ui/Icon/Icon';
import { ReactComponent as DeleteIcon } from '../../../../shared/assets/icons/delete.svg';

interface Props {
    tagsInput: string;
    setTagsInput: (value: string) => void;
    tags: string[];
    setTags: (value: string[]) => void;
}

export const TagInput = ({ tags, setTags, tagsInput, setTagsInput }: Props) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(true);

    const filterSuggestions = () => {
        return suggestionsTags.filter((item) => item.toLowerCase().includes(tagsInput.toLowerCase()));
    };

    const handleSuggestionClick = (selectedSuggestion: string) => {
        setTagsInput('');
        setTags([...tags, selectedSuggestion]);
        setIsOpen(prev => !prev);
    };

    const onDeleteTag = useCallback((tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
    }, [tags]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{t('Tags')}</Form.Label>
            <div className={'d-flex flex-wrap mb-2 gap-2'}>
                {tags && (
                    tags.map(tag => (
                        <div className={'tag hover d-flex align-items-center gap-1'} key={tag}>
                            <span>#{tag}</span>
                            <span onClick={() => onDeleteTag(tag)}>
                                    <Icon Svg={DeleteIcon} type={IconType.STROKE} hover={IconHover.RED} />
                            </span>
                        </div>))
                )}
            </div>
            <div className={cls.tagsField}>
                <Input value={tagsInput} setValue={setTagsInput} onClick={() => setIsOpen(true)} />
                <div className={cls.addBtn} onClick={() => handleSuggestionClick(tagsInput)}>+Add</div>
            </div>
            <ListGroup>
                {tagsInput && isOpen && filterSuggestions().map((suggestion, index) => (
                    <ListGroup.Item key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Form.Group>
    );
};
