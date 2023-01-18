import flightAmadeus from "../lib/Flights/flightAmadeus";
import flightNDC from "../lib/Flights/flightNDC";
import flightKIU from "../lib/Flights/flightKIU";
import { request } from "../lib/api";
import { IFlight } from "../models/flight.model";
import { IResult } from "../models/searchService.model";
import Router from "next/router";
import { IFiltersRequestBody } from "../models/filterFlight.model";
import codes from "../public/static/data/codigos.json";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";

export default class Service {
	private urlBifrost = "";
	private urlVision_sevice = "";

	constructor() {
		this.urlBifrost =
			process.env.NEXT_PUBLIC_NODE_PROD == "production"
				? process.env.PROD_URL
				: process.env.urlBifrost;
		this.urlVision_sevice =
			process.env.NEXT_PUBLIC_NODE_PROD == "production"
				? process.env.PROD_URL
				: process.env.urlVision_sevice;
	}

	public SearchRecord(lastName: string, codeFlight: string) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/flight/search_record`;

			const params = {
				searching: {
					last_name: lastName,
					code_reserved: codeFlight
				}
			};

			request(url, params).then((res) => {
				resolve(res);
			});
		});
	}

	public Record(
		token: any,
		travellers: any,
		contactData: any,
		national: string | null,
		paymentType: string = "AFTER",
		ccInfo: any = null
	) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/flight/record`;
			let params = {};

			if (paymentType == "CREDIT") {
				params = {
					id: token,
					travelers: [...travellers],
					contact_data: contactData,
					payment_type: paymentType,
					payment: ccInfo,
					national
				};
			} else {
				params = {
					id: token,
					travelers: [...travellers],
					contact_data: contactData,
					payment_type: paymentType,
					national
				};
			}

