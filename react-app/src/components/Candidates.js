import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll } from "../actions/candidate";
import {
    Grid,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    withStyles
} from "@material-ui/core";
import CandidateForm from "./CandidateForm";

// Define overridding styles for material-ui
const styles = theme => ({
    // override existing styles
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    // custom class
    paper: {
        margin: theme.spacing(2), // 16px
        padding: theme.spacing(2)
    }
});

const Candidates = ({ candidateList, fetchAllCandidates, classes }) => {
    useEffect(() => {
        fetchAllCandidates();
    }, []); // empty array means it will run once when component mounts
    return (
        <>
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <CandidateForm />
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidateList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover={true}>
                                                <TableCell>
                                                    {record.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    {record.mobile}
                                                </TableCell>
                                                <TableCell>
                                                    {record.bloodGroup}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

const mapStateToProps = state => ({
    candidateList: state.Candidate.list
});

const mapActionsToProps = {
    fetchAllCandidates: fetchAll
};

// With styles simply passes our custom style into the component; it is named classes
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Candidates));
