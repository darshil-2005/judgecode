import React from 'react'

const Testcase = ({ testcase, index }) => {
  return (
    <div className="mb-4 p-4 bg-slate-700 rounded-lg">
      <div className="text-sm text-gray-400 mb-1">Test Case {index + 1}</div>
      <div>
        <span className="font-semibold text-white">Input:</span>
        <pre className="bg-slate-800 p-2 rounded text-white text-xs mt-1 overflow-x-auto">{testcase.input}</pre>
      </div>
      <div className="mt-2">
        <span className="font-semibold text-white">Expected Output:</span>
        <pre className="bg-slate-800 p-2 rounded text-white text-xs mt-1 overflow-x-auto">{testcase.expectedOutput}</pre>
      </div>
    </div>
  )
}

export default Testcase