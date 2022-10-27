export async function get({ params }): Promise<any> {
	// I'm healthy !!
	return {
		body: {
			status: "OK",
		},
	};
}
