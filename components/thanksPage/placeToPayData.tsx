import { Table } from "antd";
import { format } from "date-fns";
import formatter from "../../lib/priceFormatter";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

const columns = [
	{
		key: "1",
		dataIndex: "businessName",
		title: "Razon social"
	},
	{
		key: "2",
		dataIndex: "datetime",
		title: "Fecha y hora",
		render: (text) => (
			<p>
				{format(new Date(text), "PP", { locale: es })} -{" "}
				{format(new Date(text), "p", { locale: es })}
			</p>
		)
	},
	{
		key: "3",
		dataIndex: "state",
		title: "Estado"
	},
	{
		key: "4",
		dataIndex: "reference",
		title: "Referencia"
	},
	{
		key: "5",
		dataIndex: "cus",
		title: "Autorizacion/CUS"
	},
	{
		key: "6",
		dataIndex: "consecutive",
		title: "Consecutivo"
	},
	{
		key: "7",
		dataIndex: "price",
		title: "Precio",
		render: (text) => <span>{formatter.format(Number(text))} COP</span>
	},
	{
		key: "8",
		dataIndex: "airportTax",
		title: "Tasa Aeroportuaria",
		render: (text) => <span>{formatter.format(Number(text))} COP</span>
	},
	{
		key: "9",
		dataIndex: "adminTax",
		title: "Tasa Administrativa",
		render: (text) => <span>{formatter.format(Number(text))} COP</span>
	},
	{
		key: "10",
		dataIndex: "totalPrice",
		title: "Precio Total",
		render: (text) => <span>{formatter.format(Number(text))} COP</span>
	},
	{
		key: "11",
		dataIndex: "message",
		title: "Mensaje"
	},
	{
		key: "12",
		dataIndex: "franchise",
		title: "Franquisia"
	},
	{
		key: "13",
		dataIndex: "bank",
		title: "Banco"
	},
	{
		key: "14",
		dataIndex: "fees",
		title: "Cuotas"
	},
	{
		key: "15",
		dataIndex: "name",
		title: "Nombre"
	},
	{
		key: "16",
		dataIndex: "email",
		title: "Correo"
	}
];

const PlaceToPayData = () => {
	const [p2pInformation, setP2pInformation] = useState(null);

	useEffect(() => {
		if (typeof window != undefined) {
			setP2pInformation(
				JSON.parse(window.sessionStorage.getItem("p2pInformationPaymentReference"))
			);
		}
	}, []);

	if (!p2pInformation) return null;

	return (
		<>
			<h1>Detalles del pago</h1>
			<Table
				rowKey={(record) => record["consecutive"]}
				pagination={false}
				scroll={{ x: true }}
				dataSource={p2pInformation}
				columns={columns}
			/>
		</>
	);
};

export default PlaceToPayData;
