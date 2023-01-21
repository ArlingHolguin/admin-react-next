import { Row, Col, Form, Radio, Table, Checkbox } from "antd";
import { useState } from "react";
import "../../assets/components/consult-reservation/reserve.less";
import { IPassenger } from "../../models/misReservas.model";

interface Props {
	pax: IPassenger[];
}

const Ancilaries: React.FC<Props> = ({ pax }) => {
	const [isOpen, setIsOpen] = useState(false);

	const SelectService = () => (
		<Form.Item>
			<Checkbox />
		</Form.Item>
	);

	const showAncilaries = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Row type="flex" justify="space-between" align="top">
			<Col onClick={showAncilaries} id="ancilaries-title">
				<h4 id="ancilaries-icon">?</h4>
				<h4 style={{ fontSize: "1.5em" }}>Adicionales</h4>
			</Col>
			{isOpen && (
				<>
					<Col id="ancilaries-form">
						<Form style={{ margin: "5% 0" }}>
							<Table
								pagination={false}
								size="small"
								rowKey={(_, idx) => "pax" + idx}
								dataSource={pax}
								bordered
							>
								<Table.Column dataIndex="name" title="" />
								<Table.Column
									render={SelectService}
									title={
										<span className="ancilaries">
											<img src="/static/img/ancilaries/dog.png" />
										</span>
									}
								/>
								<Table.Column
									render={SelectService}
									title={
										<span className="ancilaries">
											<img src="/static/img/ancilaries/bag.png" />
										</span>
									}
								/>
								<Table.Column
									render={SelectService}
									title={
										<span className="ancilaries">
											<img src="/static/img/ancilaries/surf-table.png" />
										</span>
									}
								/>
								<Table.Column
									render={SelectService}
									title={
										<span className="ancilaries">
											<img src="/static/img/ancilaries/bycicle.png" />
										</span>
									}
								/>
							</Table>
						</Form>
					</Col>
					<Col id="ancilaries-price">
						<h4 className="bold">{/*change*/}$45.000</h4>
					</Col>
				</>
			)}
		</Row>
	);
};

export default Ancilaries;
