import { Col, Form, Input, Row, Button } from "antd";
import Service from "../../services";
import Notification from "../../lib/customNotifications";

const service = new Service();

const SubscriptionForm = ({ form, handleClickTerms }) => {
  const notification = new Notification();
	const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;

	const sanitizeData = () => {
		const { name, city, email, phone } = getFieldsValue();
		return {
      name,
			city,
			email,
      phone,
		};
	};

	const submitForm = () => {
		let fieldsData;
		validateFieldsAndScroll(async (errors) => {
			if (!errors) {
				fieldsData = sanitizeData();
        const resp = await service.SubscribeResquest(fieldsData)
        if(!resp || resp.error){
          notification.Error(
            "Ha ocurrido un problema",
            "Porfavor intentalo de nuevo!"
          )
        } else {
          resetFields()
          notification.Success(
            "Suscripcion Exitosa",
            "Recibirás promociones exclusivas!!"
          )
        }
			} else {
				fieldsData = { error: true };
			}
		});
	};

	return (
		<Form layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item label="Nombre" style={{margin: 0}}>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su nombre!"
                  }
                ]
              })(
              <Input 
                placeholder="Ingrese su nombre completo"
                style={{
                  borderRadius: 20,
                  width: "100%"
                }} 
              />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={1} lg={1} />
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item label="Ciudad" style={{margin: 0}}>
              {getFieldDecorator("city", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su ciudad!"
                  }
                ]
              })(
              <Input
                type=""
                placeholder="Ingrese su ciudad"
                style={{
                  borderRadius: 20,
                  width: "100%"
                }} 
              />)}
            </Form.Item>
          </Col>
        </Row>
			  <Row type="flex">
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item label="Email" style={{margin: 0}}>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su email!"
                  }
                ]
              })(
              <Input 
                placeholder="Ingrese su email"
                style={{
                  borderRadius: 20,
                  width: "100%"
                }} 
              />)}
            </Form.Item>
            <p className="textPolitics">
              Recibirás emails promocionales de
              Tiquetes y Tiquetes. Para más
              información consulta las{" "}
              <span style={{ color: "#891A1C", cursor: 'pointer' }} onClick={handleClickTerms}>
                políticas de privacidad
              </span>
              .
            </p>
          </Col>
          <Col xs={0} sm={0} md={1} lg={1} />
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item label="Telefono" style={{margin: 0}}>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese su telefono!"
                  }
                ]
              })(
              <Input 
                placeholder="Ingrese su telefono"
                style={{
                  borderRadius: 20,
                  width: "100%"
                }} 
              />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} >
            <Button
              type="primary"
              style={{ backgroundColor: "#891A1C", marginTop: '28px', marginLeft: '10px' }}
              shape="round"
              size="default"
              onClick={() => submitForm()}
            >
              !Quiero recibirlas¡
            </Button>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} >
            <Row style={{padding: "10px 0px"}}></Row>
          </Col>
        </Row>
		</Form>
	);
};

const Subscription = Form.create<Props>({ name: "suhbscription_form" })(
	SubscriptionForm
);
export default Subscription;

export interface Props {
	form: any;
  handleClickTerms: Function;
}