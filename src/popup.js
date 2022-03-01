import React, { useEffect, useRef, useState } from "react";

const Popup = props => {
	const { data,show } = props.data;
	const more = useRef();
	useEffect(() => {}, []);

	return (
		<div onClick={props.close} className="popup">
			<div className="item">
				<div className="close" onClick={props.close} />
				{data}
			</div>
		</div>
	);
};

export default Popup;
