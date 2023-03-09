import React, { useState, useEffect, useLayoutEffect } from 'react'
import DynamicTable from '../components/DynamicTable'
import { useSearchParams } from 'react-router-dom'
import BaspanAPI from '../libs/bapi/BaspanAPI';




export default function DetailIndicadoresPerformance() {

    const [searchParams, setSearchParams] = useSearchParams();


    const execQuery = (query: string) => {
        const bapi = new BaspanAPI();

        bapi.setBaseURL('/mge/service.sbr', '?serviceName=DbExplorerSP.executeQuery&outputType=json');
        const response = bapi.post
            (
                {
                    "serviceName": "DbExplorerSP.executeQuery",
                    "requestBody": {
                        "sql": `${query}`
                    }
                }
            )

        return response.then((r: any) => r).catch((err) => err);
    }

    const getColumns = () => {
        let columns = searchParams.get("columns")?.toString();
        columns = JSON.parse(`{"columns":${columns}}`)["columns"];
        return (columns as unknown) as string[]
    }

    const getData = () => {
        let data = searchParams.get("data")?.toString();
        data = JSON.parse(`{"data":${data}}`)["data"];
        return (data as unknown) as string[][]
    }


    return (
        <DynamicTable columns={getColumns()} data={getData()}></DynamicTable>
    )
}
