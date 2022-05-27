import { animated, useSpring } from '@react-spring/web';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { interpolate } from '../util/flubber';

interface IconMorphProps {
  icon: React.FC<any>;
  width?: string;
  viewBox?: string;
  color?: string;
  speed?: number;
}

type SVGPath = { d: string; fill?: string };

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  ReactDOM.createPortal(children, document.body);

const IconMorph = (props: IconMorphProps) => {
  const { icon, color, width = "15", viewBox = "0 0 15 15", speed = 2 } = props;

  const [ready, setReady] = useState(false);

  const [prevPath, setPrevPath] = useState<SVGPath>();
  const [nextPath, setNextPath] = useState<SVGPath>();

  const [PrevIcon, setPrevIcon] = useState<typeof icon>(icon);
  const [NextIcon, setNextIcon] = useState<typeof icon>(icon);

  const prevSVG = useCallback((node: SVGSVGElement) => {
    if (!node) return;
    let fill = node.getAttribute("fill") ?? undefined;
    fill = fill === "none" ? undefined : fill;

    const path = node.getElementsByTagName("path")[0] as SVGPathElement;
    const d = path.getAttribute("d")!;
    fill = fill ?? path.getAttribute("fill") ?? "currentColor";

    setPrevPath({ d, fill });
  }, []);
  const nextSVG = useCallback((node: SVGSVGElement) => {
    if (!node) return;
    let fill = node.getAttribute("fill") ?? undefined;
    fill = fill === "none" ? undefined : fill;

    const path = node.getElementsByTagName("path")[0] as SVGPathElement;
    const d = path.getAttribute("d")!;
    fill = fill ?? path.getAttribute("fill") ?? "currentColor";

    setNextPath({ d, fill });
  }, []);
  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    if (NextIcon !== icon) {
      setNextIcon(icon);
    }
  }, [NextIcon, icon]);

  useEffect(() => {
    if (prevPath && nextPath) setReady(true);
  }, [prevPath, nextPath]);
  /* -------------------------------- useSpring ------------------------------- */
  const interp =
    ready && interpolate(prevPath!.d, nextPath!.d, { maxSegmentLength: speed });

  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    onRest: () => {
      if (PrevIcon !== NextIcon) setPrevIcon(NextIcon);
    },
    reset: true,
    config: { precision: 0.0001 },
  });

  return (
    <>
      <Portal>
        <div style={{ visibility: "hidden", position: "absolute" }}>
          {PrevIcon && (
            <PrevIcon
              style={{ visibility: "hidden", position: "absolute" }}
              ref={prevSVG}
              color={ready ? undefined : color}
            />
          )}
          {NextIcon && (
            <NextIcon
              style={{ visibility: "hidden", position: "absolute" }}
              ref={nextSVG}
              color={color}
            />
          )}
        </div>
      </Portal>
      {ready && PrevIcon !== NextIcon ? (
        <>
          {interp && (
            <svg
              width={width}
              height={width}
              viewBox={viewBox}
              fill={"none"}
              xmlns={"http://www.w3.org/2000/svg"}
            >
              <animated.path
                d={t.to(interp)}
                fill={nextPath!.fill}
                fillRule={"evenodd"}
                clipRule={"evenodd"}
              />
            </svg>
          )}
        </>
      ) : (
        <>
          <PrevIcon
            width={width}
            height={width}
            viewBox={viewBox}
            color={color}
          />
        </>
      )}
    </>
  );
};
export default React.memo(IconMorph);
