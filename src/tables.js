import React, { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "./App";
import Table from "./table";

const Tables = () => {
    const {floor} = useContext(DataContext);


	return (
			<div className={"tables"}>
				{floor.map((item, index) => (
						<Table key={`table${index}`} floor={item} />
				))}
			</div>
	);
};
export default Tables;
