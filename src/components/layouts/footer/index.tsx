import { FC } from "react";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: FC = () => {
  const products = [
    "Use cases",
    "Chrome extension",
    "API docs",
    "Pricing",
    "Video tutorials",
    "Resources",
    "Blog",
    "FAQ",
  ];

  const alsoBuilt = [
    "Resume AI Scanner",
    "Invoice AI Scanner",
    "AI Quiz Generator",
    "QuickyAI",
    "Docsium",
    "PDF GPTs",
    "PDF AI Generator",
    "Other PDF tools",
  ];

  const company = [
    "PDF.ai vs ChatPDF",
    "PDF.ai vs Acrobat Reader",
    "Legal",
    "Affiliate program 💵",
    "Investor",
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-8 mt-8 sm:mt-12 lg:px-8 lg:mt-16 border-t border-gray-900/10 pt-16">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8">
          <Image
            className="h-7"
            src="/icon.ico"
            width="28"
            height="28"
            alt=""
          />
          <div className="text-sm leading-6 text-gray-600 mt-10">
            Chat with any PDF: ask questions, get summaries, find information,
            and more.
          </div>
          <div className="flex space-x-6 text-[22px]">
            <FaTiktok className="text-gray-400 hover:text-gray-500 cursor-pointer" />
            <CiCamera className="text-gray-400 hover:text-gray-500 cursor-pointer" />
            <FaTwitter className="text-gray-400 hover:text-gray-500 cursor-pointer" />
            <FaYoutube className="text-gray-400 hover:text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Products
              </h3>
              <ul role="list" className="mt-6 space-y-4 list-none p-0">
                {products.map((product, index) => (
                  <li
                    key={index}
                    className="p-0 m-0 text-sm leading-6 text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                We also built
              </h3>
              <ul role="list" className="mt-6 space-y-4 list-none p-0">
                {alsoBuilt.map((item, index) => (
                  <li
                    key={index}
                    className="p-0 m-0 text-sm leading-6 text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Company
              </h3>
              <ul role="list" className="mt-6 space-y-4 list-none p-0">
                {company.map((item, index) => (
                  <li
                    key={index}
                    className="p-0 m-0 text-sm leading-6 text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
