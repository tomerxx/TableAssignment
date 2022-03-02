import empty from "is-empty";
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "./App";
import { tablesLocation, concatIcon } from "./sits_data";
import Popup from "./popup";

const Table = props => {
	const { setWaitingJSON, waitingJSON } =
		useContext(DataContext);
	const { Diners, Table, concatId = null, order = {} } = props.floor;
	const { Diners: orderDiners = null, Mobile = null } = order;
	const [popup, setPopup] = useState({ show: false, data: "" });
	const [color, setColor] = useState("");
	const [timeStamp, setTimeStamp] = useState({ startTime: "", endTime: "" });

	useEffect(() => {
		if (timeStamp.endTime && orderDiners)
			setWaitingJSON([
				...waitingJSON,
				{
					Mobile: Mobile,
					orderDiners: orderDiners,
					Table: Table,
					timeStamp: timeStamp,
				},
			]);
	}, [timeStamp.endTime && orderDiners]);

	useEffect(() => {
		getTime();
	}, [orderDiners]);

	function delay(milisec) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, milisec);
		});
	}

	const getTime = async () => {
		if (orderDiners) {
			setColor("red");
			setTimeStamp(prev => ({ ...prev, startTime: new Date().toString() }));
			for (let i = 0; i < 3; i++) {
				await delay(20000);
				if (i == 0) setColor("orange");
				if (i == 1) setColor("yellow");
				if (i == 2) {
					setColor("green");
					setTimeStamp(prev => ({ ...prev, endTime: new Date().toString() }));
				}
			}
		}
	};
	const sitsTop = [];
	const sitsBottom = [];

	for (let i = 0; i < orderDiners; i++) {
		let pos = i % 2 == 0;
		pos
			? sitsTop.push(<div key={`top${i}`} className={`sit top`}></div>)
			: sitsBottom.push(
					<div key={`bottom${i}`} className={`sit bottom`}></div>,
			  );
	}

	const showDetails = () => {
		if (empty(orderDiners)) return;
		setPopup({ show: true, data: tableData });
	};
	let tableData = (
		<div class="orderDetails">
            <div>
			<label>Mobile:</label>
			<span class="mobile">{Mobile}</span>
            </div><div>
			<label>Diners:</label>
			<span>{orderDiners}</span>
            </div><div>
			<label>Time Start:</label>
			<span>{timeStamp ? timeStamp.startTime : ""}</span>
            </div>
		</div>
	);
	const top = tablesLocation[Table][0];
	const left = tablesLocation[Table][1];
	return (
		<div>
			{popup.show && (
				<Popup
					data={popup}
					close={() => {
						setPopup({ show: false });
					}}
				/>
			)}
			<div
				onClick={showDetails}
				className={`table type_${Diners} color_${color}`}
				style={{ top: top, left: left }}>
				{concatId && (
					<div className={`concat  color_${concatId}`}>
						<i className={`fa-solid  ${concatIcon[concatId]}`}></i>
					</div>
				)}
				<div className={`content top `}>{sitsTop}</div>
				{Diners}
				<div className={"content bottom"}>{sitsBottom}</div>
			</div>
		</div>
	);
};

export default Table;
