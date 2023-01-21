import "../../assets/components/spinner/spinner.less";

const Spinner = ({ visible, special = false, type = 0 }) => {
	const op = type > 8 || type < 1 ? 0 : type - 1;

	if (visible) {
		return (
			<>
				{special ? (
					<div className="loading">
						<div className="container">
							<div className="ctop">
								<div className="citem">
									<div className="icon loading-item">
										<img
											width="120px"
											src={`/static/img/avion_nubes.svg`}
											alt=""
										/>
									</div>
									<div className="text loading-item">
										<p>
											Mas de 800
											<br />
											aerolineas
										</p>
									</div>
								</div>

								<div className="cborder"></div>

								<div className="citem">
									<div className="icon loading-item">
										<img
											width="120px"
											src={`/static/img/hotel_starts.svg`}
											alt=""
										/>
									</div>
									<div className="text loading-item">
										<p>
											Mas de 1.000
											<br />
											hoteles en todo
											<br />
											el mundo
										</p>
									</div>
								</div>

								<div className="cborder"></div>

								<div className="citem">
									<div className="icon loading-item">
										<img
											width="120px"
											src={`/static/img/kit.svg`}
											alt=""
										/>
									</div>
									<div className="text loading-item">
										<p>
											Cobertura medica en todos los
											destinos
										</p>
									</div>
								</div>

								<div className="cborder"></div>

								<div className="citem">
									<div className="icon loading-item">
										<img
											width="120px"
											src={`/static/img/car_safe.svg`}
											alt=""
										/>
									</div>
									<div className="text loading-item">
										<p>Mas de 900 companias de alquiler</p>
									</div>
								</div>
							</div>

							<div className="logo-container">
								<img src="/static/img/tiny_logo.svg" alt="" />
							</div>
						</div>
					</div>
				) : (
					<div className="loading">
						<div className="container">
							<div className="icon-loader loading-item">
								<img
									width="120px"
									src={`/static/img/${loaders[op].icon}`}
									alt=""
								/>
							</div>
							<div className="text loading-item">
								<p>{loaders[op].text}</p>
							</div>
							{op == 4 && (
								<>
									<p className="tip">{loaders[op].tip}</p>
									<p className="main_text">
										{loaders[op].second_text}
									</p>
								</>
							)}
							<div className="logo-container">
								<img src="/static/img/tiny_logo.svg" alt="" />
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
	return <></>;
};

const loaders = [
	{
		icon: "surf_table.svg",
		text: "Si vas a la playa, no olvides llevar tu tabla de surf. Recuerda que puedes agregar a tus vuelos de Avianca con un solo clic."
	},
	{
		icon: "register.svg",
		text: "Recuerda, al ingresar tus datos puedes adicionar tu seguro de viaje por solo USD 5.3 por día."
	},
	{
		icon: "briefcase.svg",
		text: "Mientras buscamos los mejores hoteles, recuerda que en nuestra página también puedes encontrar la más amplia oferta de tiquetes para tu destino."
	},
	{
		icon: "avion_yellow.svg",
		text: "Mientras buscamos las mejores tarifas, recuerda que en nuestra página también puedes encontrar la más amplia oferta de hoteles para tu destino."
	},
	{
		icon: "coins.svg",
		text: "Financia tu plan vacacional hasta 18 meses*",
		tip: "*Financiación ofrecida por Simba, sujeto a su aprobación.",
		second_text: "Monto máximo para el crédito $30'000.000"
	},
	{
		icon: "bicycle.svg",
		text: "¡Viaja con lo que más te gusta! Seleccionando los vuelos personalizados de Avianca puedes hacerlo al reservar en línea."
	},
	{
		icon: "dog_yellow.svg",
		text: "Viaja con tu amigo peludito, seleccionando los vuelos personalizados de Avianca puedes hacerlo al momento de reservar en línea."
	},
	{
		icon: "especial.svg",
		text: "Ahora en Tiquetes y Tiquetes puedes agregar servicios adicionales a tus vuelos de Avianca. Busca la cinta fucsia entre los resultados y viaja a tu manera."
	}
];

export default Spinner;
