import { Row, Col, Button } from "antd";

const PromBanner = ({order}) => {

	return (
		<Col md={24} sm={24} xs={24} style={{ order: order}} className="card-prom benefits">
      <Row type="flex" className="corporative">
        <img src="/static/img/corporativo.svg" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: 32,
              lineHeight: 1,
              fontWeight: 300
            }}
          >
            Conoce nuestros beneﬁcios corporativos
          </p>
          <Button
            target="blank"
            href="https://gocorporativo.com"
            className="btnInfo"
            size="small"
            shape="round"
            style={{
              fontWeight: 800,
              backgroundColor: "#ABCF37"
            }}
          >
            Más información
          </Button>
        </div>
      </Row>
  </Col>
	);
};
export default PromBanner;
