import { Divider } from "antd";
import "../../assets/global.less";

const Planning = () => {
	return (
		<div style={{ fontSize: ".8em" }}>
			<h1>Quienes Somos</h1>
			<Divider />
			<p>
      Somos una agencia de viajes y turismo fundada en el año 2001, certificados ante IATA, formamos parte de agremiaciones destacadas como: ANATO Y TRAVEL GROUP.

      Estamos comprometidos en generar una evolución constante basándonos en las nuevas tendencias de servicios para viajeros y empresas, a través de EuroAmerican Travel a nivel presencial y TiquetesyTiquetes.com a nivel digital.

      Contamos con un equipo de colaboradores altamente calificados y satisfechos, recursos tecnológicos de punta y un amplio portafolio de servicios, que nos permite brindar una asesoría que excede en todo momento las expectativas de nuestros clientes, garantizando un alto nivel de satisfacción en todos nuestros servicios.
			</p>
			<h2>Mision</h2>
			<Divider />
			<p>
        Generar experiencias altamente satisfactorias en nuestros clientes, brindando una asesoría profesional en servicios de viajes y turismo, siendo modelo de referencia, fuente de empleo y desarrollo para el bienestar social, ambiental y económico de nuestro entorno.
			</p>
			<h2>
        Vision
			</h2>
			<Divider />
			<p>
        Consolidarnos para el 2022 como una agencia de viajes Online a nivel nacional, destacada por su servicio en el mercado vacacional y corporativo.
			</p>
      <h2>
        Politica de Calidad
			</h2>
			<Divider />
			<p>
        Brindar los mejores servicios de viajes y turismo, alcanzando el más alto nivel de satisfacción del cliente, contando con un equipo de colaboradores altamente calificados y satisfechos, infraestructura idónea y procesos estandarizados, orientados al mejoramiento continuo, cumpliendo con los requisitos legales y organizacionales, para garantizar la solidez financiera y el crecimiento de la organización.
			</p>

			<style jsx>{`
				h1,
				h2 {
					color: #df395d;
				}
			`}</style>
		</div>
	);
};

export default Planning;
