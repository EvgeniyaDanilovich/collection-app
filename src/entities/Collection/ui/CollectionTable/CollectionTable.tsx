import React, { memo } from 'react';
import { Collection } from '../../model/types/collection';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './CollectionTable.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuth } from '../../../../features/AuthByUserName';
import { localStorageKeys } from '../../../../shared/const/localStorage';
import { ReactComponent as EditIcon } from '../../../../shared/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../shared/assets/icons/delete.svg';
import { Icon, IconColor, IconHover, IconType } from '../../../../shared/ui/Icon/Icon';

interface Props {
    collections: Collection[];
    onDeleteCollection?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export const CollectionTable = memo(({ collections, onDeleteCollection, onEdit }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isAdmin = useSelector(selectIsAdmin);
    const isAuth = useSelector(selectIsAuth);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    const redirectToCollection = (collectionId: number) => {
        navigate(`${RoutePath.collection}${collectionId}`);
    };

    const handleDelete = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        if (onDeleteCollection) {
            onDeleteCollection(collectionId);
        }
    };

    const handleEdit = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(collectionId);
        }
    };

    return (
        <div className={'Table'}>
            <Table hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {collections.length ? collections.map(collection => (
                        <tr key={collection.id} onClick={() => redirectToCollection(collection.id)}>
                            <td>{collection.name}</td>
                            <td>{collection.category}</td>
                            {(isAdmin || (isAuth && Number(userId) === collection.userId)) && onDeleteCollection && onEdit ? (
                                    <>
                                        <td onClick={(e) => handleEdit(e, collection.id)} className={cls.smallCell}>
                                            <Icon Svg={EditIcon} type={IconType.FILL} color={IconColor.STANDARD} />
                                        </td>
                                        <td onClick={(e) => handleDelete(e, collection.id)} className={cls.smallCell}>
                                            <Icon Svg={DeleteIcon} type={IconType.STROKE} color={IconColor.STANDARD} hover={IconHover.RED}/>
                                        </td>
                                    </>
                                ) :
                                (
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                )}
                        </tr>
                    ))
                    : (<tr>
                        <td className={cls.fullWidthCell} colSpan={4}>
                            {t('No collections found')}
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    );
});
