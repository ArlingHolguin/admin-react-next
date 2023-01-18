const organizeInfo = (ccInfo, terms, ip) => {
	const entities = [
		{
			item: "visa",
			value: "1"
		},
		{
			item: "american-express",
			value: "2"
		},
		{
			item: "mastercard",
			value: "3"
		},
		{
			item: "diners-club",
			value: "5"
		}
	];

	const franqSelected = entities.filter(
		(val) => val.item == ccInfo?.franq
	)[0];

	const payInfo = {
		post_data: {
			cc_type: franqSelected?.value,
			cc_number: ccInfo?.cardNumber,
			cc_number_fees: ccInfo?.fees,
			cc_bank: ccInfo?.bank,
			cc_month_expiration: ccInfo?.expireDate.month,
			cc_year_expiration: ccInfo?.expireDate.year,
			cc_security_code: ccInfo?.ccv,
			bill_to_forename: ccInfo?.titularName,
			bill_to_surname: ccInfo?.titularSurname,
			bill_to_identifier: ccInfo?.doc,
			bill_to_email: ccInfo?.email,
			bill_to_phone: ccInfo?.phone,
			termsCond: terms,
			ip_address: ip
		}
	};

	return payInfo;
};

export default organizeInfo;
