export const DESIGN_TOKENS = {
	colors: {
		priority: {
			high: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
			medium: {
				bg: "bg-yellow-50",
				text: "text-yellow-600",
				dot: "bg-yellow-500",
			},
			low: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
		},
		status: {
			notStarted: { bg: "bg-gray-50", text: "text-gray-600" },
			inProgress: { bg: "bg-blue-50", text: "text-blue-600" },
			done: { bg: "bg-green-50", text: "text-green-600" },
		},
	},
	spacing: {
		card: "p-6",
		container: "p-8",
		gap: "gap-4",
	},
};
