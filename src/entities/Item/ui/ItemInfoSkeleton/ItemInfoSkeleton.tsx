import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

export const ItemInfoSkeleton = () => {
    return (
        <>
            <Placeholder as={Card.Title} animation="glow" className={'mb-2'}>
                <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={'p'} animation="glow" className={'w-50'}>
                <Placeholder xs={4} />{' '}
                <Placeholder xs={6} />
                <Placeholder xs={4} />{' '}
                <Placeholder xs={6} />
                <Placeholder xs={4} />{' '}
                <Placeholder xs={6} />
            </Placeholder>
            <div className={'d-flex gap-2 mt-3 mb-5'} style={{height: '24px'}}>
                <Placeholder.Button xs={2} size={'lg'} animation="glow" variant="secondary" />
                <Placeholder.Button xs={2} size={'lg'} animation="glow" variant="secondary" />
                <Placeholder.Button xs={2} size={'lg'} animation="glow" variant="secondary" />
                <Placeholder.Button xs={2} size={'lg'} animation="glow" variant="secondary" />
                <Placeholder.Button xs={2} size={'lg'} animation="glow" variant="secondary" />
            </div>
        </>
    );
};
