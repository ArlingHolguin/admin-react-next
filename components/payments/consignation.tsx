const Consignation = () => {
	return (
		<div id="consignation-payment" className="p20">
			<div id="consignation-info">
				<img src="/static/img/payment-icons/Bancolombia_logo.svg" />
			</div>
			<br/>
			<div>
				<h4>Datos de consignación:</h4>
				<p>
					Cuenta corriente: 812 - 606747 - 19 <br />
					A nombre de Euroamerican TyT <br />
					NIT: 805 021 793 <br />
					En referencia, número de cédula del pasajero <br />
					Código de convenio: 66238 <br />
				</p>
			</div>
			<br />

			<h4>Recuerda:</h4>
			<p>
				<strong>
					La consignación debe realizarce antes de 24 horas.
				</strong>{" "}
				Una vez realizado tu pago por consignación, debes comunicarte a
				nuestras líneas de atención al cliente para confirmar tu
				reserva, de lo contrario será cancelada y sujetas a cambios de
				la tarifa.
				<br />
				<br /> Para mayor información o si necesitas asesoria para un
				servicio especial por favor comunícate con nuestros asesores de{" "}
				<strong>CALL CENTER.</strong>
				<br />
				<br /> Es necesario enviar imagen de consignación vía Whatsapp
				al número <strong>310 388 7165</strong>
			</p>

			<style jsx>{`
				#consignation-payment {
					width: 60%;
					margin: 0 auto;
				}

				#consignation-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				#consignation-info img {
					max-width: 80%;
				}

				@media screen and (max-width: 770px) {
					#consignation-payment {
						width: 80%;
					}
				}

				@media screen and (max-width: 430px) {
					#consignation-payment {
						width: 100%;
					}

					#consignation-info {
						flex-direction: column;
					}

					#consignation-info img {
						margin-bottom: 20px;
					}
				}
			`}</style>
		</div>
	);
};

export default Consignation;
