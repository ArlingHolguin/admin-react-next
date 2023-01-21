import { Divider } from "antd";
import "../../assets/global.less";

const SustainabilityPolicy = () => {
	return (
		<div style={{ fontSize: ".8em" }}>
			<h1>Politica de Sostenibilidad</h1>
			<Divider />
			<p>
        En nuestra Agencia de Viajes y Turismo TIQUETESYTIQUETES.COM , somos conscientes de nuestra gran responsabilidad en la conservación y preservación de la calidad de vida de generaciones presentes y futuras, por lo cual estamos comprometidos con el medio ambiente, operando bajo un modelo de sostenibilidad que nos permita:
			</p>
      <ul>
        <li>
        Controlar y optimizar los recursos hídricos y energéticos.
        </li>
        <li>
        Lograr el aprovechamiento de residuos sólidos.
        </li>
        <li>
        Utilizar de forma eficiente los recursos que son necesarios para el cumplimiento de nuestras actividades diarias.
        </li>
        <li>
        Capacitar y concientizar a nuestros colaboradores en temas ambientales, socioculturales y económicos que garanticen minimizar los impactos negativos producidos en el desarrollo de nuestra actividad.
        </li>
        <li>
        Sensibilizar a nuestros clientes de la conservación y protección del medio ambiente y al mismo tiempo divulgar entre ellos el cumplimiento de las leyes de nuestro país, invitándolos a poner en práctica comportamientos responsables que contribuyan con un turismo sostenible.
        </li>
        <li>
        Dar apoyo a las comunidades locales, promoviendo su desarrollo económico.
        </li>
        <li>
        Participar activamente en actividades sociales, que sean convocadas por diferentes organizaciones.
        </li>
        <li>
        Trabajar de la mano con nuestros proveedores, para lograr el objetivo propuesto en el desarrollo de turismo sostenible.
        </li>
      </ul>

			<style jsx>{`
				h1,
				h2 {
					color: #df395d;
				}
			`}</style>
		</div>
	);
};

export default SustainabilityPolicy;
