export default function ModalTranslator({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) { 
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-[#303030] bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[999]">
      <div className="w-[500px] bg-white p-6 rounded-[10px]">
        <div className="flex items-center justify-between mb-[30px]">
          <div className="text-[#323237] text-[16px] font-semibold">Selecciona una moneda e idioma</div>
          <div className="cursor-pointer p-1" onClick={()=>onClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0,0,256,256"
              >
              <g
                fill="#707070"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(10.66667,10.66667)">
                  <path d="M4.70703,3.29297l-1.41406,1.41406l7.29297,7.29297l-7.29297,7.29297l1.41406,1.41406l7.29297,-7.29297l7.29297,7.29297l1.41406,-1.41406l-7.29297,-7.29297l7.29297,-7.29297l-1.41406,-1.41406l-7.29297,7.29297z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className=" w-full mt-4">
            <div>
                <label className="block mb-1 text-sm font-normal text-[#1D1D1D]">Elige un idioma</label>
                <select id="countries" className="bg-[#F1F2F6] text-gray-900 text-sm rounded-lg border-none focus:ring-[#EF4060] focus:border-[#EF4060] block w-full p-2.5">
                    <option selected>Selecciona una opción</option>
                    <option value="ES">Español</option>
                    <option value="EN">Ingles</option>
                    <option value="FR">Franceś</option>
                    <option value="PT">Portugués</option>
                </select>
            </div>
        </div>
        <div className=" w-full mt-4">
            <div>
                <label className="block mb-1 text-sm font-normal text-[#1D1D1D]">Elige una moneda</label>
                <select id="countries" className="bg-[#F1F2F6] text-gray-900 text-sm rounded-lg border-none focus:ring-[#EF4060] focus:border-[#EF4060] block w-full p-2.5">
                    <option selected>Selecciona una opción</option>
                    <option value="COP">🇨🇴 Colombia - Cop</option>
                    <option value="USD">🇺🇸 USA - USD</option>
                </select>
            </div>
        </div>

        <div className="py-10 flex items-center justify-center">
          <div>
            <button className="w-[216px] h-[48px] text-[14px] font-medium text-white flex justify-center items-center bg-[#EF4060] hvr-grow rounded-md">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
