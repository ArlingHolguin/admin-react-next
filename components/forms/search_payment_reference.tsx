import { Button, Form, Input, Row, Icon } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Service from "../../services";
import "../../assets/components/forms/search_payment_reference.less";

const ConsultPaymentReferenceForm = ({
    form
}) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const [isLoading, setIsLoading] = useState(false);
    const [isConsultDisabled, setIsConsultDisabled] = useState(true);

    const router = useRouter();

    const handleSubmit = (e: any) => {
      e.preventDefault();
      setIsLoading(true);

      const fieldsValue = getFieldsValue()
      router.push("/tienda/pago-referencia?referencia="+fieldsValue.payment_reference)
	  };

    useEffect(() => {
		const emptyValues = Object.values(getFieldsValue()).filter(
			(val) => val == "" || val == " " || val == undefined
		);
		setIsConsultDisabled(emptyValues.length == 0 ? false : true);
	}, [getFieldsValue()]);

    return (
        <Row className="consult-payment-reference">
            <Row className="extra-info">
				<h4 style={{ color: "#555" }}>
					Para realizar el pago ingrese los datos de la siguiente
					manera:
				</h4>
				<br />
				<h4 style={{ color: "#555" }}>
					Ingrese su referencia de pago: por ejemplo{" "}
					<span style={{ color: "#DF395D" }}>TQSWYZ</span>
				</h4>
			</Row>

            <Row className="consult-payment-reference-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Item colon={false} label="Referencia de Pago">
                        {getFieldDecorator("payment_reference", {
                            rules: [{
                                required: true,
                                message: "La referencia de pago es obligatoria!"
                            }],
                            initialValue: router.query.reference
                        })(<Input />)}
                    </Form.Item>
                    <Button
                        disabled={isConsultDisabled}
                        loading={isLoading}
                        htmlType="submit"
                        type="primary"
                        block
                    >
                        Consultar
                    </Button>
                </Form>
            </Row>
        </Row>
    )
}

const SearchPaymentReference = Form.create<Props>({name: "consult_payment_reference"})(
    ConsultPaymentReferenceForm
);
export default SearchPaymentReference;
interface Props {
	form: any;
}
