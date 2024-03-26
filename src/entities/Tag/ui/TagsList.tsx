import React, { memo, useState } from 'react';

interface Props {
    tags: string[];
    handleClick?: (tag: string) => void;
    hover?: boolean;
}

export const TagsList = memo(({tags, handleClick, hover = true}: Props) => {
    const [activeTag, setActiveTag] = useState<string | null>('All');

    const onClick = (tag: string) => {
        if (handleClick) {
            handleClick(tag);
            setActiveTag(tag);
        }
    };

    return (
        <div className={'d-flex flex-row flex-wrap gap-2'}>
            {!!tags.length && tags.map(tag => {
                return (
                    <span key={tag} onClick={() => onClick(tag)}
                          className={`tag ${hover ? '' : 'hover'} ${activeTag === tag ? 'active' : ''}`}>
                        #{tag}
                    </span>
                );
            })}
        </div>
    );
});
