import React, { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Select, SelectOption } from '../../../../shared/ui/Select/Select';
import { CollectionCategories } from '../../../../entities/Collection';
import { useTranslation } from 'react-i18next';

interface Props {
    category: CollectionCategories;
    setCategory: (value: CollectionCategories) => void;
}

export const SelectCategory = ({category, setCategory}: Props) => {
    const { t } = useTranslation();

    const options = useMemo<SelectOption<CollectionCategories>[]>(
        () => [
            {
                value: CollectionCategories.COINS,
                content: t('Coins'),
            },
            {
                value: CollectionCategories.BOOKS,
                content: t('Books'),
            },
            {
                value: CollectionCategories.STAMPS,
                content: t('Stamps'),
            },
            {
                value: CollectionCategories.POSTCARDS,
                content: t('Postcards'),
            },
            {
                value: CollectionCategories.DOLLS,
                content: t('Dolls'),
            },
        ], [t]);

    return (
        <Form.Group className="mb-3">
            <Select value={category} onChange={(value: string) => setCategory(value as CollectionCategories)}
                    label={t('Collection category')} options={options} />
        </Form.Group>
    );
};
