import React, { useContext } from "react";
import { DataContext } from "./App";
import { concatIcon } from "./sits_data";

const WaitingList = () => {
	const { floor, orders } = useContext(DataContext);

	return (
		<div className={"waitingList"}>
			<h1> Serve Waiting List</h1>
			<div>
				{orders.map((item, index) => {
					let { Mobile, Diners } = item;
					let order = floor.find(
						o => o.order && o.order.Mobile == item.Mobile,
					);
					let s = order ? "reserved" : "";
					const { concatId } = order || {};
					return (
						<div key={`order${index}`} className={`order ${s}`}>
							<span>
								<i className="fas fa-check"></i>
							</span>
							<label>Mobile:</label>
							<span className={"mobile"}>{Mobile}</span>
							<label>Diners:</label>
							<span>{Diners}</span>
							{concatId && (
								<div className={`concat  color_${concatId}`}>
									<i
										className={`fa-solid  ${concatIcon[concatId]}`}></i>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default WaitingList;
