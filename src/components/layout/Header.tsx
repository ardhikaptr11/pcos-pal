import Image from "next/image";

interface HeaderProps {
	title: string;
	subtitle: string;
}

export const Header = (props: HeaderProps) => {
	const { title, subtitle } = props;

	return (
		<header className="bg-white border-b border-rose-soft">
			<div className="max-w-310 mx-auto px-6 lg:px-10 py-5">
				<div className="flex items-center">
					<Image src="/pcos-pal-logo.png" width={60} height={60} alt="PCOS Pal Logo" priority />
					<div className="leading-none">
						<h1 className="font-serif text-xl text-terracotta">{title}</h1>
						<div className="text-[10px] uppercase tracking-[0.24em] text-rose mt-0.5">{subtitle}</div>
					</div>
				</div>
			</div>
		</header>
	);
};
