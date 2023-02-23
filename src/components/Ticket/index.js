import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./index.module.css";
// import TicketFirstImg from '@/asset/ticket-first.png'

export default function Ticket() {
  const [startAnim, setStartAnim] = useState(false);
  const [endAnim, setEndAnim] = useState(false);
  // const [touchStartX, setTouchStartX] = useState(undefined)
  const touchStartXRef = useRef(undefined);

  const onTouchMove = useCallback((evt) => {
    const { touches } = evt;
    if (!touches || !touches[0]) {
      console.log("Cannot get the touches on move");
      return;
    }
    const movingTouchX = touches[0].clientX;
    if (movingTouchX - touchStartXRef.current > 100) {
      console.log(
        "fingers from left to right: ",
        movingTouchX - touchStartXRef.current
      );
      setStartAnim(true);
    }
  }, []);

  const onAnimEnd = () => {
    console.log("----- animation end -----");
    document.removeEventListener("touchmove", onTouchMove);
    setEndAnim(true);
  };

  const onTouchStart = useCallback((evt) => {
    const { touches } = evt;
    if (!touches || !touches[0]) {
      console.log("Cannot get the touches");
      return;
    }
    console.log("touch start, coordinates: ", touches[0], " -  ", endAnim);
    touchStartXRef.current = touches[0].clientX || undefined;
    !endAnim && document.addEventListener("touchmove", onTouchMove);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.body} ${styles.backgroundImg}`}>
        {/* <img src={TicketFirstImg} /> */}
      </div>
      <div className={styles.footerWrapper}>
        <div
          className={`${styles.footer} ${startAnim ? styles.transStart : ""} ${
            styles.backgroundImg
          }`}
          onTouchStart={endAnim ? undefined : onTouchStart}
          // onTouchMove={endAnim ? }
        >
          {/* ${styles.transStart} */}
          <div
            className={`${styles.footerInner} ${
              startAnim ? styles.transEnd : ""
            } ${styles.backgroundImg}`}
            onAnimationEnd={onAnimEnd}
          ></div>
        </div>
      </div>
    </div>
  );
}
