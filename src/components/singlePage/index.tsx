// "use client";
import { FC, memo, useMemo, useState } from "react";
import { Page } from "react-pdf";
import { TbRefresh } from "react-icons/tb";

interface SinglePageProps {
  index: number;
  zoom: number;
  rotation: number;
  handleRotation: (index: number) => void;
}

const SinglePage: FC<SinglePageProps> = memo(
  ({ index, zoom, rotation, handleRotation }) => {
    // const [baseWidth] = useState(200);

    // const pageWidth = useMemo(() => {
    //   return baseWidth * (zoom / 200);
    // }, [baseWidth, zoom]);
    // const pageWidth = 612;

    return (
      <div
        key={`page_${index + 1}`}
        className="m-3"
        style={{
          flex: `0 0 ${zoom}px`,
          maxWidth: `${zoom}px`,
          // maxHeight: `${1.44 * zoom}px`,
        }} //源代码用的是这个，page组件的宽度是固定的，这个改成transform防止reflow，repaint。寄了，用缩放scale会影响flex布局
        onClick={() => handleRotation(index)}
      >
        <div
          className="relative cursor-pointer pdf-page size-full"
          data-page-num={index}
        >
          <div className=" absolute top-1 right-1 z-10 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white duration-200">
            <TbRefresh className="text-[#fff]" />
          </div>
          <div className="size-full overflow-hidden transition-transform">
            <div className="relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50">
              <Page
                className={`pointer-events-none w-full shrink`}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={index + 1}
                // width={pageWidth}
                loading={"loading..."}
                canvasBackground="transparent"
                canvasRef={(canvas) => {
                  // console.log("canvas", index, !!canvas);

                  if (canvas) {
                    canvas.style.imageRendering = "optimizeQuality";
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    canvas.style.objectFit = "contain";
                    canvas.style.transitionProperty = "transform";
                    canvas.style.transitionTimingFunction =
                      "cubic-bezier(0.4, 0, 0.2, 1)";
                    canvas.style.transitionDuration = "150ms";
                    canvas.style.transform = `rotate(${rotation}deg)`;
                    canvas.style.transformOrigin = "center";
                  }
                }}
              />
              <div className="w-full text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">
                {index + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SinglePage.displayName = "SinglePage";

export default SinglePage;
