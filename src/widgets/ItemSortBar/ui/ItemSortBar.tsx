import React, { useCallback, useMemo, useState } from 'react';
import { Select, SelectOption } from '../../../shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { SortOrder } from '../../../shared/types/sort';
import { ItemSortField } from '../../../entities/Item/models/const/itemConsts';
import { TagsList } from '../../../entities/Tag/ui/TagsList';

interface Props {
    onSort: (sort: string, order: string, tag: string) => void;
    tags: string[];
}

export const ItemSortBar = ({ onSort, tags }: Props) => {
    const { t } = useTranslation();
    const [order, setOrder] = useState('');
    const [sort, setSort] = useState('');
    const [tag, setTag] = useState('');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('increasing'),
            },
            {
                value: 'desc',
                content: t('descending'),
            },
        ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ItemSortField>[]>(
        () => [
            {
                value: ItemSortField.NONE,
                content: t('not selected'),
            },
            {
                value: ItemSortField.CREATED,
                content: t('creation date'),
            },
            {
                value: ItemSortField.TITLE,
                content: t('name'),
            },
            {
                value: ItemSortField.LIKES,
                content: t('likes'),
            },
        ], [t]);

    const handleOnChangeSort = (sort: string) => {
        setSort(sort);
        onSort(sort, order, tag);
    };

    const handleOnChangeOrder = useCallback((order: string) => {
        setOrder(order);
        onSort(sort, order, tag);
    }, [sort, order, setSort]);

    const handleFilter = useCallback((tag: string) => {
        setTag(tag);
        onSort(sort, order, tag);
    }, [sort, order, setSort, tag]);

    return (
        <div>
            <Select value={sort} onChange={handleOnChangeSort} options={sortFieldOptions} label={t('Sort by')} />
            <Select value={order} onChange={handleOnChangeOrder} options={orderOptions} />
            <div>
                <span onClick={() => handleFilter('')}>#All </span>
                <TagsList tags={tags} handleClick={handleFilter} />
                {/* {tags && tags.map(tag => { */}
                {/*     return <span key={tag} onClick={() => handleFilter(tag)}>#{tag} </span>; */}
                {/* })} */}
            </div>
        </div>
    );
};
