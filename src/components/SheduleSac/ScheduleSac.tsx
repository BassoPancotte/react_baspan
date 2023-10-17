import React, { useEffect, useRef, useState } from 'react'
import { Scheduler } from "@aldabil/react-scheduler"
import types, { SchedulerRef, Translations, ProcessedEvent, RemoteQuery, DefaultRecourse } from "@aldabil/react-scheduler/types";
import { QueryExecutor } from '../../services/api/functions/queryExecutor';
import RecordSnk, { RecordType } from '../../services/api/functions/record';
import alertPopup from '../../services/snk/alertPopup';
import { fieldsCalls } from './fields';
import { customLocale, translation } from './customTranslations';

export default function ScheduleSac() {

    const calendarRef = useRef<SchedulerRef>(null);
    const [resources, setResources] = useState<DefaultRecourse[]>([])

    useEffect(() => {
        getResources()

        return () => {

            

        }

    }, [calendarRef.current?.scheduler?.resources, calendarRef.current?.scheduler?.selectedResource])


    return (
        <div>
            {resources?.length > 0 ?
                <Scheduler
                    view="week"
                    week={
                        {
                            weekDays: [0, 1, 2, 3, 4],
                            weekStartOn: 1,
                            startHour: 7,
                            endHour: 19,
                            step: 30,
                        }
                    }
                    hourFormat='24'
                    translations={translation}
                    locale={customLocale}
                    fields={fieldsCalls}
                    deletable={false}
                    ref={calendarRef}

                    resourceFields={{
                        idField: "CODUSUEXEC",
                        textField: "nomeusu",
                        subTextField: "grupo",
                        avatarField: "foto",
                        colorField: "color"
                    }}

                    resources={resources}
                    resourceViewMode='tabs'

                    getRemoteEvents={(params: RemoteQuery) => getCalls(params.start, params.end)}
                    onEventDrop={(droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent) => updateRecordOnDrag(droppedOn, updatedEvent, originalEvent)}
                />
                : null}
        </div>
    )

    async function getCalls(start: Date, end: Date): Promise<ProcessedEvent[]> {
        try {
            const opc: ProcessedEvent[] = [];

            const query = new QueryExecutor();
            await query.executeQuery(`
            SELECT SAC.CODSAC,
            SAC.DESCRICAO                                                  AS TITULO,
            SAC.CODPARC,
            PAR.RAZAOSOCIAL,
            SAC.TIPO,
            SAC.TIPCTT,
            SAC.SITUACAO,
            SAC.CODUSUEXEC,
            USU.NOMEUSU                                                    AS NOMEUSUEXEC,
            TO_CHAR(SAC.DHAGE, 'YYYY-MM-DD HH24:MI:SS')                    AS "HOUR",
            TO_CHAR(SAC.DHAGEFIN, 'YYYY-MM-DD HH24:MI:SS')                 AS "DHAGEFIN",
            CASE
                WHEN TO_CHAR(SAC.DHAGE, 'HH24:MI:SS') = '00:00:00' THEN 'true'
                ELSE 'false' END                                           AS DIATODO
            FROM AD_SACCAB SAC
            INNER JOIN TGFPAR PAR ON PAR.CODPARC = SAC.CODPARC
            LEFT JOIN TSIUSU USU ON USU.CODUSU = SAC.CODUSUEXEC
            WHERE SAC.DHAGE IS NOT NULL
            AND SAC.DHAGE BETWEEN TO_DATE('${start.toLocaleString()}', 'DD/MM/YYYY HH24:MI:SS') AND TO_DATE('${end.toLocaleString()}', 'DD/MM/YYYY HH24:MI:SS')
            AND (SAC.CODUSUEXEC = STP_GET_CODUSULOGADO() OR STP_GET_CODUSULOGADO() = 0 OR 'S' = (SELECT AD_ACESSOTOTAGENDA FROM TSIUSU WHERE CODUSU = STP_GET_CODUSULOGADO()))
            `);


            while (query.next()) {
                opc.push({
                    event_id: query.getField("CODSAC"),
                    title: query.getField("TITULO"),
                    CODSAC: query.getField("CODSAC"),
                    DESCRICAO: query.getField("TITULO"),
                    color: getColorFromStatus(query.getField("SITUACAO"), new Date(query.getField("HOUR"))),
                    start: new Date(query.getField("HOUR")),
                    DHAGE: new Date(query.getField("HOUR")),
                    end: new Date(query.getField("HOUR")),
                    DHAGEFIN: query.getField("DHAGEFIN") != null ? new Date(query.getField("DHAGEFIN")) : null,
                    allDay: query.getField("DIATODO") === 'true',
                    CODPARC: query.getField("CODPARC"),
                    RAZAOSOCIAL: query.getField("RAZAOSOCIAL"),
                    TIPO: query.getField("TIPO"),
                    TIPCTT: query.getField("TIPCTT"),
                    SITUACAO: query.getField("SITUACAO"),
                    CODUSUEXEC: query.getField("CODUSUEXEC"),
                    NOMEUSUEXEC: query.getField("NOMEUSUEXEC"),
                })
            };

            return opc
        } catch (e) {
            alertPopup(e);
            return []
        }
    }

    async function updateRecordOnDrag(droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent) {
        try {
            const codSac = updatedEvent.event_id.toString()
            const pks: RecordType[] = [{ fieldName: "CODSAC", value: codSac }];
            const records: RecordType[] = [{ fieldName: "DHAGE", value: droppedOn.toLocaleString() }];

            const record = new RecordSnk()
            await record.update('AD_SACCAB', pks, records, ["DHAGE", "DHAGEFIN", "SITUACAO"])
            updatedEvent.SITUACAO = record.getFieldResponse("SITUACAO");
            updatedEvent.start = new Date(record.getFieldResponse("DHAGE"));
            updatedEvent.end = new Date(record.getFieldResponse("DHAGE"));
            updatedEvent.DHAGE = new Date(record.getFieldResponse("DHAGE"));
            updatedEvent.DHAGEFIN = new Date(record.getFieldResponse("DHAGEFIN"));

            return updatedEvent
        }
        catch (e) {
            alertPopup(e);
        }
    }

    async function getResources(): Promise<void> {
        try {
            const opc: DefaultRecourse[] = [];

            const query = new QueryExecutor();
            await query.executeQuery(`
            SELECT USU.CODUSU, USU.NOMEUSU, GRU.NOMEGRUPO, USU.FOTO
            FROM TSIUSU USU
            INNER JOIN TSIGRU GRU ON GRU.CODGRUPO = USU.CODGRUPO
            INNER JOIN (SELECT DISTINCT CODUSUEXEC
                        FROM AD_SACCAB
                        WHERE (CODUSUEXEC = STP_GET_CODUSULOGADO() OR STP_GET_CODUSULOGADO() = 0 OR 'S' = (SELECT AD_ACESSOTOTAGENDA FROM TSIUSU WHERE CODUSU = STP_GET_CODUSULOGADO()))) SAC ON SAC.CODUSUEXEC = USU.CODUSU
            ORDER BY NOMEUSU
                `)

            while (query.next()) {
                opc.push({
                    CODUSUEXEC: query.getField("CODUSU"),
                    nomeusu: query.getField("NOMEUSU"),
                    grupo: query.getField("NOMEGRUPO"),
                    foto: query.getField("FOTO"),
                });
            };

            setResources(opc)
        } catch (e) {
            alertPopup(e);
            setResources([])
        }
    }
}




function getColorFromStatus(status: string, dhage: Date): string {
    const green = 'linear-gradient(to bottom,#6c6 0,#40bf40 100%)'
    const red = 'linear-gradient(to bottom,#cc6666 0,#bf4040 100%)'
    const yellow = 'linear-gradient(to bottom,#e0df70 0,#e0dc49 100%)'
    const black = 'linear-gradient(to bottom,#616161 0,#353535 100%)'

    if (status === 'A') {
        return dhage > new Date() ? green : red
    }

    if (status === 'E') {
        return dhage > new Date() ? yellow : red
    }

    return black
}