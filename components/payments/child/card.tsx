import { useState, useEffect } from "react";
import "../../../assets/components/payments/credit-card.less";

const visaColor = "linear-gradient(to right, #FF4B2B, #DF395D)";
const aeColor = "linear-gradient(to right, #0f0c29, #302b63, #24243e)";
const masterColor = "linear-gradient(to right, #30353D, #202428)";
const noFranqColor = "linear-gradient(to right, #005aa7, #06A8E5)";
const dinersColor = "linear-gradient(to right, #43c6ac, #191654)";

const Card = ({ cardN, returnFranq, titular, expire, cvv }) => {
	const [cardColor, setCardColor] = useState(noFranqColor);
	const [franq, setFranq] = useState("");
	const [cardNumberFormated, setCardNumberFormated] = useState("");

	const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
	const masterRegex =
		/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
	const aeRegex = /^3[47][0-9]{13}$/;
	const dinerRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;

	const formatCardNumber = () => {
		const numbersArr = cardN.split("");
		let str = "";
		for (let i = 0; i < numbersArr.length; i++) {
			if (i == 3 || i == 7) {
				str += numbersArr[i];
				str += " ";
			} else if (i > 7 && i < 16) {
				if (i == 11) {
					str += "*";
					str += " ";
				} else {
					str += "*";
				}
			} else if (i > 15) {
				str += "";
			} else {
				str += numbersArr[i];
			}
		}

		setCardNumberFormated(str);
	};

	useEffect(() => {
		formatCardNumber();
		if (cardN) {
			if (cardN.match(aeRegex) != null) {
				setFranq("american-express");
				returnFranq("american-express");
				setCardColor(aeColor);
			} else if (cardN.match(visaRegex) != null) {
				setFranq("visa");
				returnFranq("visa");
				setCardColor(visaColor);
			} else if (cardN.match(masterRegex) != null) {
				setFranq("mastercard");
				returnFranq("mastercard");
				setCardColor(masterColor);
			} else if (cardN.match(dinerRegex) != null) {
				setFranq("diners-club");
				returnFranq("diners-club");
				setCardColor(dinersColor);
			} else {
				setFranq("");
				setCardColor(noFranqColor);
			}
		}
	}, [cardN]);
	return (
		<div className="card-wrap">
			<div className="card">
				<div className="card__front card__part">
					<img
						className="card__front-square card__square"
						src="/static/img/payment-icons/chip.svg"
					/>
					{franq ? (
						<img
							className="card__front-logo card__logo"
							src={`/static/img/payment-icons/${franq}.svg`}
						/>
					) : (
						<img
							className="card__front-logo card__logo"
							style={{ maxWidth: "12%" }}
							src={`/static/img/payment-icons/question.svg`}
						/>
					)}

					<p className="card_numer">
						{!cardNumberFormated ? "" : cardNumberFormated}
					</p>
					<div className="card__space-75">
						<span className="card__label">Titular</span>
						<p className="card__info">{titular}</p>
					</div>
					<div className="card__space-25">
						<span className="card__label">Expira</span>
						{expire.month && expire.year && (
							<p className="card__info">
								{expire.month}/{expire.year}
							</p>
						)}
					</div>
				</div>

				<div className="card__back card__part">
					<div className="card__black-line"></div>
					<div className="card__back-content">
						<div className="card__secret">
							<p className="card__secret--last">{cvv}</p>
						</div>
						<img
							className="card__back-square card__square"
							src="/static/img/payment-icons/chip.svg"
						/>
						{franq ? (
							<img
								className="card__back-logo card__logo"
								src={`/static/img/payment-icons/${franq}.svg`}
							/>
						) : (
							<img
								className="card__back-logo card__logo"
								style={{ maxWidth: "12%" }}
								src={`/static/img/payment-icons/question.svg`}
							/>
						)}
					</div>
				</div>
				<style jsx>{`
					.card__part {
						box-shadow: 1px 1px #dfdfdf;
						top: 0;
						position: absolute;
						z-index: 1000;
						left: 0;
						display: inline-block;
						width: 320px;
						height: 190px;
						background-image: url(${"/static/img/payment-icons/map.png"}), ${cardColor};
						background-repeat: no-repeat;
						background-position: center;
						background-size: cover;
						border-radius: 8px;
					
						-webkit-transition: all 0.5s
							cubic-bezier(0.175, 0.885, 0.32, 1.275);
						-moz-transition: all 0.5s
							cubic-bezier(0.175, 0.885, 0.32, 1.275);
						-ms-transition: all 0.5s
							cubic-bezier(0.175, 0.885, 0.32, 1.275);
						-o-transition: all 0.5s
							cubic-bezier(0.175, 0.885, 0.32, 1.275);
						transition: all 0.5s
							cubic-bezier(0.175, 0.885, 0.32, 1.275);
						-webkit-transform-style: preserve-3d;
						-moz-transform-style: preserve-3d;
						-webkit-backface-visibility: hidden;
						-moz-backface-visibility: hidden;
					}
				`}</style>
			</div>
		</div>
	);
};

export default Card;