			request(url, params).then((res) => {
				resolve(res);
			});
		});
	}

	public Select(to: any, back = null, getCode = false) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/flight/select`;

			const params = {
				selected_flights: [
					{
						id: to.id,
						selected: to.selected,
						branded: to.branded
					}
				]
			};

			if (back) {
				params.selected_flights.push({
					id: back.id,
					selected: back.selected,
					branded: back.branded
				});
			}

			request(url, params, getCode)
				.then((res) => {
					res.code ? reject(res) : resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	public Search = (
		type: string,
		origin: string,
		destine: string,
		date: string,
		adults: any,
		children: any,
		babies: any,
		dateReturn: string = "null",
		code_discount: string = null
	) => {
		return new Promise<IFlight[]>((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/flight/search`;
			const originCode = codes.iata.find(
				(c) =>
					c.codigo == origin ||
					c.ciudad.toLowerCase() == origin.toLowerCase()
			).codigo;
			const destineCode = codes.iata.find(
				(c) =>
					c.codigo == destine ||
					c.ciudad.toLowerCase() == destine.toLowerCase()
			).codigo;

			const flights = [
				{
					origin: originCode,
					destine: destineCode,
					departure_date: date
				}
			];
			const searchIdList = [];

			const getIsInternational = () => {
				const result =
					codes.iata.find((c) => c.codigo == originCode).pais ==
					codes.iata.find((c) => c.codigo == destineCode).pais;
				return !result;
			};

			const isInter = getIsInternational();

			/** Group international round_trip flights */
			const isInterRT = getIsInternational() && type == "round_trip";
			const flightsInterRT = [
				{
					origin: originCode,
					destine: destineCode,
					departure_date: date
				}
			];
			if (isInterRT && dateReturn !== "null") {
				flightsInterRT.push({
					origin: destineCode,
					destine: originCode,
					departure_date: dateReturn
				});
			}

			const params = {
				flights: isInterRT ? flightsInterRT : flights,
				travelers: this.addPax(adults, children, babies),
				type: type == "trip" ? "OW" : "RT",
				code_discount: code_discount || ""
			};

			request(url, params).then((res) => {
				let d = [];
				res && res.results
					? res.results.map((result: IResult<any>, idx) => {
							result.flights.map((f, fidx) => {
								switch (result.source) {
									case "Amadeus":
										d[fidx] = Object.assign(
											flightAmadeus(result, fidx),
											d[fidx]
										);
										searchIdList.push(result.id);
										break;
									case "NDC":
										d[fidx] = Object.assign(
											flightNDC(result),
											d[fidx]
										);
										searchIdList.push(result.id);
										break;
									case "KIU":
										d[fidx] = Object.assign(
											flightKIU(result),
											d[fidx]
										);
										searchIdList.push(result.id);
										break;
								}
							});
					  })
					: (d = undefined);
				d
					? d.forEach(
							(item, idx) =>
								(d[idx] = Object.assign(
									{
										summary: res.summary,
										searchIdList,
										isInterRT,
										isInter
									},
									item
								))
					  )
					: null;

				resolve(d);
			});
		});
	};

	public Filter(filterParams: IFiltersRequestBody) {
		return new Promise((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/flight/filtersearch`;
			const searchIdList = [];
			request(url, filterParams).then((res) => {
				let d = [];
				res
					? res.results.map((result: IResult<any>) => {
							switch (result.source) {
								case "Amadeus":
									d[0] = Object.assign(
										flightAmadeus(result),
										d[0]
									);
									searchIdList.push(result.id);
									break;
								case "NDC":
									d[0] = Object.assign(
										flightNDC(result),
										d[0]
									);
									searchIdList.push(result.id);
									break;
								case "KIU":
									d[0] = Object.assign(
										flightKIU(result),
										d[0]
									);
									searchIdList.push(result.id);
									break;
							}
					  })
					: (d = undefined);
				d[0] = Object.assign({ searchIdList }, d[0]);
				resolve(d);
			});
		});
	}

	public AmadeusBrands(
		id: string,
		selected: string,
		selectedReturn: string = null
	) {
		// id is the offer_id
		// selected is the offer_item_id
		const url = `${this.urlBifrost}/bifrost/v1/flight/upsell_flight`;
		const params = {
			upsell_flights: [
				{
					id,
					selected
				}
			]
		};

		if (selectedReturn) {
			params["upsell_flights"].push({
				id,
				selected: selectedReturn
			});
		}

		return request(url, params);
	}

	public Pay(
		paymentType: string,
		localFlightRecord: string = "",
		paymentInfo: any = null
	) {
		const P2P_STATUS = {
			Approved: "Aprobada",
			Failed: "Fallida",
			Declined: "Declinada",
			Pending: "Pendiente"
		};

		switch (paymentType) {
			case "CREDIT":
				return request(`${this.urlBifrost}/bifrost/v1/payment`, {
					record_data: localFlightRecord,
					post_data: paymentInfo.post_data
				}).then((res) => {
					const p2pResponseStatus =
						res["results"][0]["x_response_reason_text"];

					if (!res || res["results"][0]["x_response_code"] !== "1") {
						return {
							status: false,
							message:
								p2pResponseStatus || "Ocurrió un error interno",
							p2p: null,
							redirect: "myReserve"
						};
					}

					// TODO businessName should depend on the client business configuration
					const p2pInformation = res["results"].map(
						(p2pResponse) => ({
							businessName: "T y T Empresarios Online",
							datetime: new Date().toISOString(),
							state: p2pResponse["x_response_code"],
							reference: p2pResponse["x_invoice_num"],
							cus: p2pResponse["x_approval_code"],
							consecutive: p2pResponse["x_transaction_id"],
							price:
								Number(p2pResponse["x_amount"]) -
								Number(p2pResponse["airport_tax"]),
							airportTax: p2pResponse["airport_tax"],
							adminTax: p2pResponse["admin_fee"],
							totalPrice: Number(p2pResponse["x_bank_amount"]),
							message: p2pResponse["x_reponse_reason_text"],
							franchise: p2pResponse["x_franchise"],
							bank: p2pResponse["x_bank_name"],
							fees: paymentInfo.post_data.cc_number_fees,
							name:
								p2pResponse["x_first_name"] +
								" " +
								p2pResponse["x_last_name"],
							email: p2pResponse["x_email"]
						})
					);

					if (p2pResponseStatus === P2P_STATUS.Approved) {
						return this.Emit(localFlightRecord).then((response) => {
							if (!response) {
								return {
									status: false,
									message: "emit failed",
									p2p: p2pInformation,
									redirect: "thanksPage"
								};
							}

							return {
								status: true,
								message: p2pResponseStatus,
								p2p: p2pInformation,
								redirect: "thanksPage"
							};
						});
					} else {
						return {
							status: false,
							message: p2pResponseStatus,
							p2p: p2pInformation,
							redirect: "thanksPage"
						};
					}
				});
			case "PSE":
				window.location.href =
					"https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4821";
				break;
			case "BANK":
				Router.push("/tienda/mis-reservas");
				break;
			case "AFTER":
				Router.push("/tienda/mis-reservas");
				break;
		}
	}

	public Emit(localFlightRecord: string) {
		return request(`${this.urlBifrost}/bifrost/v1/flight/emit`, {
			record: localFlightRecord
		});
	}

	public CustomerRequestCall(fieldsValue: any) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlVision_sevice}/vision/v1/request/call`;
			const params = {
				name: fieldsValue.name,
				lastname: fieldsValue["last-name"],
				phone: fieldsValue.phone
			};

			request(url, params).then((res) => {
				resolve(res);
			});
		});
	}

	public CustomerRequestContact(fieldsValue: any) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlVision_sevice}/vision/v1/request/contact`;
			const params = {
				name: fieldsValue.name,
				lastname: fieldsValue["last-name"],
				phone: fieldsValue.phone,
				email: fieldsValue.email,
				request: fieldsValue.request
			};

			request(url, params).then((res) => {
				resolve(res);
			});
		});
	}

	private addPax = (adt: any, chd: any, inf: any) => {
		const trav = [];
		for (let i = 0; i < adt; i++) {
			trav.push("ADT");
		}
		for (let i = 0; i < chd; i++) {
			trav.push("CHD");
		}
		for (let i = 0; i < inf; i++) {
			trav.push("INF");
		}
		return trav;
	};

	public SubscribeResquest(fieldsValue: any) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlVision_sevice}/vision/v1/subscribe`;
			let params;
			try {
				params = {
					name: fieldsValue.name,
					city: fieldsValue.city,
					email: fieldsValue.email,
					phone: fieldsValue.phone
				};
			} catch {
				reject(false);
				return;
			}

			request(url, params).then((res) => {
				resolve(res);
			});
		});
	}

	public PaymentReference(reference: any) {
		return new Promise<any>((resolve, reject) => {
			const url = `${this.urlBifrost}/bifrost/v1/payment/search_reference?payment_reference=${reference}`;
			let params = {
				method: "GET",
				"Content-Type": "application/json"
			};

			fetch(url, params)
				.then(async (res) => {
					const data = await res.json();
					resolve(data);
				})
				.catch((err) => {
					resolve({ error: err });
				});
		});
	}

	public PayByReference(
		paymentType: string,
		paymentReference: string = "",
		paymentInfo: any = null
	) {
		const P2P_STATUS = {
			Approved: "Aprobada",
			Failed: "Fallida",
			Declined: "Declinada",
			Pending: "Pendiente"
		};

		switch (paymentType) {
			case "CREDIT":
				return request(
					`${this.urlBifrost}/bifrost/v1/payment/reference`,
					{
						payment_reference: paymentReference,
						post_data: paymentInfo.post_data
					}
				).then((res) => {
					// Convert the response to array to handle below
					if (!Array.isArray(res["results"])) {
						res["results"] = [res["results"]];
					}

					const p2pResponseStatus = res["results"]
						? res["results"][0]["x_response_reason_text"]
						: "";

					if (!res || res.error) {
						return {
							status: false,
							message: res.error || "Ocurrió un error interno",
							p2p: null
						};
					}

					const p2pInformation = res["results"].map(
						(p2pResponse) => ({
							businessName: "T y T Empresarios Online",
							datetime: new Date().toISOString(),
							state: p2pResponse["x_response_code"],
							reference: p2pResponse["x_invoice_num"],
							cus: p2pResponse["x_approval_code"],
							consecutive: p2pResponse["x_transaction_id"],
							price:
								Number(p2pResponse["x_amount"]) -
								Number(p2pResponse["airport_tax"]),
							airportTax: p2pResponse["airport_tax"],
							adminTax: p2pResponse["admin_fee"],
							totalPrice: Number(p2pResponse["x_bank_amount"]),
							message: p2pResponse["x_reponse_reason_text"],
							franchise: p2pResponse["x_franchise"],
							bank: p2pResponse["x_bank_name"],
							fees: paymentInfo.post_data.cc_number_fees,
							name:
								p2pResponse["x_first_name"] +
								" " +
								p2pResponse["x_last_name"],
							email: p2pResponse["x_email"]
						})
					);

					if (p2pResponseStatus === P2P_STATUS.Approved) {
						return {
							status: true,
							message: p2pResponseStatus,
							p2p: p2pInformation,
							redirect: true
						};
					} else {
						return {
							status: false,
							message: p2pResponseStatus,
							p2p: p2pInformation,
							redirect: true
						};
					}
				});
			case "PSE":
				window.location.href =
					"https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4821";
				break;
			case "BANK":
				Router.push("/");
				break;
			case "AFTER":
				Router.push("/");
				break;
		}
	}
}
