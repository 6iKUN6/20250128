"use client";
import { FC, useCallback, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { RxZoomIn, RxZoomOut } from "react-icons/rx";
import { PDFDocument, degrees } from "pdf-lib";
import SinglePage from "../singlePage";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjsdist@${pdfjs.version}/build/pdf.worker.min.mjs`;
console.log("pdfjs.version", pdfjs.version);

interface PdfCompProps {
  pdfFile: File;
  onRemoveFile: () => void;
}

const zoomValue = {
  min: 100,
  max: 500,
  step: 50,
};

const options = {
  cMapUrl: "/cmaps/",
};

const PdfComp: FC<PdfCompProps> = ({ pdfFile, onRemoveFile }) => {
  // console.log("pdfFile", pdfFile);

  const [numPages, setNumPages] = useState<number | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(612);
  const [loadDone, setLoadDone] = useState<boolean>(false);
  const [rotations, setRotations] = useState<number[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    console.log("success");
    setRotations(Array.from({ length: numPages }, () => 0));
    setLoadDone(true);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error while loading document! ", error);
  };

  const onZoomIn = useCallback(() => {
    if (zoom < zoomValue.max) {
      setZoom(zoom + zoomValue.step);
    }
  }, [zoom]);
  const onZoomOut = useCallback(() => {
    if (zoom > zoomValue.min) {
      setZoom(zoom - zoomValue.step);
    }
  }, [zoom]);

  const rotateAll = useCallback(() => {
    setRotations((prevRotations) =>
      prevRotations.map((rotation) => {
        const newRotation = rotation + 90;
        // return newRotation >= 360 ? 0 : newRotation;
        return newRotation;
      })
    );
  }, []);

  const rotateItem = useCallback((index: number) => {
    setRotations((prevRotations) =>
      prevRotations.map((rotation, i) => {
        if (i === index) {
          const newRotation = rotation + 90;
          return newRotation;
          // return newRotation >= 360 ? 0 : newRotation;
        }
        return rotation;
      })
    );
  }, []);

  const handleDownload = async () => {
    try {
      // 将File对象转换为ArrayBuffer
      const arrayBuffer = await pdfFile.arrayBuffer();
      // 加载PDF文档
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      // 获取所有页面
      const pages = pdfDoc.getPages();
      // 应用旋转到每一页
      pages.forEach((page, index) => {
        const userRotation = rotations[index] || 0;
        // 转换为PDF逆时针角度（用户界面为顺时针）
        const pdfRotation = (360 - (userRotation % 360)) % 360;
        page.setRotation(degrees(pdfRotation));
      });
      // 生成修改后的PDF字节
      const pdfBytes = await pdfDoc.save();
      // 创建并触发下载
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name.replace(/\.pdf$/i, "_rotated.pdf");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("下载失败:", error);
      alert("下载失败，请重试。");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center space-x-3 selecto-ignore">
        <button
          className="bg-[#ff612f] text-[#fff] rounded px-[12px] py-[10px]"
          onClick={rotateAll}
        >
          Rotate all
        </button>
        <button
          className="bg-[#1f2937] text-[#fff] rounded px-[12px] py-[10px]"
          onClick={onRemoveFile}
        >
          Remote PDF
        </button>
        <button
          className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
          onClick={onZoomIn}
          disabled={zoom >= zoomValue.max}
        >
          <RxZoomIn className="text-[20px]" />
        </button>
        <button
          className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
          onClick={onZoomOut}
          disabled={zoom <= zoomValue.min}
        >
          <RxZoomOut className="text-[20px]" />
        </button>
      </div>
      <Document
        options={options}
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        className="flex flex-wrap justify-center gap-6 select-none mt-10"
        loading={
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#1f1f1f]"></div>
          </div>
        }
      >
        {loadDone
          ? Array.from(new Array(numPages || 0), (el, index) => (
              <SinglePage
                index={index}
                key={index}
                zoom={zoom}
                rotation={rotations[index]}
                handleRotation={rotateItem}
              />
            ))
          : null}
      </Document>
      <button
        className={`mt-10 mb-0 mx-auto block text-center bg-[#ff612f] text-[#fff] rounded px-[12px] py-[10px] ${
          pdfFile && loadDone ? "" : "hidden"
        }`}
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default PdfComp;
