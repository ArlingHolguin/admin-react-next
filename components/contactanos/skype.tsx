const Skype = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<img
				id="skype-logo"
				src="/static/img/contactenos/skype-full-color.svg"
			/>
			<h2>¿Tienes cuenta en Skype?</h2>
			<h4>
				Agréganos: <span id="skype-id">tiquetesytiquetes.com</span>
			</h4>

			<style jsx>{`
				#skype-logo {
					width: 200px;
				}
				#skype-id {
					color: red;
				}
			`}</style>
		</div>
	);
};

export default Skype;
