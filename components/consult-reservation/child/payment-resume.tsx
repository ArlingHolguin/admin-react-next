import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalstorage";
import DetailItem from "../../DetailPrice/DetailItems";

const PaymentResume = () => {
	const [prices, setPrices] = useState({
		taxes: 0,
		net_price: 0,
		seguros: 0,
		total: 0
	});

	const [reserveData, setReserveData] = useLocalStorage("reservation", null);

	useEffect(() => {
		const allTaxes = reserveData.map(reserve => reserve.details.tax + reserve.details.iva).reduce((a, b) => a + b )
		const allPrices = reserveData.map(reserve => reserve.details.price ).reduce((a, b) => a + b )
		const netPrice = allPrices - allTaxes 

		const totalPrice = allTaxes + netPrice;
		setPrices({
			taxes: allTaxes,
			net_price: netPrice,
			seguros: 0,
			total: totalPrice
		});
	}, []);

	return <DetailItem totalPrice={prices} />;
};

export default PaymentResume;
