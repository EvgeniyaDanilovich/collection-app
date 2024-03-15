import React, { memo } from 'react';
import cls from './Icon.module.scss';

export enum IconColor {
    PRIMARY = 'primaryColor',
    SECONDARY = 'secondaryColor',
    RED = 'redColor',
    STANDARD = 'standardColor'
}

export enum IconType {
    FILL = 'fill',
    STROKE = 'stroke',
}

export enum IconHover {
    RED = 'red',
}

interface IconProps {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    color?: IconColor;
    type: IconType;
    hover?: IconHover;
}

export const Icon = memo((props: IconProps) => {
    const { Svg, color = IconColor.PRIMARY, type, hover } = props;


    return (
        <>
            <Svg className={`${cls[type]} ${cls[color]} ${cls.svg}
                             ${hover !== undefined ? cls[hover] : ''}
             `} />
        </>
    );
});
