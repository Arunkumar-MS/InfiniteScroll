import * as React from 'react';

interface Props {
    url: string;
    id?: string;
    placeholerUrl?: string;
}
interface Payload {
    src: string
    className?: string;
}
interface Action {
    type: string;
    payload: Payload;
}

export const useProgressiveImage = (props: Props) => {
    const [image, setImage] = React.useState({ ...props, url: 'https://media.giphy.com/media/l0dJ49ChzUuKU8Ampv/giphy.gif', className: 'loadin-image' });

    React.useEffect(() => {
        const mainImage = new Image();
        mainImage.onload = () => {
            const className = bucketImages(mainImage);
            setImage({ ...props, className });
        };
        mainImage.src = props.url;
        return () => mainImage.src = "";
    }, [props.url]);

    return image;
}


const bucketImages = (mainImage) => {
    const { width, height } = mainImage;
    if (width > 800 && height > 600) {

        return 'XL';
    }
    if (width > 400 && height > 600) {
        return 'L'
    }
    if (width > 300 && height > 300) {
        return 'M'
    }

    if (width > 250 && mainImage.height > 300) {
        return 'S'
    }
    return 'XS';
}
