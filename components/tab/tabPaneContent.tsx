import React from "react";
import Image from "next/image";
import { useState } from "react";

//images
import ImageBgSectionBusqueda from "public/static/img/home/banner/bg-section-busqueda.webp";

export default function TabPaneComponent() {
    const [openTab, setOpenTab] = useState(1);
  return(
    <div>
        {/** Tabs botonera servicios */}
      <nav className="h-[74px] gap-[32px] px-6 sm:px-6 lg:px-8 flex items-center justify-start my-4 verflow-x-auto">
        
        {/**Card tab vuelos */}
        <a href="#vuelos" onClick={() => setOpenTab(1)}
        className={`${openTab === 1 ? "bg-[#EF4060] text-white " : ""} w-[103px] h-[74px]  flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow `}>
        <div className="">
          <div className="mb-3">
            {/**Icono Vuelos */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28.001"
              height="28"
              viewBox="0 0 28.001 28"
            >
              <g
                id="avion_2-02"
                data-name="avion 2-02"
                transform="translate(-3.69)"
              >
                <path
                  id="Trazado_2258"
                  data-name="Trazado 2258"
                  d="M31.762,0A7.3,7.3,0,0,1,30.11,4.941c-.175.211-.367.4-.561.6q-8,8.006-16.012,16.008a.661.661,0,0,0-.213.5c-.027,1.577-.065,3.154-.1,4.728a.345.345,0,0,1-.058.225c-.311.33-.634.647-.987,1-.065-.152-.115-.265-.161-.378-.726-1.787-1.456-3.573-2.175-5.362a.566.566,0,0,0-.346-.344Q6.773,20.821,4.057,19.71c-.083-.033-.163-.071-.277-.119.346-.35.674-.688,1.012-1.014.042-.042.136-.038.206-.038,1.577-.035,3.151-.073,4.728-.1a.631.631,0,0,0,.478-.2Q18.163,10.272,26.126,2.3A7.332,7.332,0,0,1,30.758.044.568.568,0,0,0,30.886,0h.876Z"
                  transform="translate(-0.071)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2259"
                  data-name="Trazado 2259"
                  d="M3.69,46.589c.325-.315.655-.626.976-.945.53-.526,1.055-1.055,1.566-1.564q.585.588,1.126,1.137c-.811.811-1.656,1.652-2.515,2.511L3.69,46.645v-.054Z"
                  transform="translate(0 -34.886)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2260"
                  data-name="Trazado 2260"
                  d="M22.194,8.588c-1.548,1.548-3.072,3.072-4.624,4.622L5.88,6.321c.169-.154.317-.282.455-.419.48-.476.962-.947,1.427-1.433a.412.412,0,0,1,.492-.129c1.082.344,2.173.665,3.26,1a.374.374,0,0,0,.451-.113c.263-.29.544-.563.83-.83a1.827,1.827,0,0,1,2.353-.2,1.852,1.852,0,0,1,.619,2.284c-.015.033-.025.067-.048.131q3.238.989,6.474,1.973Z"
                  transform="translate(-1.733 -3.057)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2261"
                  data-name="Trazado 2261"
                  d="M89.24,58.452l4.622-4.622q.989,3.238,1.975,6.476a1.866,1.866,0,0,1,2.257.382,1.817,1.817,0,0,1,.035,2.461c-.286.319-.588.622-.9.914a.373.373,0,0,0-.117.448c.344,1.093.67,2.192,1.014,3.285a.38.38,0,0,1-.115.448c-.628.609-1.241,1.233-1.888,1.879L89.244,58.452Z"
                  transform="translate(-67.707 -42.603)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2262"
                  data-name="Trazado 2262"
                  d="M77.51,120.187l-1.07-1.07,2.517-2.517c.352.352.724.726,1.072,1.072C79.2,118.5,78.353,119.345,77.51,120.187Z"
                  transform="translate(-57.577 -92.281)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2263"
                  data-name="Trazado 2263"
                  d="M25.9,54.38c.361.361.738.736,1.1,1.1l-1.9,1.908-1.1-1.1c.615-.617,1.266-1.27,1.9-1.906Z"
                  transform="translate(-16.074 -43.038)"
                  fill="#fff"
                />
                <path
                  id="Trazado_2264"
                  data-name="Trazado 2264"
                  d="M71.09,99.66l1.07,1.07L70.2,102.649c-.334-.334-.7-.707-1.053-1.053.644-.644,1.3-1.3,1.94-1.933Z"
                  transform="translate(-51.807 -78.874)"
                  fill="#fff"
                />
              </g>
            </svg>
            {/**Icono Vuelos end*/}
          </div>
          <div>Vuelos</div>
        </div>
        </a>
        {/**Card tab paquetes */}
        <div className="w-[103px] h-[74px] flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow bg-[#ffffff] text-[#707070] hover:border-2 hover:border-[#EF4060]">
          <div className="mb-3">
            {/**Icono paquetes */}
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="32.637"
              height="30.178"
              viewBox="0 0 32.637 30.178"
            >
              <g
                id="avion_2-02-02"
                data-name="avion 2-02-02"
                transform="translate(-1.719 0.003)"
              >
                <path
                  id="Trazado_2268"
                  data-name="Trazado 2268"
                  d="M70.656,51.7c-.081-3.069-.02-6.146-.025-9.217a3.672,3.672,0,0,0-.066-.856,3.148,3.148,0,0,0-2.478-2.387,9.44,9.44,0,0,0-1.89-.153c-.559-.022-1.12,0-1.7,0V38.072a2.679,2.679,0,0,0-2.825-2.823c-.935,0-1.873,0-2.808,0a3.288,3.288,0,0,0-.679.054,2.651,2.651,0,0,0-2.126,2.56c-.012.4,0,.8,0,1.223-1.144,0-2.225-.007-3.305,0a2.817,2.817,0,0,0-2.872,2.894c.049,3.48.015,6.96.015,10.44a2.6,2.6,0,0,0,1.969,2.638,7.522,7.522,0,0,0,1.494.155c.377.022.756,0,1.125,0,.074,1.012.4,1.494,1.063,1.511a1.533,1.533,0,0,0,.775-.2,1.262,1.262,0,0,0,.492-1.29h6.882c.14,1.078.46,1.491,1.154,1.509.719.017,1.036-.372,1.228-1.533.384,0,.778.015,1.169,0A3.429,3.429,0,0,0,70.661,51.7ZM58.382,37.855a.489.489,0,0,1,.372-.29c1.007-.025,2.016-.015,3.025-.012a.372.372,0,0,1,.409.4c.007.359,0,.716,0,1.112H58.365a10.458,10.458,0,0,1,.017-1.213Z"
                  transform="translate(-36.306 -26.573)"
                  fill="#ccc"
                />
                <path
                  id="Trazado_2269"
                  data-name="Trazado 2269"
                  d="M16.039,11.738a24.781,24.781,0,0,1,2.872-.1c.153,0,.3,0,.458,0a4.165,4.165,0,0,0-.635-2.973,3.7,3.7,0,0,0-3.18-1.491V3.025a5.3,5.3,0,0,0-.052-.763A2.659,2.659,0,0,0,12.834,0C11.3.032,9.763.008,8.224.005A2.438,2.438,0,0,0,5.869,1.482a3.431,3.431,0,0,0-.3,1.376c-.032,1.878-.012,2.033-.012,3.911v.4c-.32.025-.586.027-.844.071a3.492,3.492,0,0,0-2.99,3.52c-.01,2.944,0,5.89,0,8.833,0,2.075-.007,4.15,0,6.224a2.788,2.788,0,0,0,2.122,2.774c.3.081.608.1.913.155.118.994.438,1.427,1.117,1.423a1.558,1.558,0,0,0,.765-.226c.448-.273.468-.746.45-1.245h6.33a4.134,4.134,0,0,1-.948-3.138c0-3.246.03-6.493-.01-9.737a4.126,4.126,0,0,1,3.576-4.081ZM13.248,6.926c0,.069-.01.135-.02.246H7.885c-.007-.118-.02-.229-.02-.34V2.922c0-.625.069-.687.721-.687h4.105c.4,0,.5.089.551.47a1.364,1.364,0,0,1,.007.175V6.929Z"
                  fill="#ccc"
                />
              </g>
            </svg>
            {/**Icono paquetes end*/}
          </div>
          <div>Paquetes</div>
        </div>
        {/**Card tab Hoteles */}
        <div className="w-[103px] h-[74px] flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow bg-[#ffffff] text-[#707070] hover:border-2 hover:border-[#EF4060]">
          <div className="mb-3">
            {/**Icono Hoteles */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28.628"
              height="28.797"
              viewBox="0 0 28.628 28.797"
            >
              <path
                id="Hotel-02"
                d="M1.177,26.766V7.929A2.363,2.363,0,0,1,3.758,5.36H5.194V26.773H6.533V2.562A2.342,2.342,0,0,1,7.968.2,2.544,2.544,0,0,1,8.94.013q5.31-.021,10.617,0a2.318,2.318,0,0,1,2.4,2.4c.014.994,0,1.99,0,2.983V26.768h1.322V5.308a16.294,16.294,0,0,1,2.384.183,2.22,2.22,0,0,1,1.649,2.286q0,4.993,0,9.985v9.029c.136,0,.242-.007.343,0a1,1,0,0,1,.989,1.043.979.979,0,0,1-1.029.961c-1.642.007-3.286,0-4.928,0H5.762c-1.569,0-3.141,0-4.71,0A.988.988,0,0,1,.047,27.557a.946.946,0,0,1,.709-.723c.129-.035.265-.047.423-.073Zm14.754-7.329v7.338h1.98a1.776,1.776,0,0,0,.023-.2c0-2.481.009-4.961,0-7.442a1.665,1.665,0,0,0-1.769-1.715c-1.245,0-2.492,0-3.737,0a1.7,1.7,0,0,0-1.872,1.867v7.481h2.022V19.439h3.354ZM11.59,5a3.065,3.065,0,0,0-.672.117c-.322.136-.373.446-.366.768.012.39-.092.848.359,1.052a1.553,1.553,0,0,0,1.308,0c.484-.228.319-.716.343-1.118a.639.639,0,0,0-.359-.7A2.983,2.983,0,0,0,11.59,5Zm5.365-.016a2.684,2.684,0,0,0-.731.169,1.343,1.343,0,0,0-.009,1.766,1.907,1.907,0,0,0,1.426-.007,1.332,1.332,0,0,0,0-1.748,2.455,2.455,0,0,0-.684-.181ZM11.581,9.017a2.561,2.561,0,0,0-.667.122c-.418.2-.355.615-.362.989,0,.336.007.735.366.82a2.7,2.7,0,0,0,1.278,0c.449-.12.362-.594.369-.968.007-.345.007-.7-.369-.855a2.825,2.825,0,0,0-.618-.11ZM15.9,10.048a2.563,2.563,0,0,0,.113.637c.193.425.6.371.982.376.348,0,.752,0,.843-.378a2.886,2.886,0,0,0,.007-1.252c-.08-.369-.465-.395-.806-.381-.39.014-.832-.089-1.036.381a2.554,2.554,0,0,0-.1.62Zm-4.327,3a2.812,2.812,0,0,0-.59.075.688.688,0,0,0-.425.761c.012.42-.11.944.411,1.106a2.2,2.2,0,0,0,1.2,0c.517-.15.392-.662.406-1.071.014-.348-.049-.665-.411-.8a2.64,2.64,0,0,0-.585-.078Zm5.363-.009a2.84,2.84,0,0,0-.639.11c-.362.148-.378.486-.369.822.012.381-.1.867.369,1a2.653,2.653,0,0,0,1.252.012c.362-.078.4-.463.392-.8-.009-.392.07-.829-.39-1.036a2.426,2.426,0,0,0-.618-.106Z"
                transform="translate(-0.015 -0.002)"
                fill="#ccc"
              />
            </svg>
            {/**Icono hoteles end*/}
          </div>
          <div>Hoteles</div>
        </div>
        {/**Card tab Carros */}
        <div className="w-[103px] h-[74px] flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow bg-[#ffffff] text-[#707070] hover:border-2 hover:border-[#EF4060]">
          <div className="mb-3">
            {/**Icono Carros */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39.768"
              height="21.251"
              viewBox="0 0 39.768 21.251"
            >
              <path
                id="Carro-02"
                d="M1.58,14.877a2.512,2.512,0,0,0,.076-.312A9.574,9.574,0,0,1,5.405,7.808a9.484,9.484,0,0,0,2.073-2.1A13.065,13.065,0,0,1,17.869.04a46.3,46.3,0,0,1,6.972.287A6.022,6.022,0,0,1,28.1,1.514a11.923,11.923,0,0,1,3.521,4.362,1.944,1.944,0,0,0,1.448,1.2c1.868.5,3.723,1.049,5.574,1.6a3.471,3.471,0,0,1,2.628,3.218,21.323,21.323,0,0,1,.007,3.529,2.655,2.655,0,0,1-1.911,2.456.569.569,0,0,0-.4.429,4,4,0,0,1-6.341,2.059,4.514,4.514,0,0,1-1.494-2.328c-.116-.007-.218-.018-.321-.018q-8.733,0-17.466-.007c-.274,0-.367.106-.453.361a4.147,4.147,0,0,1-3.736,2.881,4.014,4.014,0,0,1-3.828-2.594A.836.836,0,0,0,4.383,18,2.71,2.71,0,0,1,1.689,15.88c-.03-.117-.073-.23-.109-.344V14.87ZM20.732,6.614H30.61a11.629,11.629,0,0,0-2.6-3.494A4.666,4.666,0,0,0,25.38,1.734c-.641-.082-1.283-.174-1.927-.227-.889-.074-1.779-.113-2.721-.174v5.28Zm-7.161-.935a2.737,2.737,0,0,0,2.119.964c1.25.011,2.5,0,3.775,0v-5.3a12.064,12.064,0,0,0-7.716,2c.615.8,1.184,1.6,1.822,2.339Zm21.545,14.27a3.01,3.01,0,0,0,2.87-3.111,2.888,2.888,0,1,0-5.762.032A2.986,2.986,0,0,0,35.116,19.948ZM9.052,13.761a3,3,0,0,0-2.889,3.086,3.012,3.012,0,0,0,2.886,3.1,2.993,2.993,0,0,0,2.88-3.094,2.978,2.978,0,0,0-2.876-3.09Z"
                transform="translate(-1.58 -0.007)"
                fill="#ccc"
              />
            </svg>
            {/**Icono carros end*/}
          </div>
          <div>Carros</div>
        </div>
        {/**Card tab Asistencia */}
        <div className="w-[103px] h-[74px] flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow bg-[#ffffff] text-[#707070] hover:border-2 hover:border-[#EF4060]">
          <div className="mb-3">
            {/**Icono Asistencia */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32.211"
              height="27.651"
              viewBox="0 0 32.211 27.651"
            >
              <path
                id="Asistencia-02"
                d="M-.011,25.72V6.657C0,6.643.021,6.629.026,6.611a2.344,2.344,0,0,1,2.549-1.9H9.73V1.945A1.824,1.824,0,0,1,11.68,0h8.709a1.815,1.815,0,0,1,1.959,1.964c0,.8,0,1.6,0,2.388,0,.111.009.221.018.35h7.418a2.317,2.317,0,0,1,2.406,2.4V25.245a2.535,2.535,0,0,1-.106.742,2.338,2.338,0,0,1-2.42,1.664H2.336a2.343,2.343,0,0,1-2.291-1.8.931.931,0,0,0-.065-.138Zm17.565-8h3.683a1.983,1.983,0,0,0,.618-.088,1.46,1.46,0,0,0-.461-2.844c-1.162-.009-2.328,0-3.49,0-.111,0-.221-.009-.346-.018V11.152a2.282,2.282,0,0,0-.046-.562,1.456,1.456,0,0,0-2.867.323c-.014,1.176,0,2.347,0,3.522v.35h-3.79A1.418,1.418,0,0,0,9.5,15.6a1.466,1.466,0,0,0,1.374,2.125c1.134.009,2.264,0,3.4,0h.369V18.1c0,1.1.023,2.2-.009,3.3a1.475,1.475,0,1,0,2.937-.014c-.023-.521,0-1.046,0-1.572V17.721Zm-5.288-15.2V4.688h7.561V2.517Z"
                transform="translate(0.02)"
                fill="#ccc"
              />
            </svg>
            {/**Icono asistencia end*/}
          </div>
          <div>Asistencia</div>
        </div>
        {/**Card tab Corporativo */}
        <div className="w-[103px] h-[74px] flex flex-col justify-center items-center rounded-[8px] text-[12px] font-bold shadow-md cursor-pointer hvr-grow bg-[#ffffff] text-[#707070] hover:border-2 hover:border-[#EF4060]">
          <div className="mb-3">
            {/**Icono Corporativo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38.846"
              height="23.316"
              viewBox="0 0 38.846 23.316"
            >
              <path
                id="Icon_awesome-handshake"
                data-name="Icon awesome-handshake"
                d="M26.385,4.5H21.171a1.942,1.942,0,0,0-1.311.51l-5.967,5.463c-.006.006-.012.018-.018.024a2.414,2.414,0,0,0-.127,3.4,2.532,2.532,0,0,0,3.405.164c.006-.006.018-.006.024-.012L22.027,9.6a.971.971,0,1,1,1.311,1.432l-1.584,1.451,8.838,7.174a4.373,4.373,0,0,1,.48.467V8.385L27.757,5.071A1.928,1.928,0,0,0,26.385,4.5Zm6.634,3.9v13.59a1.94,1.94,0,0,0,1.942,1.942h3.885V8.4Zm2.913,13.59a.971.971,0,1,1,.971-.971A.974.974,0,0,1,35.933,21.987ZM0,23.923H3.885a1.94,1.94,0,0,0,1.942-1.942V8.4H0Zm2.913-3.879a.971.971,0,1,1-.971.971A.974.974,0,0,1,2.913,20.045Zm26.458,1.129-9.062-7.357-1.821,1.669a4.369,4.369,0,0,1-5.906-6.44L17.548,4.5H12.461a1.939,1.939,0,0,0-1.372.571L7.769,8.385v13.59H8.88l5.493,4.971a3.884,3.884,0,0,0,5.463-.564l.012-.012,1.086.941a2.256,2.256,0,0,0,3.174-.328l1.906-2.343.328.267a1.939,1.939,0,0,0,2.731-.285l.577-.71a1.946,1.946,0,0,0-.279-2.737Z"
                transform="translate(0 -4.5)"
                fill="#ccc"
              />
            </svg>
            {/**Icono corporativo end*/}
          </div>
          <div>Corporativo</div>
        </div>
      </nav>
      {/** Tabs botonera servicios */}

      {/** Motor de busueda para los vuelos */}
      <section className="static flex flex-wrap justify-center items-center">
        {/**Card  vuelos*/}        
        <div className={openTab === 1 ? "block w-[1240px] h-[202px] absolute bg-white p-8 rounded-md shadow-md" : "hidden"}>
          {/**radio butons tipo de seleccion  */}
          <div className="flex  mt-4 text-[16px] text-[#323237]">
            <div className="pl-6">
              <label className="cursor-pointer">
                <input className="mr-2" type="radio" />
                Ida y vuelta
              </label>
            </div>
            <div>
              <label className="cursor-pointer">
                <input className="mr-2 ml-4" type="radio" />
                Solo ida
              </label>
            </div>
            <div>
              <label className="cursor-pointer">
                <input className="mr-2 ml-4" type="radio" />
                Multidestino
              </label>
            </div>
          </div>

          {/** End radio butons tipo de seleccion  */}
          {/**campos de busqueda */}
          <div className="flex items-center pl-6 pt-4">
            <div>
              {/* Origen*/}
              <div className="bg-gray-200 rounded-lg p-2 mr-2 w-[229px] h-[58px] cursor-pointer border border-transparent hover:border-[#EF4060]">
                <p className="text-[#323237] text-[12px] uppercase tracking-[1.8px]">
                  Origen
                </p>
                <div className="flex">
                  <input
                    className="w-full h-4 rounded-md border border-gray-200 bg-gray-200 text-[17px] text-[#707070] outline-none focus:ring-gray-200 focus:border-gray-200 tracking-[0.13px]"
                    type="text"
                    placeholder="Desde"
                  />
                </div>
              </div>
            </div>
            {/* boton de cambio*/}
            <div className="flex justify-center items-center shadow-sm cursor-pointer hvr-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <g
                  id="Grupo_1764"
                  data-name="Grupo 1764"
                  transform="translate(-334 -433)"
                >
                  <rect
                    id="Rectángulo_1247"
                    data-name="Rectángulo 1247"
                    width="30"
                    height="30"
                    rx="6"
                    transform="translate(334 433)"
                    fill="#323237"
                  />
                  <g id="ic_swap_horiz_24px" transform="translate(337 436)">
                    <path
                      id="Trazado_1993"
                      data-name="Trazado 1993"
                      d="M6.99,11,3,15l3.99,4V16H14V14H6.99ZM21,9,17.01,5V8H10v2h7.01v3Z"
                      fill="#fff"
                    />
                    <path
                      id="Trazado_1994"
                      data-name="Trazado 1994"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
            </div>
            {/*end boton de cambio*/}
            <div>
              {/* destino*/}
              <div className="bg-gray-200 rounded-lg p-2 ml-2 w-[229px] h-[58px] cursor-pointer border border-transparent hover:border-[#EF4060]">
                <p className="text-[#323237] text-[12px] uppercase tracking-[1.8px]">
                  Destino
                </p>
                <div className="flex">
                  <input
                    className="w-full h-4 rounded-md border-gray-200 bg-gray-200 text-[17px] text-[#707070] outline-none  focus:ring-gray-200 focus:border-gray-200 tracking-[0.13px]"
                    type="text"
                    placeholder="Hasta"
                  />
                </div>
              </div>
            </div>

            <div>
              {/* Fechas*/}
              <div className="bg-gray-200 rounded-lg p-1 ml-2 w-[256px] h-[58px] cursor-pointer border border-transparent hover:border-[#EF4060]">
                <p className="text-[#323237] text-[12px] uppercase tracking-[1.8px]">
                  Fechas
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    
                  </div>
                  <div>|</div>
                  <div className="flex justify-end ml-4">
                    <input
                      className="w-full h-4 rounded-md border-gray-200 bg-gray-200 text-[17px] text-[#707070] outline-none focus:ring-gray-200 focus:border-gray-200 tracking-[0.13px]"
                      type="text" 
                      placeholder="Vuelta"
                    />
                  </div>
                </div>
              </div>
              {/**end fechas */}
            </div>

            <div>
              {/* pasajeros*/}
              <div className="bg-gray-200 rounded-lg p-2 ml-2 w-[167px] h-[58px] cursor-pointer border border-transparent hover:border-[#EF4060]">
                <p className="text-[#323237] text-[12px] uppercase tracking-[1.8px]">
                  Pasajeros
                </p>
                <div className="flex">
                  <span className="w-full rounded-md border-gray-200 bg-gray-200 text-[17px] text-[#707070] outline-none tracking-[0.13px]">
                    1 Persona
                  </span>
                </div>
              </div>
            </div>

            <div>
              {/* boton buscar*/}
              <div className="flex justify-center items-center bg-[#298787] rounded-lg p-2 ml-2 w-[173px] h-[48px] cursor-pointer hvr-grow border border-transparent hover:bg-[#054141]">
                <p className="text-[#ffffff] text-[16px]">Buscar</p>
              </div>
              {/*end boton buscar*/}
            </div>
          </div>
          {/**campos de busqueda end*/}
        </div>
        {/**Card  end*/}
        <div className="h-[346px] w-full ">
          <Image
            className="h-[346px] w-full object-center object-cover"
            src={ImageBgSectionBusqueda}
            alt="bg"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </section>
      {/**End motor de busqueda vuelos*/}

      {/*Motor de busqueda para paquetes */}
      <section className="static flex flex-wrap justify-center items-center">
        <div>Paquetes</div>
        <div className="h-[346px] w-full ">
          <Image
            className="h-[346px] w-full object-center object-cover"
            src={ImageBgSectionBusqueda}
            alt="bg"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
    </section>

      {/*End Motor de busqueda para paquetes */}

    </div>
  ); 
}