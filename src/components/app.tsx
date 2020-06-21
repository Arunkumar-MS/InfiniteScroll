import * as React from 'react';
import { getAnimalImages } from '../service';
import { removeDuplicate } from '../helpers/removeDuplicates';
import { InfinitRender } from './infiniteRender';
import { ProgressiveImageLoad } from './progressiveImageLoad';

const backedReoveDubp = removeDuplicate();
const loadingImage = 'https://media.giphy.com/media/l0dJ49ChzUuKU8Ampv/giphy.gif';

export const App = () => {
    const [urls, setUrl] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);

    const getImages = async () => {
        setLoading(true);
        let data = await getAnimalImages(20);
        data = backedReoveDubp(data);
        const newSet = urls.concat(data);
        setUrl(newSet);
        setLoading(false);
    }

    React.useEffect(() => {
        getImages();
    }, []);

    const renderImageList = () => {
        return urls.map((image, index) => {
            return (<ProgressiveImageLoad {...image} key={index} />);
        });
    }

    return (
        <>
            <div className='ImageContiner'>
                <InfinitRender
                    dataLength={urls.length}
                    next={getImages}
                    hasMore={true}
                    loader={<img src={loadingImage} className='loader' />}
                >
                   {!!urls.length && renderImageList()}
                </InfinitRender>
            </div>
        </>
    );
};