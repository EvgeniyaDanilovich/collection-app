import React, { memo } from 'react';

interface Props {
    tags: string[];
    handleClick: (tag: string) => void;
}

export const TagsList = memo(({tags, handleClick}: Props) => {
    return (
        <>
            {!!tags.length && tags.map(tag=>{
                return (
                    <span key={tag} onClick={()=> handleClick(tag)}>#{tag} </span>
                )
            })}
        </>
    );
});