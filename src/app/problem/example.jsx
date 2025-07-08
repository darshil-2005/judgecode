import React from 'react'

const Example = ({example, exampleIndex}) => {

    const {input, output, explanation} = example;
    return (
    <div className='mb-6'>
        <div className='text-2xl font-semibold mb-2'>Example {exampleIndex + 1}:</div>
        <p className='text-lg mb-2'>Input: {input}</p>
        <p className='text-lg mb-2'>Output: {output}</p>
        <p className='text-lg mb-2'>Explanation: {explanation}</p>
    </div>
    )
}

export default Example