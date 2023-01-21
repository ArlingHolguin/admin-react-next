const ReserveNow = () => {
	return (
		<div id="reserve-now">
			<h4>Instrucciones para el pago:</h4>
			<br />
			<p>
				Si eliges esta opción podrás pagar hasta{" "}
				<strong>2 horas</strong> después de realizar la reserva y no
				podremos garantizar el cupo y las tarifas, ya que la aerolínea
				podrá disponer de ellos.
			</p>

			<style jsx>
				{`
					#reserve-now {
						width: 40%;
						margin: 0 auto;
						padding: 10px
					}

					@media screen and (max-width: 770px) {
						#reserve-now {
							width: 70%;
						}
					}

					@media screen and (max-width: 380px) {
						#reserve-now {
							width: 100%;
						}
					}
				`}
			</style>
		</div>
	);
};

export default ReserveNow;
