import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll, deleteRecord } from "../actions/candidate";
import { useToasts } from "react-toast-notifications";

import {
    Grid,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    withStyles,
    ButtonGroup,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Dialog
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
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

const Candidates = ({
    candidateList,
    fetchAllCandidates,
    classes,
    deleteRecord
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("fetch all candidates called");
        fetchAllCandidates();
    }, [open]); // empty array means it will run once when component mounts
    const [currentId, setCurrentId] = useState(0);

    const { addToast } = useToasts();

    const confirmDeleteRecord = () => {
        setOpen(true);
    };

    return (
        <>
            {/* React alert/confirm dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete Record?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Once you delete a record, it cannot be recovered.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            await deleteRecord(currentId, () =>
                                addToast("Delete operation successful.", {
                                    appearance: "info"
                                })
                            );
                            setOpen(false);
                        }}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <CandidateForm {...{ currentId, setCurrentId }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                        <TableCell></TableCell>
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
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button
                                                            color="primary"
                                                            onClick={() => {
                                                                setCurrentId(
                                                                    record.id
                                                                );
                                                            }}
                                                        >
                                                            <Edit />
                                                        </Button>
                                                        <Button
                                                            color="secondary"
                                                            onClick={() => {
                                                                setCurrentId(
                                                                    record.id
                                                                );
                                                                confirmDeleteRecord();
                                                            }}
                                                        >
                                                            <Delete />
                                                        </Button>
                                                    </ButtonGroup>
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
    fetchAllCandidates: fetchAll,
    deleteRecord
};

// With styles simply passes our custom style into the component; it is named classes
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Candidates));
