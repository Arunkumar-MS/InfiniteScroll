import * as React from "react";
import { useInView } from "react-intersection-observer";
interface Props {
    url: string;
}

const placeHoledrImage =
    "https://media.giphy.com/media/l0dJ49ChzUuKU8Ampv/giphy.gif";

export const Image: React.FC<Props> = React.memo((props) => {
    let observer = null;
    let element = null;
    React.useEffect(() => {
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
          root: window.document.body,
          rootMargin: "0px 0px 200px 0px",
        }
      );
      observer.observe(element);
      return () => (observer = observer.disconnect());
    }, []);

    return (
        <li>
            <img
                ref={(el) => (element = el)}
                src={placeHoledrImage}
            />
        </li>
    );
});
