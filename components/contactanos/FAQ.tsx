import { Collapse } from "antd";

const FrequentQuestions = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<h1 style={{ color: "#DF395D" }}>Las preguntas más frecuentes</h1>
			<Collapse accordion>
				<Collapse.Panel
					header="¿A quién debo contactar si tengo preguntas/inconvenientes sobre mi reserva?"
					key="1"
				>
					<p>
						Si experimentas problemas con una reserva o quieres
						cambiarla, por favor contáctanos inmediatamente por
						teléfono para que uno de nuestros agentes te pueda dar
						el asesoramiento respectivo.
						<p className="no-margin">(+57) 2 486 55 50</p>
						<p className="no-margin">(+57)1 390 50 74</p>
					</p>
				</Collapse.Panel>
				<Collapse.Panel header="¿Cómo puedo pagar mi reserva?" key="2">
					<p>
						Puedes hacer el pago de tu reserva con tarjeta de
						crédito que pertenezcan a las siguientes franquicias:
						VISA, MASTERCARD Y AMERICAN EXPRESS; también lo puedes
						hacer con tarjeta débito. Ten en cuenta que debes tener
						habilitado con tu entidad financiera la opción de
						realizar compras a través de internet con tus tarjetas.
						Con el fin de brindarte otro alternativa de medio de
						pago, también podrás hacer una consignación bancaria,
						este medio de pago tiene un cargo adicional(ver
						condiciones de pago con consignación)
					</p>
				</Collapse.Panel>
				<Collapse.Panel
					header="¿Qué debo comprobar antes de reservar/comprar un vuelo?"
					key="3"
				>
					<p>
						Antes de hacer clic en el “botón de confirmar su
						reserva” por favor comprueba (siempre) que la siguiente
						información es correcta:
						<ul>
							<li>Fechas de viaje(s)</li>
							<li>Aeropuertos de salida y llegada</li>
							<li>
								Número de documento de identidad de los
								pasajeros
							</li>
							<li>Fecha de nacimiento de los pasajeros</li>
							<li>Nombres de los pasajeros</li>
							<li>
								Datos de contacto (Teléfono, dirección, email)
							</li>
						</ul>
					</p>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
};

export default FrequentQuestions;
