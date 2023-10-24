const baseUrl = "https://one00x-data-analysis.onrender.com";

let assignmentId;

const getData = async () => {
    const response = await fetch(`${baseUrl}/assignment?email=engineer.rohit18patil@gmail.com`, {
        headers: {
            'x-assignment-id': assignmentId
        },
        method: 'GET',
    });
    // console.log({ response });
    const data = await response.json();
    console.log({ data: response.headers.get('x-assignment-id') });
    return data;
};

getData();