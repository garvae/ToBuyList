import React from 'react';
import RSC from 'react-scrollbars-custom';

type Props = {
    children: React.ReactNode;
};

const ScrollbarWrapper: React.FC<Props> = (props: Props) => (
    <RSC noScrollX momentum>
        {props.children}
    </RSC>
);

export default ScrollbarWrapper;
