
import React from "react";

import { useState } from "react";

export default function TabComponent() {
    const [openTab, setOpenTab] = useState(1);

    return (    
        <div>
            <div className="mt-12 bg-slate-300">
                <div className="flex flex-col items-center !justify-start max-w-xl">
                    <ul className="flex space-x-2">
                        <li>
                            <a
                                href="#vuelos"
                                onClick={() => setOpenTab(1)}
                                className={` ${openTab === 1 ? "bg-purple-600 !text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}
                            >
                                Vuelos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setOpenTab(2)}
                                className={` ${openTab === 2 ? "bg-purple-600 !text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}


                            >
                                Paquetes
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setOpenTab(3)}
                                className={` ${openTab === 3 ? "bg-purple-600 !text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}


                            >
                                Hoteles
                            </a>
                        </li>
                    </ul>
                    <div className="p-3 mt-6 bg-white">
                        <div className={openTab === 1 ? "block" : "hidden"}>
                            
                            Contenido vuelos
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                            Contenido paquetes
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"}>
                            Contenido Hoteles
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
