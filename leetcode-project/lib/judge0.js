import axios from "axios";

export function getJudge0LanguageId(language) {
    const lanaugeMap = {
        "PYTHON": 71,
        "JAVASCRIPT": 63,
        "JAVA": 62,
        "CPP": 54,
        "GO": 60
    }

    return lanaugeMap[language.toUpperCase()];
}

export async function submitBatch(submissions) {
    const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base61_encoded=false`,
        { submissions })

    console.log("Batch submssion RESULT: ", data)

    return data;
}

export async function pollBatchResult(tokens) {
    while (true) {
        const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch`,
            {
                params: {
                    tokens: tokens.join(","),
                    base61_encoded: false
                }
            }
        )

        console.log("PollBatchResult: ", data);

        const results = data.submissions;

        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        )

        if (isAllDone) return results;

        await sleep(1000)

    }


}