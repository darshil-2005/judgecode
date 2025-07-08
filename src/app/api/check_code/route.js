const dockerRunner = require('@/../lib/dockerRunner');
const {db} =require('@/../lib/db')
const {submit_testcases} = require('@/../lib/schema')
const {eq} = require('drizzle-orm')



export async function POST(req) {

    const body = await req.json();
    const { problemId, mode, testcases, function_name, params_types, return_type, code, language, time_limit, memory_limit }=body;

    try {

        if (mode=='run') {

            if ((testcases.length)<1) {
                return Response.json({error: 'Nothing to test!!'}, {status: 400})
            }
    
            const results = await dockerRunner(problemId, code, testcases, language, params_types, return_type, function_name, time_limit, memory_limit, mode);
            
            return Response.json({ results })
        }
        else if (mode=='submit') {
    
            const dbResponse=await db.select({
                input: submit_testcases.input,
                expectedOutput: submit_testcases.expectedOutput
              }).from(submit_testcases).where(eq(problemId, submit_testcases.problemId));
    
            if (!dbResponse || dbResponse.length==0) {
                return Response.json({error: 'Testcases not found for the problem!!'}, {status: 404})
            }
    
            const results = await dockerRunner(problemId, code, dbResponse, language, params_types, return_type, function_name, time_limit, memory_limit, mode);
    
            return Response.json({ results });
    
        }
        
    } catch (error) {

        return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });        
    }

}