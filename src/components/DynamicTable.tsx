import { TableContainer } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useLayoutEffect, useState, ChangeEvent } from 'react'


export default function DynamicTable(props: {
    columns: Array<String>,
    data: Array<Array<String>>
}) {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useLayoutEffect(() => {
        return () => {
            setRowsPerPage(50);
        }
    }, [setRowsPerPage])

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight={"100vh"}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                minWidth={"100vw"}
            >
                <Paper sx={{ width: '98%', minHeight: '98%', overflow: 'hidden' }}>
                    <TableContainer sx={{ height: '98%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {props.columns.map((column) => (
                                        <TableCell
                                            key={column as React.Key}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((data) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                {data.map((e, i) => {
                                                    if (i < props.columns.length) {
                                                        return (
                                                            <TableCell>
                                                                {e}
                                                            </TableCell>
                                                        )
                                                    }
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[50, 100, 500, 1000]}
                        component="div"
                        count={props.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"Registros por página: "}
                        lang='pt-br'
                        translate='yes'
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}