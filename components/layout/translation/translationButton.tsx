import { useState } from "react";

export default function TranslationButton(): JSX.Element{ 
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div className="flex items-center cursor-pointer" onClick={()=>setShowModal(true)}>
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
    
    </>
  );
}