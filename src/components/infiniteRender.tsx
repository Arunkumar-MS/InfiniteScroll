import React, { CSSProperties } from "react";
import "./infinitRenderStyle.scss";
import { throttle } from "throttle-debounce";
import { getAnimalImages } from "../service";
import { ProgressiveImageLoad } from "./progressiveImageLoad";
import { removeDuplicate } from "../helpers/removeDuplicates";
const removeDuplicates = removeDuplicate();

interface State {
  showLoader: boolean;
  images: any[];
}

export class InfinitRender extends React.PureComponent<{}, State> {
  root: Document = null;
  initalRender: boolean = true;
  public constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      images: [],
    };
    this.root = document;
    this.initalRender = true;
  }

  private onScrollListener = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !this.state.showLoader) {
      this.updateImages()
    }
  };

  private updateImages = async () => {
    this.setState({ showLoader: true });
    let data = await getAnimalImages(20);
    data = this.state.images.concat(removeDuplicates(data));
    this.initalRender = false;
    this.setState({ showLoader: false, images: data });
  }

  private onScroll = throttle(200, this.onScrollListener);

  public componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    this.updateImages();
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  private renderImageList = () => {
    return this.state.images.map((image, index) => {
      return <ProgressiveImageLoad {...image} key={index} root={this.root} />;
    });
  };
  public render() {
    if (!this.initalRender && this.state.images.length < 25) {
      this.updateImages();
    }
    const style = {
      height: "auto",
      overflow: "hidden",
    } as CSSProperties;

    return (
      <>
        <div className="ImageContiner">
          <div className="InfinitRender">
            <div className={`InfinitRender__continer`} style={style}>
              {!!this.state.images.length && this.renderImageList()}
            </div>
          </div>
        </div>
        {(this.initalRender || this.state.showLoader) && (
          <div className="LoadingInfo">
            <div className="lds-dual-ring"></div>
          </div>
        )}
      </>
    );
  }
}
