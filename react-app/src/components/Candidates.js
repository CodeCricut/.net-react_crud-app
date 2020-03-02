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
    TableBody
} from "@material-ui/core";
import CandidateForm from "./CandidateForm";

const Candidates = ({ candidateList, fetchAllCandidates }) => {
    useEffect(() => {
        fetchAllCandidates();
    }, []); // empty array means it will run once when component mounts
    return (
        <>
            <Paper>
                <Grid container>
                    <Grid item xs={6}>
                        <CandidateForm />
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidateList.map((record, index) => {
                                        console.log("yo");
                                        return (
                                            <TableRow key={index}>
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

export default connect(mapStateToProps, mapActionsToProps)(Candidates);
