import * as React from 'react';
import { useProgressiveImage } from '../../customHooks/useProgressiveImage';

interface Props {
    url: string;
    id: string;
    className?: string;
    style?: any;
}

export const ProgressiveImageLoad: React.FC<Props> = React.memo((props) => {
    const data = useProgressiveImage(props);
    return (<div className="img-hover-zoom"> <img src={data.url} className={data.className} /> </div>);
});






