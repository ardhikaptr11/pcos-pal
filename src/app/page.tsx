"use client";

import { Fragment } from "react";

import Content from "@/components/layout/Content";
import { Header } from "@/components/layout/Header";

const HomePage = () => {
	return (
		<Fragment>
			<Header title="PCOS Pal" subtitle="Clinical screening" />
			<Content />
			{/* <Footer /> */}
		</Fragment>
	);
};

export default HomePage