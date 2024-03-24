import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

export const CollectionCardSkeleton = () => {
    return (
        <>
            <div className={'d-flex align-items-center justify-content-between'}>
                <Placeholder as={Card.Title} animation="glow" className={'w-100'}>
                    <Placeholder xs={4} />
                </Placeholder>
                <Placeholder.Button xs={2} animation="glow" variant="info" />
            </div>

            <Placeholder as={'p'} animation="glow" className={'mb-5 mt-2'}>
                <Placeholder xs={12} style={{ height: '100px' }} />
            </Placeholder>
        </>
    );
};
