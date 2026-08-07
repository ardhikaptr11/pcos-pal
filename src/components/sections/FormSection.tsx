"use client";

import { PredictionResponse } from "@/lib/action";
import { ClientFormInputs } from "@/types/form";
import { useEffect, useState } from "react";
import { Payload } from "../layout/Content";
import LeftSidebar from "../LeftSidebar";
import Forms from "../forms/Forms";

interface PropsType {
	setPredictionResult: (result: PredictionResponse | null) => void;
	setRawPayload: (payload: Payload | null) => void;
}

const FormSection = ({ setPredictionResult, setRawPayload }: PropsType) => {
	const [activeSection, setActiveSection] = useState("basics");
	const [bmi, setBmi] = useState<number | null>(null);

	const [hasResult, setHasResult] = useState(false);

	const handleAssessmentComplete = (result: PredictionResponse, payload: Payload) => {
		setPredictionResult(result);
		setRawPayload(payload);
		setHasResult(true);
	};

	const handleReset = () => {
		setPredictionResult(null);
		setRawPayload(null);
		setHasResult(false);
	};

	const handleFormValuesChange = ({
		weight,
		height
	}: {
		weight: ClientFormInputs["weight_kg"];
		height: ClientFormInputs["height_cm"];
	}) => {
		const w = parseFloat(weight);
		const h = parseFloat(height);

		if (w > 0 && h > 0) {
			const heightInMeters = h / 100;
			const calculatedBmi = w / (heightInMeters * heightInMeters);

			if (calculatedBmi >= 10 && calculatedBmi <= 40) {
				setBmi(Number(calculatedBmi.toFixed(1)));
			} else {
				setBmi(null);
			}
		} else {
			setBmi(null);
		}
	};

	// Scroll spy logic
	useEffect(() => {
		const sections = ["basics", "symptoms", "advanced", "result"];
		const handleScroll = () => {
			let current = "basics";
			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 150) {
						current = section;
					}
				}
			}
			setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="px-6 lg:px-10 pb-12">
			<div className="editorial-grid">
				<LeftSidebar bmi={bmi} activeSection={activeSection} hasResult={hasResult} />
				<Forms
					onValuesChange={handleFormValuesChange}
					onAssessmentComplete={handleAssessmentComplete}
					onReset={handleReset}
				/>
			</div>
		</section>
	);
};

export default FormSection;
