export interface IPaymentRequest {
	record_data: {
		nacional: string;
		precioTotal: number;
		codigoAerolinea: string;
		tasaAdmin: string;
		idaVuelta: string;
		fechaSalida: string;
		codigo: string;
		pasajeros: IPax[];
		ciudad: string;
		direccion: string;
		telefono: string;
		email: string;
		precio: number;
		iva: number;
		tasaAeroportuaria: number;
		travellers: {
			A?: ITraveller[];
			C?: ITraveller[];
			I?: ITraveller[];
		};
		aeropuertos: string[];
		baseDevolucionAdmin: string;
		ivaAdmin: string;
	};
	post_data: {
		enviroment?: string;
		cc_type: string;
		cc_number: string;
		cc_number_fees: string;
		cc_bank: string;
		cc_month_expiration: string;
		cc_year_expiration: string;
		cc_security_code: string;
		bill_to_forename: string;
		bill_to_surname: string;
		bill_to_identifier: string;
		bill_to_phone: string;
		bill_to_email: string;
		termsCond: string;
		ip_address: string;
		split: boolean;
	};
}

interface IPax {
	cedula: string;
	nombre: string;
	apellido: string;
	fecha_nacimiento: string;
}

interface ITraveller {
	first_name: string;
	surname: string;
	cedula: string;
}
