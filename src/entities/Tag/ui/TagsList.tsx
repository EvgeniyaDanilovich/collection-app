import React, { memo } from 'react';

interface Props {
    tags: string[];
    handleClick?: (tag: string) => void;
    hover?: boolean;
}

export const TagsList = memo(({tags, handleClick, hover = true}: Props) => {
    const onClick = (tag: string) => {
        if (handleClick) {
            handleClick(tag);
        }
    };

    return (
        <div className={'d-flex flex-row flex-wrap gap-2'}>
            {!!tags.length && tags.map(tag => {
                return (
                    <span key={tag} onClick={() => onClick(tag)} className={`tag ${hover ? '' : 'hover'}`}>#{tag}</span>
                );
            })}
        </div>
    );
});
