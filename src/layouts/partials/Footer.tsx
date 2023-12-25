"use client";

import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light ">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-6 lg:mb-0">
            <ul>
              {menu.footer.map((menu) => (
                <li className="m-3 inline-block" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right"></div>
        </div>
      </div>
      <div className="border-t border-border py-7 ">
        <div className="container text-center text-light ">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;