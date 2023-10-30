const baseUrl = "https://one00x-data-analysis.onrender.com/assignment";

const getData = async () => {
	try {
		const response = await fetch(`${baseUrl}?email=engineer.rohit18patil@gmail.com`);
		const data = await response.json();
		const assignmentId = response.headers.get('x-assignment-id');

		return {
			assignmentId,
			data,
		}
	} catch (err) {
		console.error("Error: " + err.message);
		return null;
	}
};

const submitData = (assignmentId, mostUsedJargons) => {
	const getJargonResponse = (jargon) => {
		return new Promise((resolve, reject) => {
			fetch(baseUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					assignment_id: assignmentId,
					answer: jargon,
				}),
			})
				.then((response) => {
					if (!response.ok) {
						console.error('Failed to submit the data');
						reject(new Error('Failed to submit the data'));
					}
					return response.json();
				})
				.then((data) => {
					console.log(`Response for the jargon "${jargon}":`);
					console.log(data);
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	};

	const promises = mostUsedJargons.map(getJargonResponse);

	return Promise.all(promises);
};

const analyseData = async () => {
	const { data = [], assignmentId = '' } = await getData();

	let jargonTerms = new Map();

	data.forEach((item) => {
		if (jargonTerms.has(item)) {
			const jargonCount = jargonTerms.get(item);
			jargonTerms.set(item, jargonCount + 1);
		} else {
			jargonTerms.set(item, 1);
		}
	})

	let jargonMaxCount = 1;

	for (const count of jargonTerms.values()) {
		if (count > jargonMaxCount) {
			jargonMaxCount = count;
		}
	}

	let mostUsedJargons = [];

	jargonTerms.forEach((value, key) => {
		if (value === jargonMaxCount) {
			mostUsedJargons.push(key);
		}
	})

	console.log({ mostUsedJargons });

	await submitData(assignmentId, mostUsedJargons);
}

analyseData();