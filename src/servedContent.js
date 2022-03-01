import React, { useRef, useState, useContext } from "react";
import { DataContext } from "./App";
import WaitingList from "./waitingList";
import Popup from "./popup";
import empty from "is-empty";


const ServedContent = () => {
	const orderNum = useRef(0);
	const concatNum = useRef(0);
	const [spaceOver,setSpaceOver] = useState(false);
	const { setFloor, floor, orders, sits, setLastOrder,waitingJSON  } = useContext(DataContext);
	const [popup,setPopup] = useState({show:false,data:""})

	const handleSpaceOver = ()=>{
		 setSpaceOver(true);
		 setLastOrder(true);
	}
	const handleSits = num => {
		let order = {...orders[num]},orderId = order.Mobile, tableIndex = -1,updateFloor = {},orderDiners = 0,floorDiners = 0,diners = 0,tableDiners = 0,isConcat = false;
		sits[orderId].map((table, index) => {
			tableIndex = floor.findIndex(o => table == o.Table);
			if (tableIndex == -1) {
				handleSpaceOver();
				  return null;
			}
			updateFloor = [...floor];
			orderDiners = order.Diners;
			floorDiners = updateFloor[tableIndex].Diners;

			if (sits[orderId].length > 1) {
				if (index == 0) {
					diners = orderDiners - floorDiners;
					concatNum.current++;
					isConcat = true;
				}
				tableDiners = index == 0 ? floorDiners : diners;
				order.Diners = tableDiners;
			}
			if (isConcat) updateFloor[tableIndex].concatId = concatNum.current;
			updateFloor[tableIndex].order = { ...order };
		});
		if(!spaceOver && tableIndex!= -1) setFloor(updateFloor);
	};

	let witingJson = <pre>{JSON.stringify(waitingJSON,null,4)}</pre>
	return (
		<div className="list">
 { popup.show && <Popup data={popup} close={()=>{setPopup({show:false})}}/>}
			<div className={"waitingList"}>
			<button className="jsonButton"
			disabled ={empty(waitingJSON)}
					onClick={()=>{setPopup({show:true,data:witingJson})}}>
					Waiting List JSON
				</button>
			<div>
				<button
				disabled ={spaceOver}
					onClick={() => {
						handleSits(orderNum.current++);
					}}>
					Click To Seat
				</button> {spaceOver && <span className={"outSpace"}>Out Of Free Tables</span>}
				</div>
			<div>	<WaitingList /> </div>
			</div>
		</div>
	);
};
export default ServedContent;
