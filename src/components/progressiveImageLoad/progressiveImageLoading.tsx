import { h } from "preact";
import { memo, useEffect } from "preact/compat";
const placeHoledrImage =
  "https://media.giphy.com/media/l0dJ49ChzUuKU8Ampv/giphy.gif";
interface Props {
  url: string;
  id: string;
  className?: string;
  root: any;
}

export const ProgressiveImageLoad = memo((props: Props) => {
  let observer = null;
  let element = null;
  useEffect(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries &&
          entries.forEach((entry) => {
            const { isIntersecting } = entry;
            if (isIntersecting && element) {
              element.src = props.url;
            } else {
              if (element) {
                element.src = placeHoledrImage;
              }
            }
          });
      },
      {
        root: props.root,
        rootMargin: "0px 0px 200px 0px",
      }
    );
    observer.observe(element);
    return () => (observer = observer.disconnect());
  }, []);

  return (
    <div className="img-hover-zoom">
      <img
        ref={(el) => (element = el)}
        className={props.className}
        src={placeHoledrImage}
      />
    </div>
  );
});
