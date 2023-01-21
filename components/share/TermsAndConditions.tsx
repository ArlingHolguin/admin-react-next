import { Button, Checkbox } from "antd";
import "../../assets/components/consult-reservation/reserve.less";

const TermsAndConditions = ({ showTermsSetter, termsSetter, width = null }) => {
	const handleChange = (e) => {
		const checked = e.target.checked;
		termsSetter.setTerms(checked);
	};

	return (
		<>
			<div
				id="terms-and-conditions"
				style={{
					width: `${width}`,
					textAlign: "left",
					margin: "20px 0 0 5%"
				}}
			>
				<Checkbox onChange={handleChange}>
					He leído y acepto las condiciones de compra la{" "}
					<Button
						onClick={() =>
							showTermsSetter.setShowTerms(
								!showTermsSetter.showTerms
							)
						}
						type="link"
					>
						<strong>política de privacidad</strong>
					</Button>{" "}
					y las condiciones tarifarias
				</Checkbox>
			</div>

			<div
				style={{
					display: showTermsSetter.showTerms ? "block" : "none",
					width: "100%",
					height: "30vh",
					margin: "20px 0"
				}}
			>
				<embed
					width="100%"
					height="100%"
					src="/terms"
					type="text/html"
				/>
			</div>
		</>
	);
};

export default TermsAndConditions;
