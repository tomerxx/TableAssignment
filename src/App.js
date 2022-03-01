import React, { useState,useRef, useEffect, createContext } from "react";
import "./style/style.scss";
import Tables from "./tables";
import ServedContent from "./servedContent";
import { sits_data } from "./sits_data";

export const DataContext = createContext();

export default function App() {
	const [floor, setFloor] = useState([]);
	const [orders, setOrders] = useState([]);
	const [sits, setSits] = useState({});
	const [lastOrder, setLastOrder] = useState(false);
	const [waitingJSON, setWaitingJSON] = useState([]);
	const [endTable, setEndTable] = useState(false);

	useEffect(() => {
		fetch("./floor.json")
			.then(response => response.json())
			.then(res => {
				setFloor(res);
				fillTables();
			});
		setSits(sits_data);
	}, []);

	useEffect(() => {
		if(endTable) alert("end Table")
	}, [endTable]);

	const fillTables = () => {
		fetch("./orders.json")
			.then(response => response.json())
			.then(res => {
				setOrders(res);
			});
	};

	return (
		<div className="App">
			<div className={"container"}>
				<DataContext.Provider
					value={{
						floor: floor,
						setFloor: setFloor,
						orders: orders,
						setOrders: setOrders,
						sits: sits,
						setSits: setSits,
						setEndTable:setEndTable,
						setLastOrder:setLastOrder,
						lastOrder:lastOrder,
						setWaitingJSON:setWaitingJSON,
						waitingJSON:waitingJSON,
					}}>
					<div className={"leftContent"}>
						<ServedContent />
					</div>
					<div className={"rightContent"}>
						<Tables />
					</div>
				</DataContext.Provider>
			</div>
		</div>
	);
};