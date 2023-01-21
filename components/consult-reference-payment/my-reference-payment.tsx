import { Row, Tabs, Affix, Collapse, Button, Col } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../../assets/components/consult-reservation/reserve.less";
import Service from "../../services";
import Notification from "../../lib/customNotifications";
import useWindowDimensions from "../../hooks/useWindowsDimension";
import Spinner from "../spinner/spinner";
import ReferenceDetails from "./child/ReferenceDetails";
import PaymentInfo from "./child/paymentInfo";
import Payment from "../payments/payment";
import organizePaymentInfo from "../../lib/payInfo";

const notification = new Notification();
const service = new Service();

const MyReservation = ({ reference}) => {
	const router = useRouter();
	const [ip, setIp] = useState("");
	const { width } = useWindowDimensions();
	const [referenceData, setReferenceData] = useState(null);
	const [showPayment, setShowPayment] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	const handleSubmit = (paymentType, { terms, creditCardInfo }) => {
		try {
			setIsLoading(true);
			const paymentInfo = organizePaymentInfo(creditCardInfo, terms, ip);
			service
				.PayByReference(paymentType, referenceData.data.reference, paymentInfo)
				.then(({ status, message, p2p, redirect }) => {

					window.sessionStorage.setItem(
						"p2pInformationPaymentReference",
						JSON.stringify(p2p)
					);

					if (redirect) {
						router.push('/tienda/pagos-gracias').then(() => setIsLoading(false))
					} 

					if (!status) {
						notification.Info(
							"¡Ooops, algo salió mal!",
							`${message}, por favor comunícate con nuestros asesores`
						);
            !redirect && setIsLoading(false);
						return;
					} else {
            notification.Success(
							"¡Pago exitoso!",
							`${message}`
						);
            return;
          }
				});
		} catch (e) {
			setIsLoading(false);
			notification.Info(
				"¡Ooops, algo salió mal!",
				`por favor comunícate con nuestros asesores`
			);
			return;
		}
	};

	useEffect(() => {
    setIsLoading(true)
    const getPaymentReferenceData = async () => {
      try{
        const res = await service.PaymentReference(reference)
        setIsLoading(false);
				if(!res.data || !res.data.reference_data){
					notification.Info(
						"¡Ooops, algo salió mal!",
						`Porfavor vuelve a intentarlos, no existe informacion para esa referencia`
					);
					setIsLoading(false);
					router.push('/tienda/pago-referencia')
					return;
				}
        setReferenceData({
          data: res.data.reference_data,
          payments: res.data.payments
        })
      } catch {
				notification.Info(
					"¡Ooops, algo salió mal!",
					`Porfavor vuelve a intentarlos`
				);
				setIsLoading(false);
				router.push('/tienda/pago-referencia')
				return;
      }
      
    }
		const getIpAddress = async () => {
			const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
			const data = await res.text();
			let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
			const ipAddress = data.match(ipRegex)[0];
			setIp(ipAddress);
		};

		getIpAddress();
    getPaymentReferenceData();
	}, []);

  useEffect(() => {
    if(referenceData){
      mustShowPayment()
    }
  }, [referenceData])

	const mustShowPayment = () => {
		const someAprovved = referenceData?.payments.some((pay) =>
				["aprobada"].includes(
					pay.transaction_status.toLowerCase()
				)
		);
		setShowPayment(!someAprovved);
	};

	const handleClickNewSearch = () => {
		router.push('/tienda/pago-referencia')
	}


	if(isLoading){
		return (
			<Spinner visible={isLoading} type={6} />
		)
	}


	return (
		<Row type="flex" justify="center">
			<Row type='flex' justify='space-between' className="head-row">
				<Col>
					<h4>Referencia de pago:</h4>
					<h4 className="local-code">{reference}</h4>
				</Col>
				<Col>
					{width > 470 ? (
						<Button type="primary" onClick={handleClickNewSearch} icon="search">
							Nueva Búsqueda
						</Button>
					) : (
						<Button type="primary" onClick={handleClickNewSearch} shape='circle' icon="search" />
					)}
				</Col>
			</Row>
      {referenceData && (
        <>
          {referenceData && <ReferenceDetails data={referenceData.data}/> }
          <Row style={{ width: "100%" }}>
            <PaymentInfo data={referenceData.payments} />
          </Row>
          {showPayment && (
            <div id="payments-container">
              <h2>Selecciona un método de pago</h2>
              <Payment width="70%" submitPayment={handleSubmit} hide={["AFTER"]} myReserves />
            </div>
          )}
        </>
      )}
			
		</Row>
	);
};

export default MyReservation;
