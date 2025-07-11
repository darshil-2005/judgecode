"use client";

import { useState, useEffect } from "react";
import { PanelResizeHandle, Panel, PanelGroup } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import problem1 from "./problem";
import Markdown from "react-markdown";
import Example from "../example";
import Constraint from "../constraint";
import Testcase from "../testcase";
import axios from "axios";
import ViewSubmissionsButton from "../../components/ViewSubmissionsButton";

export default function ProblemPage({ params }) {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(problem?.defaultCode);
  const [testcases, setTestcases] = useState(problem?.testcases);
  const [user, setUser] = useState(123);
  const [submissionId, setSubmissionId] = useState(null);
  const [evaluationAvailable, setEvaluationAvailable] = useState(false);

  useEffect(() => {
    setProblem(problem1);
    setCode(problem1.defaultCode);
    setTestcases(problem1.testcases);
  }, []);

  function resetCode() {
    setCode(problem?.defaultCode);
  }

  async function handleSubmitCode() {
    const data = {
      userId: user,
      problemId: problem.id,
      mode: "run",
      //handle testcases properly for submit case
      testcases: testcases,
      function_name: problem.function_name,
      params_types: problem.param_types,
      return_type: problem.return_type,
      code: code,
      time_limit: 10000,
      memory_limit: problem.memory_limit,
    };

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/check_code`,
      data
    );

    if (response.status === 200) {
      setSubmissionId(response.data.submissionId);
      console.log(response.data.submissionId);
    }

    setInterval(() => {
      console.log('fetching')
    }, 2000)
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      <div className="flex justify-between items-center py-4">
        <div className="mx-8 text-2xl">LeetClone</div>
        <div className="flex mr-8 gap-x-8 items-center">
          
          <button className="border px-4 py-1 rounded">Run</button>
          <button
            className="border px-4 py-1 rounded"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
          <button className="border px-4 py-1 rounded" onClick={resetCode}>
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel className="flex-1">
            <div className="h-full overflow-auto bg-slate-800 flex flex-col p-6">
              <p className="text-4xl mb-6 font-semibold tracking-wide">
                {problem?.title}
              </p>
              <p className="text-2xl mb-4">Problem Statement:</p>
              <div className="mb-12">
                <Markdown>{problem?.description}</Markdown>
              </div>
              {problem?.examples &&
                problem?.examples.map((example, index) => (
                  <Example key={index} example={example} exampleIndex={index} />
                ))}
              {problem?.constraints &&
                problem?.constraints.map((constraint, index) => (
                  <Constraint key={index} constraint={constraint} />
                ))}
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-slate-600 transition-colors" />
          {/* Monaco Editor */}
          <Panel className="flex-1">
            <PanelGroup direction="vertical" className="w-full">
              <Panel className="flex-1 rounded-xl">
                <Editor
                  height="100%"
                  language={"javascript"}
                  value={code}
                  onChange={setCode}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    padding: {
                      top: 20,
                      bottom: 20,
                    },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    tabSize: 2,
                  }}
                />
              </Panel>

              <PanelResizeHandle className="h-0.5 bg-slate-200" />

              <Panel className="flex-1">
                <div className="overflow-y-auto h-full p-4">
                  <p className="text-xl tracking-wider font-semibold text-white mb-4">
                    Test Cases
                  </p>
                  {testcases &&
                    testcases.map((testcase, idx) => (
                      <Testcase key={idx} testcase={testcase} index={idx} />
                    ))}
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export { ViewSubmissionsButton };
