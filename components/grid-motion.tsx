"use client";

import { useEffect, useRef, useState } from "react";

interface GridMotionProps {
	items?: React.ReactNode[];
	gradientColor?: string;
	className?: string;
}

export function GridMotion({
	items = [],
	gradientColor = "oklch(0.42 0.12 150)",
	className = "",
}: GridMotionProps) {
	const gridRef = useRef<HTMLDivElement>(null);
	const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [mouseY, setMouseY] = useState<number | null>(null);

	const totalItems = 28;
	const defaultItems = Array.from(
		{ length: totalItems },
		(_, i) => items[i] || null
	);

	const rows = [
		defaultItems.slice(0, 7),
		defaultItems.slice(7, 14),
		defaultItems.slice(14, 21),
		defaultItems.slice(21, 28),
	];

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (gridRef.current) {
				const rect = gridRef.current.getBoundingClientRect();
				const relativeY = e.clientY - rect.top;
				setMouseY(relativeY);
			}
		};

		const handleMouseLeave = () => {
			setMouseY(null);
		};

		const grid = gridRef.current;
		if (grid) {
			grid.addEventListener("mousemove", handleMouseMove);
			grid.addEventListener("mouseleave", handleMouseLeave);
		}

		return () => {
			if (grid) {
				grid.removeEventListener("mousemove", handleMouseMove);
				grid.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	useEffect(() => {
		rowRefs.current.forEach((row, index) => {
			if (row) {
				const rowHeight = row.offsetHeight;
				const rowCenter = row.offsetTop + rowHeight / 2;
				let translateX = 0;

				if (mouseY !== null) {
					const distance = mouseY - rowCenter;
					const maxDistance = 200;
					const factor = Math.max(
						-1,
						Math.min(1, distance / maxDistance)
					);
					translateX = factor * (index % 2 === 0 ? 30 : -30);
				}

				row.style.transform = `translateX(${translateX}px)`;
				row.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
			}
		});
	}, [mouseY]);

	return (
		<div
			ref={gridRef}
			className={`relative h-full w-full overflow-hidden ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 z-10"
				style={{
					background: `
						radial-gradient(circle at center, transparent 0%, ${gradientColor} 100%),
						linear-gradient(to bottom, transparent 0%, ${gradientColor} 95%)
					`,
				}}
			/>
			<div className="flex h-full flex-col justify-center gap-4 py-8">
				{rows.map((row, rowIndex) => (
					<div
						key={rowIndex}
						ref={(el) => {
							rowRefs.current[rowIndex] = el;
						}}
						className="flex justify-center gap-4"
						style={{
							marginLeft: rowIndex % 2 === 0 ? "-20px" : "20px",
						}}
					>
						{row.map((item, colIndex) => (
							<div
								key={colIndex}
								className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card/80 p-4 text-center text-sm text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-card sm:h-28 sm:w-28 md:h-32 md:w-32"
							>
								{item}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
