import React, { useCallback, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import cls from './TagInput.module.scss';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';

interface Props {
    tagsInput: string;
    setTagsInput: (value: string) => void;
    tags: string[];
    setTags: (value: string[]) => void;
}

export const TagInput = ({ tags, setTags, tagsInput, setTagsInput }: Props) => {
    const { t } = useTranslation();
    const [suggestions, setSuggestions] = useState(['numismatics', 'coin_collecting', 'world_coins', 'ancient_coins', 'rare_coins',
                                                    'commemorative_coins', 'coins', 'books', 'bibliophile', 'literary_classics',
                                                    'rare_books', 'first_editions', 'bookworm', 'mystery', 'science_fiction',
                                                    'fantasy', 'genre_specific', 'stamps', 'philately', 'stamp_collecting',
                                                    'commemorative_stamps', 'rare_stamps', 'thematic_stamps', 'postal_history', 'postcards',
                                                    'postcard_collecting', 'vintage_postcards', 'travel_postcards', 'artistic_postcards', 'holiday_cards',
                                                    'geographic_locations', 'dolls', 'doll_collecting', 'antique_dolls', 'art_dolls',
                                                    'porcelain_dolls', 'dollhouse_miniatures', 'ethnic_or_cultural_dolls']);
    const [isOpen, setIsOpen] = useState(true);

    const filterSuggestions = () => {
        return suggestions.filter((item) => item.toLowerCase().includes(tagsInput.toLowerCase()));
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
            <div>
                {tags && (
                    tags.map(tag => (<span>#{tag} <span onClick={() => onDeleteTag(tag)}>D </span></span>))
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
