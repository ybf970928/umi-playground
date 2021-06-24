import React, { useMemo } from 'react'
import { useState } from 'react'

const WithoutMemo: React.FC = () => {
    const [count, setCount] = useState(1)
    const [val, setValue] = useState('')
 
    const expensive = useMemo(() => {
        const sum = 0
        return sum + count
    }, [count])
    return (
        <div>
            <h4>count值:{count}-input value:{val}-求和:{expensive}</h4>
            <div>
                <button onClick={() => setCount(count + 1)}>+1</button>
                <input value={val} onChange={event => setValue(event.target.value)}/>
            </div>
        </div>
    )
}

export default WithoutMemo