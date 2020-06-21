
import React, { Component, ReactNode, CSSProperties } from 'react';
import './infinitRenderStyle.scss';
import { throttle } from 'throttle-debounce';


type Fn = () => any;
export interface Props {
    next: Fn;
    hasMore: boolean;
    children: ReactNode;
    loader: ReactNode;
    dataLength: number;
}

interface State {
    showLoader: boolean;
}

export class InfinitRender extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showLoader: false,
        };

        this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(
            this
        );
    }

    private throttledOnScrollListener: (e: MouseEvent) => void;
    private _scrollableNode: HTMLElement | undefined | null;
    private el: HTMLElement | undefined | Window & typeof globalThis;
    private _infScroll: HTMLDivElement | undefined;
    private lastScrollTop = 0;
    private actionTriggered = false;

    private startY = 0;
    private currentY = 0;
    private dragging = false;

    private maxPullDownDistance = 0;

    componentDidMount() {

        this._scrollableNode = null;
        this.el = this._scrollableNode || window;

        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener as EventListenerOrEventListenerObject);
        }
    }

    componentWillUnmount() {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener as EventListenerOrEventListenerObject);
        }
    }

    UNSAFE_componentWillReceiveProps(props: Props) {
        if (this.props.dataLength === props.dataLength)
            return;

        this.actionTriggered = false;
        this.setState({
            showLoader: false,
        });
    }

    getScrollableTarget = () => {
        return null;
    };

    onStart: EventListener = (evt: Event) => {
        if (this.lastScrollTop) return;

        this.dragging = true;

        if (evt instanceof MouseEvent) {
            this.startY = evt.pageY;
        } else if (evt instanceof TouchEvent) {
            this.startY = evt.touches[0].pageY;
        }
        this.currentY = this.startY;

        if (this._infScroll) {
            this._infScroll.style.willChange = 'transform';
            this._infScroll.style.transition = `transform 0.2s cubic-bezier(0,0,0.31,1)`;
        }
    };

    onMove: EventListener = (evt: Event) => {
        if (!this.dragging) return;

        if (evt instanceof MouseEvent) {
            this.currentY = evt.pageY;
        } else if (evt instanceof TouchEvent) {
            this.currentY = evt.touches[0].pageY;
        }

        if (this.currentY < this.startY) return;


        if (this.currentY - this.startY > this.maxPullDownDistance * 1.5) return;

        if (this._infScroll) {
            this._infScroll.style.overflow = 'visible';
            this._infScroll.style.transform = `translate3d(0px, ${this.currentY -
                this.startY}px, 0px)`;
        }
    };

    isElementAtBottom(
        target: HTMLElement,
        scrollThreshold: string | number = 0.8
    ) {
        const clientHeight =
            target === document.body || target === document.documentElement
                ? window.screen.availHeight
                : target.clientHeight;

        const threshold = getScrollPoint(scrollThreshold);

        return (
            target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight
        );
    }

    onScrollListener = (event: MouseEvent) => {


        const target =
            this._scrollableNode
                ? (event.target as HTMLElement)
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;

        if (this.actionTriggered) return;

        const atBottom = this.isElementAtBottom(target, 0.8);

        if (atBottom && this.props.hasMore) {
            this.actionTriggered = true;
            this.setState({ showLoader: true });
            this.props.next && this.props.next();
        }

        this.lastScrollTop = target.scrollTop;
    };

    render() {
        const style = {
            height: 'auto',
            overflow: 'hidden',
        } as CSSProperties;

        return (
            <div
                className="InfinitRender"
            >
                <div
                    className={`InfinitRender__continer`}
                    ref={(infScroll: HTMLDivElement) => (this._infScroll = infScroll)}
                    style={style}
                >
                    {this.props.children}
                    {!this.state.showLoader &&
                        this.props.hasMore &&
                        this.props.loader}
                    {this.state.showLoader && this.props.hasMore && this.props.loader}
                </div>
            </div>
        );
    }
}


export function getScrollPoint(scrollThreshold: string | number) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: 'Percent',
            value: scrollThreshold * 100,
        };
    }
    return {
        unit: 'Percent',
        value: 0.8,
    };
}
