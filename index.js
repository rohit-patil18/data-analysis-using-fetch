const baseUrl = "https://one00x-data-analysis.onrender.com/assignment";

const getData = async () => {
	let response;
	let data;

	try {
		response = await fetch(`${baseUrl}?email=engineer.rohit18patil@gmail.com`);
		data = await response.json();
	} catch (err) {
		console.error("Error: " + err.message);
		return null;
	}

	const assignmentId = response.headers.get('x-assignment-id');

	return {
		assignmentId,
		data,
	}
};

const submitData = async (assignmentId, mostUsedJargons) => {
	let res;

	for (const jargon of mostUsedJargons) {
		try {
			res = await fetch(baseUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					assignment_id: assignmentId,
					answer: jargon,
				}),
			})
		} catch {
			console.error('Failed to submit the data');
		}

		const data = await res.json();

		console.log(`Response for the jargon "${jargon}":`);
		console.log(data);
	}
}

const analyseData = async () => {
	const { data = '', assignmentId = '' } = await getData();

	let marketingTermsObject = {};

	data.forEach((item) => {
		if (marketingTermsObject.hasOwnProperty(item)) {
			marketingTermsObject[item] += 1;
		} else {
			marketingTermsObject[item] = 1;
		}
	})

	const termUsedMaxTimes = Math.max(...Object.values(marketingTermsObject));

	let mostUsedJargons = [];

	for (const [phrase, phraseCount] of Object.entries(marketingTermsObject)) {
		if (phraseCount === termUsedMaxTimes) {
			mostUsedJargons.push(phrase);
		}
	}

	await submitData(assignmentId, mostUsedJargons);
}

analyseData();