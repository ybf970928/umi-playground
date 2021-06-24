import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'
import type { IData } from '../type'

interface IProps {
    datasoure: IData[]
}
const Charts: React.FC<IProps> = ({ datasoure }) => {
    return (
        <Chart height={400} autoFit data={datasoure} interactions={['active-region']} padding={[30, 30, 30, 50]} >
            <Interval position="year*sales" />
            <Tooltip shared />
        </Chart>
    )
}

export default Charts