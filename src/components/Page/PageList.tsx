
import * as React from "react";
import { Image } from "../image";
import { Page } from './Page';

const MAX_IMAGES_PER_PAGE = 20;

export const PageList = (props) => {
    const renderImageList = (images) => {
        const pages = [];
        if (images.length < MAX_IMAGES_PER_PAGE) {
            const page = images.map((image, index) => {
                return <Image {...image} key={index} />;
            });
            return <Page items={page} id={0} key={0} />;
        }

        let count = 0;
        let id = 0;
        let list = [];
        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            const imageEl = <Image {...image} key={index} />;
            list.push(imageEl);
            count++;
            if (count === MAX_IMAGES_PER_PAGE) {
                const p = <Page items={list} id={id} key={id} />;
                id++;
                pages.push(p);
                count = 0;
                list = [];
            }
        }
        return pages;
    };

    return (
        <>
            {renderImageList(props.images)}
        </>
    );
}
