import React from 'react';
import { CSVLink } from 'react-csv';
import { Collection } from '../../../entities/Collection';
import cls from './ExportToCSV.module.scss'
import { useTranslation } from 'react-i18next';

interface Props {
    collections: Collection[];
}

export const ExportToCSV = ({ collections }: Props) => {
    const { t } = useTranslation();

    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'User ID', key: 'userId' },
        { label: 'Name', key: 'name' },
        { label: 'Category', key: 'category' },
        { label: 'Description', key: 'description' },
        { label: 'Image URL', key: 'imgUrl' },
        { label: 'String fields', key: 'stringFields' },
        { label: 'Textarea fields', key: 'textareaFields' },
        { label: 'Number fields', key: 'numberFields' },
        { label: 'Date fields', key: 'dateFields' },
        { label: 'Checkbox fields', key: 'checkboxFields' },
    ];

    return (
        <div className={cls.area}>
            {!!collections.length &&
                <CSVLink data={collections} filename={'my-file.csv'} separator={";"} headers={headers} className={cls.link} >
                    {t('Export collections to CSV')}
                </CSVLink>}
        </div>
    );
};
