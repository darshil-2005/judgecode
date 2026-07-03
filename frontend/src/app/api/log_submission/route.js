const { db, submissions } = require("@leetclone/backend");

export async function POST(req) {

        const body = await req.json();
        let { submissionId, userId, problemId, code, status, result }=body;

        try {

            await db.insert(submissions).values({
                submissionId: submissionId,
                userId: userId,
                problemId: problemId,
                code: code,
                status: status,
                result: result,
            });
            
        } catch (error) {

            console.log('hey', error)
            
        }
    
        return Response.json({message: 'Submission logged!!'}, {status: 200});

}



