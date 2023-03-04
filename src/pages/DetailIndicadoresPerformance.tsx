import React from 'react'
import DynamicTable from '../components/DynamicTable'

export default function DetailIndicadoresPerformance() {

    const columns = ["Nome", "Cidade", "Idade"];
    const data = [
        ["William", "NA", '20'],
        ["Tiago", "NA", '40'],
        ["Kamily", "NA", '19']
    ];

    return (
        <DynamicTable columns={columns} data={data}></DynamicTable>
    )
}
