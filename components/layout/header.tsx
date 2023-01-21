import PageHeader from "antd/lib/page-header";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import Link from "next/link";
import { useState } from "react";
import "../../assets/global.less";
import "../../assets/tailwind.less";
import "./header.less";

const Header = ({ handleContactClick = null }) => {
	const [brume, setBrume] = useState(false);

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white h-[90px] shadow drop-shadow-md text-[14px]">
        <div>
          <img
            className="w-[250px] mb-2"
            src="static/img/logo.png"
            alt="logo"
          />
        </div>
        <div className="flex justify-end gap-[21px] text-[#707070] text-[14px]">
          <div className="flex gap-[21px] text-[#126E6E] font-medium">
            <div className="cursor-pointer hover:text-[#0b2b2b]">
              Mis reservas
            </div>
            <div className="cursor-pointer hover:text-[#0b2b2b]">Ayuda</div>
            <div className="cursor-pointer hover:text-[#0b2b2b]">Mi perfil</div>
          </div>
          <div>|</div>
          <div className="flex items-center">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  id="Icon_material-language"
                  data-name="Icon material-language"
                  d="M10.992,3A8,8,0,1,0,19,11,8,8,0,0,0,10.992,3Zm5.544,4.8h-2.36a12.519,12.519,0,0,0-1.1-2.848A6.424,6.424,0,0,1,16.536,7.8ZM11,4.632A11.269,11.269,0,0,1,12.528,7.8H9.472A11.269,11.269,0,0,1,11,4.632ZM4.808,12.6a6.258,6.258,0,0,1,0-3.2h2.7A13.212,13.212,0,0,0,7.4,11a13.212,13.212,0,0,0,.112,1.6Zm.656,1.6h2.36a12.519,12.519,0,0,0,1.1,2.848A6.389,6.389,0,0,1,5.464,14.2Zm2.36-6.4H5.464A6.389,6.389,0,0,1,8.928,4.952,12.519,12.519,0,0,0,7.824,7.8ZM11,17.368A11.269,11.269,0,0,1,9.472,14.2h3.056A11.269,11.269,0,0,1,11,17.368ZM12.872,12.6H9.128A11.77,11.77,0,0,1,9,11a11.668,11.668,0,0,1,.128-1.6h3.744A11.668,11.668,0,0,1,13,11,11.77,11.77,0,0,1,12.872,12.6Zm.2,4.448a12.519,12.519,0,0,0,1.1-2.848h2.36a6.424,6.424,0,0,1-3.464,2.848ZM14.488,12.6A13.212,13.212,0,0,0,14.6,11a13.213,13.213,0,0,0-.112-1.6h2.7a6.258,6.258,0,0,1,0,3.2Z"
                  transform="translate(-3 -3)"
                  fill="#707070"
                />
              </svg>
            </div>
            <div className="mr-1">Español</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16"
                height="16"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-1 font-medium">$</div>
            <div className="mr-1">COP</div>
            <div className="bandera-colombia text-transparent mr-1">Col</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16"
                height="16"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
		</div>
	);
};

export default Header;
