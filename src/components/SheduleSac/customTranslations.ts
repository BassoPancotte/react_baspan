import { Translations } from "@aldabil/react-scheduler/types";
import { Locale } from "date-fns";
import { ptBR } from "date-fns/locale";

export const translation: Translations = {
    navigation: { day: "Dia", month: "Mes", today: "Hoje", week: "Semana" },
    validation: {
        invalidEmail: 'E-mail invalido.',
        required: 'Campo Requerido.',
        onlyNumbers: 'Apenas Numeros.',
    },
    form: {
        addTitle: "Adicionar Agenda",
        cancel: "Cancelar",
        confirm: "Salvar",
        delete: "Excluir",
        editTitle: "Editar Titulo"
    },
    event: {
        allDay: "Todo o dia",
        end: "Dh. Fechamento do Agendamento",
        start: "Dh. Agendamento",
        title: "Descricao"
    },
    moreEvents: "Mais eventos",
    loading: "Carregando"
}

export const customWeekdays = [
    'Domingo',
    'Segunda',
    'Terca',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado'
];

export const customMonths = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

export const customLocale: Locale = {
    ...ptBR, localize: {
        day: (day, width, formatOptions) => {
            if (width === 'narrow') {
                return customWeekdays[day].substr(0, 3);
            }
            return customWeekdays[day];
        },
        month: (month, width, formatOptions) => {
            if (width === 'narrow') {
                return customMonths[month].substr(0, 3);
            }
            return customMonths[month];
        },
    }
} as Locale