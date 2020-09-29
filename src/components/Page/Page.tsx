
import * as React from "react";
import { useInView } from "react-intersection-observer";

export const Page = (props) => {
    const { ref, inView } = useInView({
      threshold: 0,
    });
    const className = 'Pages';
    return (
      <ul key={props.id} ref={ref} className={className}>
        {inView && props.items}
        {!inView && <div style={{ height: "1000px" }}> </div>}
      </ul>
    );
  }