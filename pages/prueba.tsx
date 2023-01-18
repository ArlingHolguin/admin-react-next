export default function Home() {
  return (
    <div>
      <div className="flex justify-end">
        <div className="flex justify-end">
          <div className="flex bg-[#e1e1e2] border rounded-bl-lg pr-14 text-sm">
            <div className="px-3">Español</div>
            <div className="flex items-center">
              <div className="px-2">$ COP</div>
              <div className="bandera-colombia text-[#ffffff00]">band</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex container mx-auto justify-between">
        <div className="flex">
          <img className="w-[250px]" src="static/img/logo.png" alt="logo" />
        </div>
        <div className="flex justify-around items-end mb-2 text-sm text-[#008290]">
          <div className="px-3">Mis reservas</div>
          <div className="px-3">Ayuda</div>
          <div className="px-3">Mi perfil</div>
        </div>
      </div>
      <div className="bg-gray-300 py-2">
        <div className="flex container mx-auto text-sm font-light gap-4 text-gray-600">
          <div className="flex flex-col justify-center items-center">
            <div>✈</div>
            <div>Vuelos</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>o</div>
            <div>Paquetes</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>o</div>
            <div>Hoteles</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>o</div>
            <div>Carros</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>o</div>
            <div>Asistencia</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>o</div>
            <div>Corporativa</div>
          </div>
        </div>
      </div>
      <div className="bg-[#008290]">
        <div className="container mx-auto py-16">
          <div className="w-full h-48 bg-slate-100 rounded-lg border border-1 border-[#00829059] shadow-sm shadow-[#66c3cf]">
            <div className="py-6 px-12">
              <h1 className="uppercase text-lg text-[#008290] font-semibold">
                Vuelos baratos con tiquetesytiquetes
              </h1>
            </div>
            <div className="flex pl-6">
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

            <div className="flex items-center pl-12 pt-4">
              <div>
                {/* Origen*/}
                <div className="bg-gray-200 rounded-lg p-2 -mr-3 w-48">
                  <p className="text-sm uppercase font-medium ml-7 tracking-wide">
                    Origen
                  </p>
                  <div className="flex">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-md border border-gray-200 bg-gray-200 text-base font-medium text-[#6B7280] outline-none focus:border-[#6b64f100] focus:shadow-sm"
                      type="text"
                      placeholder="Desde"
                    />
                  </div>
                </div>
              </div>
              {/* boton de cambio*/}
              <div className="flex justify-center items-center bg-gray-300 h-10 w-12 rounded-md z-10 shadow-sm cursor-pointer">
                +
              </div>

              <div>
                {/* destino*/}
                <div className="bg-gray-200 rounded-lg p-2 -ml-3 w-48">
                  <p className="text-sm uppercase font-medium ml-7 tracking-wide">
                    Destino
                  </p>
                  <div className="flex">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-md border border-gray-200 bg-gray-200 text-base font-medium text-[#6B7280] outline-none focus:border-transparent focus:shadow-sm"
                      type="text"
                      placeholder="Desde"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="static flex flex-wrap justify-center items-center">
        <div className="w-[1240px] h-[202px] absolute flex justify-center items-center bg-white p-8 rounded-md shadow-md">
          <div className="flex pl-6">
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

          <div className="flex items-center pl-12 pt-4">
            <div>
              {/* Origen*/}
              <div className="bg-gray-200 rounded-lg p-2 -mr-3 w-48">
                <p className="text-sm uppercase font-medium ml-7 tracking-wide">
                  Origen
                </p>
                <div className="flex">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full rounded-md border border-gray-200 bg-gray-200 text-base font-medium text-[#6B7280] outline-none focus:border-[#6b64f100] focus:shadow-sm"
                    type="text"
                    placeholder="Desde"
                  />
                </div>
              </div>
            </div>
            {/* boton de cambio*/}
            <div className="flex justify-center items-center bg-gray-300 h-10 w-12 rounded-md z-10 shadow-sm cursor-pointer">
              +
            </div>

            <div>
              {/* destino*/}
              <div className="bg-gray-200 rounded-lg p-2 -ml-3 w-48">
                <p className="text-sm uppercase font-medium ml-7 tracking-wide">
                  Destino
                </p>
                <div className="flex">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full rounded-md border border-gray-200 bg-gray-200 text-base font-medium text-[#6B7280] outline-none focus:border-transparent focus:shadow-sm"
                    type="text"
                    placeholder="Desde"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[346px] w-full ">
          <img
            className="h-[346px] w-full object-center object-cover"
            src="https://img.freepik.com/foto-gratis/paisaje-palma-tropical-vacaciones-verano_1203-5352.jpg?w=740&t=st=1673989609~exp=1673990209~hmac=a07589f31a1b5f0705220f31e39ee8c87fe87d8bec3a65b1a33098a485a3bddf"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
