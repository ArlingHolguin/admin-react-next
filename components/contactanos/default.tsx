import { Icon, Row } from "antd";

const Default = () => {
	return (
		<div id="def-option">
			<h1>
				<Icon type="left-circle" /> Elige una opcion
			</h1>
			<span>Para comunicarte con nosotros</span>

			<style jsx>
				{`
					#def-option {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						text-align: center;
					}

					#def-option h1 {
						font-size: 3em;
						color: #df395d;
						margin: 2em 0 0 0;
					}

					#def-option span {
						font-size: 1.3em;
					}

					@media screen and (max-width: 425px) {
						#def-option h1 {
							font-size: 1.8em;
						}

						#def-option span {
							font-size: 1em;
						}
					}
				`}
			</style>
		</div>
	);
};

export default Default;
