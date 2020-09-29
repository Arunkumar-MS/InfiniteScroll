import React, { CSSProperties } from "react";
import "./infinitRenderStyle.scss";
import { throttle } from "throttle-debounce";
import { getAnimalImages } from "../service";
import { removeDuplicate } from "../helpers/removeDuplicates";
import { PageList } from "./Page/PageList";
const removeDuplicates = removeDuplicate();


export const InfinitRender = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const onScrollListener = (e: any) => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrolled > 70 && !showLoader) {
      setShowLoader((loader) => {
        !loader && getAnimalImages(20).then((data) => {
          data = removeDuplicates(data);
          setImages((img) => img.concat(data));
          setShowLoader(false);
        });
        return true;
      });
    }
  };

  const onScroll = throttle(200, false, onScrollListener, true);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    getAnimalImages(30).then((data) => {
      removeDuplicates(data);
      setImages(data);
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!!images.length && <PageList images={images} />}
      {(!images.length || showLoader) && (
        <div className="LoadingInfo">
          <div className="lds-dual-ring"></div>
        </div>
      )}
    </>
  );
}
