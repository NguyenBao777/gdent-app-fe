import React from "react";
import { motion } from "framer-motion";

const Alert = ({ alert }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			className={`fixed z-30 top-6 right-1 w-150 md:w-300 my-4 rounded-sm px-4 py-2 border-2 text-white ${
				alert?.type === "error" ? "bg-red-200 border-red-600" : "border-green-600 bg-green-200"
			}`}
		>
			{alert?.message} <span className="invisible">*</span>
		</motion.div>
	);
};

export default Alert;
