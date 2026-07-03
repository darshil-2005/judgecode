import React from 'react'

const ViewSubmissionsButton = ({ evaluationAvailable }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
        ${evaluationAvailable ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      disabled={!evaluationAvailable}
      type="button"
    >
      View Submissions
    </button>
  )
}

export default ViewSubmissionsButton