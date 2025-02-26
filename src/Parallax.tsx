import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useLayoutEffect, useRef } from "react";
import "./Parallax.css"; // 引入 CSS

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const Parallax = () => {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useLayoutEffect(() => {
    const scrollContainer = document.querySelector(
      "[data-scroll-container]"
    ) as HTMLElement;
    if (!scrollContainer) {
      console.error("Scroll container not found");
      return;
    }

    scrollRef.current = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]") as HTMLElement,
      smooth: true,
      lerp: 0.1, // 平滑滚动的强度
      multiplier: 0.1, // 滚动速度
      class: "is-inview", // 当元素进入视口时添加的类
    });

    // 更新 ScrollTrigger 每次滚动时
    scrollRef.current.on("scroll", ScrollTrigger.update);

    // 确保 ScrollTrigger 与 Locomotive Scroll 集成
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? scrollRef.current?.scrollTo({ y: value, duration: 1 })
          : (scrollRef.current as any).scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (
        document.querySelector("[data-scroll-container]") as HTMLElement
      )?.style.transform
        ? "transform"
        : "fixed",
    });

    // 刷新 ScrollTrigger
    ScrollTrigger.refresh();

    if (parallaxRef.current) {
      // 动画效果 for middleBox
      gsap.fromTo(
        ".middleBox",
        { y: "-160vh" }, // 初始状态
        {
          y: "160vh",
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            scroller: "[data-scroll-container]",
            start: "top 100%", // 视口中心时开始动画
            end: "bottom 0%", // 视口中心时结束动画
            scrub: true, // 平滑滚动
          },
        }
      );

      // 动画效果 for sideBox
      gsap.fromTo(
        ".sideBox",
        { y: "40vh" }, // 初始状态
        {
          y: "-40vh",
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            scroller: "[data-scroll-container]",
            start: "top 100%", // 视口中心时开始动画
            end: "bottom 0%", // 视口中心时结束动画
            scrub: true, // 平滑滚动
          },
        }
      );
    }

    // 清理函数
    return () => {
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div data-scroll-container>
      <div data-scroll>
        <div className="parallax-container">
          <div
            className="parallax-section top-section"
            data-scroll
            data-scroll-speed="100"
          >
            <h1>Scroll Down</h1>
          </div>

          <div className="parallax-content content1" ref={parallaxRef}>
            <div className="moveBoxes">
              <div className="sideBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
              <div className="middleBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
              <div className="sideBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
            </div>
          </div>
          <div className="parallax-content content2">
            <div className="moveBoxesDown">
              <div className="evenBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
              <div className="oddBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
              <div className="evenBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
              <div className="oddBox">
                <div className="innerBox"></div>
                <div className="innerBox"></div>
                <div className="innerBox"></div>
              </div>
            </div>
          </div>
          <div
            className="parallax-section bottom-section"
            data-scroll
            data-scroll-speed="35"
          >
            <h1>Another Big Picture</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
