import React, { useMemo } from 'react'
import Charts from './component/echarts'
import { Button } from 'antd'
import { useState } from 'react'

export type IData = {
    year: string;
    sales: number
}
const TestPage2: React.FC = () => {
    const data: IData[] = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 45 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
    ]
    const [chartData, setChartData] = useState<IData[]>([])
    const [count, setCount] = useState<number>(0)
    const tableCharts = useMemo(() => <Charts datasoure={chartData}/>, [chartData])    
    return (
        <>
            <Button type="primary" onClick={() => setChartData(data)}>渲染表单</Button>
            <Button type="primary" onClick={() => setCount(count + 1)}>自增+1</Button>
            <p>{count}</p>
            {tableCharts}
        </>
    )
}

export default TestPage2