import { SelectOption } from "@aldabil/react-scheduler/components/inputs/SelectInput";
import { QueryExecutor } from "../../services/api/functions/queryExecutor";
import alertPopup from "../../services/snk/alertPopup";
import { FieldProps } from "@aldabil/react-scheduler/types";

export const fieldsCalls: Array<FieldProps> = [{
    name: "title",
    type: 'hidden',
}, {
    name: "start",
    type: 'hidden',
}, {
    name: "end",
    type: 'hidden',
}, {
    name: "DHAGE",
    type: 'date',
    config: { label: 'Dh. Agendamento', sm: 6, md: 6, xs: 6 }
}, {
    name: "DHAGEFIN",
    type: 'date',
    config: { disabled: true, label: 'Dh. Fechamento do Agendamento', sm: 6, md: 6, xs: 6, }
},
{
    name: "CODSAC",
    type: 'input',
    config: {
        disabled: true,
        decimal: true,
        label: 'Cod. Sac',
        sm: 2, md: 2, xs: 2,
    }
}, {
    name: "DESCRICAO",
    type: 'input',
    config: {
        label: 'Descricao',
        sm: 10, md: 10, xs: 10,
    }
}, {
    name: "CODPARC",
    type: 'input',
    config: {
        disabled: true,
        label: 'Cod. Parceiro',
        sm: 2, md: 2, xs: 2,
    }
}, {
    name: "RAZAOSOCIAL",
    type: 'input',
    config: {
        disabled: true,
        label: 'Razao Social',
        sm: 10, md: 10, xs: 10,
    }
}, {
    name: "TIPO",
    type: 'select',
    options: await getOptionMultiField(9999996868),
    default: 0,
    config: {
        label: 'Tipo do Ticket',
    }
}, {
    name: "TIPCTT",
    type: 'select',
    default: 0,
    options: await getOptionMultiField(9999996864),
    config: {
        label: 'Tipo Contato',
    }
}, {
    name: "SITUACAO",
    type: 'select',
    default: 0,
    options: await getOptionMultiField(9999996863),
    config: {
        label: 'Situacao',
    }
}, {
    name: "CODUSUEXEC",
    default: "0",
    type: 'input',
    config: {
        disabled: true,
        label: 'Cod. Usuario',
        sm: 2, md: 2, xs: 2,
    }
}, {
    name: "NOMEUSUEXEC",
    type: 'input',
    config: {
        disabled: true,
        label: 'Apelido Usuario Execucao',
        sm: 10, md: 10, xs: 10,
    }
}, {
    name: "CODUSULOGADO",
    type: 'hidden',
    config: {
        disabled: true,
        label: 'Apelido Usuario Execucao',
        sm: 10, md: 10, xs: 10,
    }
},]


export async function getOptionMultiField(snkNuCampo: number): Promise<SelectOption[]> {
    try {
        const opc: SelectOption[] = [];

        const query = new QueryExecutor();
        await query.executeQuery(`SELECT VALOR, OPCAO FROM TDDOPC WHERE NUCAMPO = ${snkNuCampo}`)

        while (query.next()) {
            opc.push({
                id: query.getField("VALOR"),
                text: query.getField("OPCAO"),
                value: query.getField("VALOR"),
            })
        };

        return opc
    } catch (e) {
        alertPopup(e);
        return []
    }
}