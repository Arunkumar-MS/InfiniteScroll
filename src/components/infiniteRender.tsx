import { h } from 'preact';
import { PureComponent } from 'preact/compat';
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

export class InfinitRender extends PureComponent<{}, State> {
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
      this.setState({ showLoader: true });
      let data = await getAnimalImages(20);
      data = this.state.images.concat(removeDuplicates(data));
      this.setState({ showLoader: false, images: data });
    }
  };

  private onScroll = throttle(200, this.onScrollListener);

  public componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    getAnimalImages(20).then((data) => {
      removeDuplicates(data);
      this.setState((prevState) => ({ showLoader: false, images: data }));
      this.initalRender = false;
    });
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
    const style = {
      height: "auto",
      overflow: "hidden",
    } as any;

    return (
      <div>
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
      </div>
    );
  }
}
