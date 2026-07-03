const { db, submit_testcases, submissionsQueue } = require("@leetclone/backend");
const { eq } = require("drizzle-orm");
const { v4: uuid4 } = require("uuid");


export async function POST(req) {

    const body = await req.json();
    const { userId, problemId, mode, testcases, function_name, params_types, return_type, code, time_limit, memory_limit }=body;

    try {

        if (mode=='run') {

            if ((testcases.length)<1) {
                return Response.json({error: 'Nothing to test!!'}, {status: 400})
            }

            let submissionId=uuid4();

            try {    
                submissionsQueue.add('submission_queue', {userId, problemId, submissionId, code, testcases, function_name, params_types, return_type, time_limit, memory_limit, mode});
                return Response.json({message: 'Submission added to queue!!', submissionId}, {status: 200});
            } catch (error) {
                return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });                
            }

        }
        else if (mode=='submit') {
    
            const dbResponse=await db.select({
                input: submit_testcases.input,
                expectedOutput: submit_testcases.expectedOutput
              }).from(submit_testcases).where(eq(problemId, submit_testcases.problemId));
    
            if (!dbResponse || dbResponse.length==0) {
                return Response.json({error: 'Testcases not found for the problem!!'}, {status: 404})
            }
    
            let submissionId=uuid4();

            try {
                submissionsQueue.add({userId, problemId, submissionId, code, dbResponse, function_name, params_types, return_type, time_limit, memory_limit, mode});
                return Response.json({messege: 'Submission added to queue!!', submissionId}, {status: 200});
            } catch (error) {
                return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });                
            }
        }
        
    } catch (error) {

        return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });        
    }

}