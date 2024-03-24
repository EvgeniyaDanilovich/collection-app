import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const UserCardSkeleton = () => {
    const { t } = useTranslation();

    return (
        <Card className={'mb-5 w-100'}>
            <Card.Body>
                <div className={'d-flex align-items-center justify-content-between mb-3'}>
                    <Card.Title>{t('Profile info')}</Card.Title>
                    <Placeholder.Button xs={1} size={'lg'} animation="glow" variant="secondary" />
                </div>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={2} />{' '}
                    <Placeholder xs={6} />
                </Placeholder>

                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={2} />{' '}
                    <Placeholder xs={6} />
                </Placeholder>

                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={2} />{' '}
                    <Placeholder xs={6} />
                </Placeholder>

            </Card.Body>
        </Card>
    );
};
