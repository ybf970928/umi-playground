import React from 'react'
import Charts from './component/echarts'
import { Button } from 'antd'
import { useState } from 'react'
import type { IData } from './type'
import { PageContainer } from '@ant-design/pro-layout'

// import { useMemo } from 'react'

// const TestPage2: React.FC = () => {
//     const data: IData[] = [
//         { year: '1951 年', sales: 38 },
//         { year: '1952 年', sales: 52 },
//         { year: '1956 年', sales: 61 },
//         { year: '1957 年', sales: 45 },
//         { year: '1958 年', sales: 48 },
//         { year: '1959 年', sales: 38 },
//         { year: '1960 年', sales: 38 },
//         { year: '1962 年', sales: 38 }
//     ]
//     const [chartData, setChartData] = useState<IData[]>([])
//     const [count, setCount] = useState<number>(0)
//     const tableCharts = useMemo(() => <Charts datasoure={chartData}/>, [chartData])    
//     return (
//         <>
//             <Button type="primary" onClick={() => setChartData(data)}>渲染表单</Button>
//             <Button type="primary" onClick={() => setCount(count + 1)}>自增+1</Button>
//             <p>{count}</p>
//             {tableCharts}
//         </>
//     )
// }

const ContextComponent: React.FC = (props) => {
    const { children } = props
    const [count, setCount] = useState<number>(0)
    return (
        <>
            <Button type="primary" onClick={() => setCount(count + 1)}>自增+1</Button>
            <p>{count}</p>
            {children}
        </>
    )
}

const TopLazy: React.FC = () => {
    const [chartData, setChartData] = useState<IData[]>([])
    const [imgSrc, setImgSrc] = useState<string>('')
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
    const handleChange = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]!
        const reader = new FileReader()
        if(/image/.test(file.type)) {
            reader.readAsDataURL(file)
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        reader.onload = (event: ProgressEvent<FileReader>) => {
            // 文件里的文本会在这里被打印出来
            setImgSrc(event.target!.result as string)
        }
        
    }
    return (
        <PageContainer title={'避免chart子组件重复渲染'} content={<span>使用useMemo或者内容提升</span>}>
            <ContextComponent>
                {imgSrc && <img src={imgSrc} alt="" style={{ width: '100px', height: '100px' }}/>}
                <input type="file" onChange={handleChange} />
                <Button type="primary" onClick={() => setChartData(data)}>渲染表单</Button>
                <Charts datasoure={chartData} />
            </ContextComponent>
        </PageContainer>
    )
}
export default TopLazy