import { useEffect } from "react";
import { format } from "date-fns";
import formatter from "../../../lib/priceFormatter";
import CustomSection from "../../consult-reservation/child/custom-section";
import { Icon, Row } from "antd";
import { es } from "date-fns/locale";

export const formatDates = (date: string) => {
	let day = date.substring(0, 2);
	let month = parseInt(date.substring(2, 4)) - 1;
	let year = "20" + date.substring(4, 6);
	let d = new Date(Number(year), Number(month), Number(day));

  if (date.split("-").length > 1) {
    const only_date = date.split(" ")[0];
    d = new Date(only_date);
  }

	const formatedDate = format(d, "d/MMMM/yyyy", { locale: es });

	return `${formatedDate.split("/")[0]} de ${formatedDate.split("/")[1]} de ${
		formatedDate.split("/")[2]
	}`;
};



const ReferenceDetails = ({ data }) => {

	return (
    data ? (
    <>
    <div id="resume">
      <div className="info-item">
        <h3>Fecha de creacion</h3>
        <span>{formatDates(data.created_at)}</span>
      </div>
      <div className="info-item">
        <h3>Fecha de expiracion</h3>
        <span>{formatDates(data.expiring_time)}</span>
      </div>
      <div className="info-item">
        <h3>Precio</h3>
        <span style={{ color: "#DF395D" }}>
          {formatter.format(data.price)} COP
        </span>
      </div>
      <div className="info-item">
        <h3></h3>
        <span></span>
      </div>
    </div>
    <CustomSection _Icon={<Icon type="user" />} headText="TITULAR">
      <Row className="" style={{display: 'flex', flexDirection: 'column'}}>
        <div id="resume">
          <div className="info-item">
            <h3>Nombre</h3>
            <span>{`${data.payer_firstname} ${data.payer_lastname}`.toUpperCase()}</span>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <span>{data.payer_email}</span>
          </div>
          <div className="info-item">
            <h3>Telefono</h3>
            <span>{data.payer_phone.toUpperCase()}</span>
          </div>
          <div className="info-item">
            <h3>Identificacion</h3>
            <span>{data.payer_id.toUpperCase()}</span>
          </div>
        </div>
        <div id="resume">
          <div className="info-item">
            <h3>Direccion</h3>
            <span>{data.payer_address}</span>
          </div>
          <div className="info-item">
            <h3>Ciudad</h3>
            <span>{data.payer_city.toUpperCase()}</span>
          </div>
        </div>
      </Row>
    </CustomSection>
    </> ) : <></>
	);
};

export default ReferenceDetails;
