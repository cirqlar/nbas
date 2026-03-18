export function throwFailedResponse(res: Response): Response {
	if (res.ok) {
		return res;
	} else {
		console.error('request failed', res.status, res);
		throw new Error('request failed with status ' + res.status);
	}
}
