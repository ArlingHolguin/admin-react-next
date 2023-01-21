import "./search.less";
import { Tabs } from "antd";
import { useState } from "react";
import TabSearch from "./childs/tab-search";
import ContentHoteles from "./childs/content-hotels";
import ContentVuelos from "./childs/content-vuelos";
import { Button } from "antd";

const { TabPane } = Tabs;

const ContentTab = (props) => (
	<div style={{ padding: 12 }}>{props.children}</div>
);



const Search = (props) => {
	const [tabActived, setActive] = useState(2);
	return (
		<div className="content">
			<Tabs
				style={{ width: "100%" }}
				className="search-tab"
				type="card"
				defaultActiveKey="1"
				onChange={(index) => setActive(parseInt(index))}
				tabBarGutter={0}>
				<TabPane
					tab={
						<TabSearch
							image="/static/img/hotel.svg"
							text="Hoteles"
							active={tabActived}
							keyPanel="1"
						/>
					}
					key="1">
					<ContentTab>
						<ContentHoteles data={props.data} />
					</ContentTab>
				</TabPane>
				<TabPane
					tab={
						<TabSearch
							image="/static/img/vuelos.svg"
							text="Vuelos"
							active={tabActived}
							keyPanel="2"
						/>
					}
					key="2">
					<ContentTab>
						{/*motor de busqueda de vuelos */}
						<ContentVuelos data={props.data} />
					</ContentTab>
				</TabPane>
				<TabPane
					tab={
						<TabSearch
							image="/static/img/maleta.svg"
							text="Multi vuelo"
							active={tabActived}
							keyPanel="3"
						/>
					}
					key="3">
					Content of Tab Pane 3
				</TabPane>
				<TabPane
					tab={
						<TabSearch
							image="/static/img/medico.svg"
							text="Seguros"
							active={tabActived}
							keyPanel="4"
						/>
					}
					key="4">
					Content of Tab Pane 3
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Search;
