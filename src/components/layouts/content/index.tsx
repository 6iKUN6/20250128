"use client";
import Head from "next/head";
import { FC, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import PdfComp from "@/components/pdf";

const Content: FC = () => {
  const [file, setFile] = useState<File>();
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const removePdfFile = () => {
    setFile(undefined);
  };

  return (
    <>
      <Head>
        <title>PDF 页面旋转工具</title>
        <meta
          name="description"
          content="轻松旋转 PDF 页面，支持单页和全部页面的旋转，快速、安全、用户友好。"
        />
        <meta name="keywords" content="PDF, 页面旋转, 在线工具" />
      </Head>
      <div className="container mx-auto py-20 space-y-5">
        <div className="flex flex-col text-center !mb-10 space-y-5">
          <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
          <p className="mt-2 text-gray-600 max-w-lg mx-auto">
            Simply click on a page to rotate it. You can then download your
            modified PDF.
          </p>
        </div>
        <div className="w-full flex justify-center">
          {file ? (
            <PdfComp pdfFile={file} onRemoveFile={removePdfFile} />
          ) : (
            <div className="h-[350px] relative text-center w-[275px]">
              <input
                type="file"
                className="cursor-pointer hidden"
                id="input-file-upload"
                accept=".pdf"
                onChange={uploadFile}
              />
              <label
                className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
                htmlFor="input-file-upload"
              >
                <div className="cursor-pointer flex flex-col items-center space-y-3">
                  <IoCloudUploadOutline className="text-[22px]" />
                  <p className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">
                    Click to upload or drag and drop
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
