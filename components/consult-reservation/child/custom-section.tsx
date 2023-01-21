import "../../../assets/components/consult-reservation/reserve.less";

const CustomSection = ({ _Icon, headText, children }) => {
	return (
		<div className="information-section">
			<div className="title-icon">
				<div className="infoIcon">{_Icon}</div>
				<h3>{headText}</h3>
			</div>
			<div className="information">{children}</div>
		</div>
	);
};

export default CustomSection;
