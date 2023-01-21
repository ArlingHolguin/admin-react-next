import { Row, Col, Input, Button, Carousel, Modal } from "antd";
import "../../assets/page/main.less";
import "../../assets/global.less";
import { useState } from "react";
import Subscription from "../forms/subscription";
import Title from "../text/Title";
import Terms from "../../pages/terms";

const SubscriptionSection = (props) => {
  const [showTermsModal, setShowTermsModal] = useState(false);

	return (
    <Row
      type="flex"
      justify="space-between"
      align="middle"
      className="margin"
    >
      <Modal
				title="Terms"
				visible={showTermsModal}
				onCancel={() => setShowTermsModal(!showTermsModal)}
				onOk={() => setShowTermsModal(!showTermsModal)}
				cancelButtonProps={{ disabled: true } }
				width="80%"
				bodyStyle={{
					height: '500px',
					overflowY: 'scroll'
				}}
			>
        <Terms/>
      </Modal>
      <Col lg={8} md={24} sm={24} xs={24} style={{display: 'flex', justifyContent: "center"}}>
        <div className="contentImgProm">
          <img
            className="imgProm"
            src="/static/img/playa.png"
          />
        </div>
      </Col>
      <Col lg={14} md={24} sm={24} xs={24} >
        <div className="rowTextProm">

          <Title 
            text="No te pierdas la oportunidad de despegar con nuestras promociones exclusivas a cualquier destino"
            textStyle={{color: "#FFFFFF"}}
            className="text-prom"
          />

          <Row type="flex" justify="space-between" className="rowSubsForm">
            <Col lg={24} md={17} sm={15} xs={15} style={{padding: "0px 10px"}}>
              <Subscription handleClickTerms={() => setShowTermsModal(true)} />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
	);
};

export default SubscriptionSection;
