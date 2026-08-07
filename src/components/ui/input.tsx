import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex w-full py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-none border-0 border-b border-rose-soft bg-transparent px-0 h-10 text-espresso text-[15px] focus-visible:ring-0 focus-visible:border-rose placeholder:text-taupe-light/40",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
