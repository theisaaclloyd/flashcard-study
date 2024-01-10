"use client"
import { CalendarIcon } from "@radix-ui/react-icons";

import { useState, useEffect } from "react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export function NameTag() {
	const [lastUpdated, setLastUpdated] = useState("01/10/2024");
	const [lastUpdate, setLastUpdate] = useState("");


	useEffect(() => {
		const currentDate = new Date();
		const updatedDate = new Date(lastUpdated);
		const timeDiff = Math.abs(currentDate.getTime() - updatedDate.getTime());
		const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		let output = "";
		if (diffDays === 0) {
			output = "today";
		} else if (diffDays === 1) {
			output = "yesterday";
		} else if (diffDays <= 7) {
			output = `${diffDays} days ago`;
		} else if (diffDays <= 30) {
			const diffWeeks = Math.floor(diffDays / 7);
			output = `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
		} else {
			output = updatedDate.toDateString();
		}

		setLastUpdate(output);
	}, [lastUpdated]);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link">@isaacclloyd</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage src="/isaac.png" />
						<AvatarFallback>IL</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@isaacclloyd</h4>
						<p className="text-sm">Created by Isaac Lloyd - <br /> more of my projects at <a href="https://isaacclloyd.com" target="_blank" className="text-slate-700">isaacclloyd.com</a></p>
						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-xs text-muted-foreground">
								Last updated {lastUpdate}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
