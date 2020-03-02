import React, { useState, useEffect } from "react";
import {
    FormControl,
    TextField,
    Grid,
    Select,
    MenuItem,
    withStyles,
    InputLabel,
    Button,
    FormHelperText
} from "@material-ui/core";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import useForm from "./hooks/useForm";
import { create, update, deleteRecord } from "./../actions/candidate";

const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    age: "",
    bloodGroup: "",
    address: ""
};

const styles = theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    },
    smMargin: {
        margin: theme.spacing(1)
    }
});

const CandidateForm = ({
    candidateList,
    classes,
    create,
    update,
    deleteRecord,
    currentId,
    setCurrentId
}) => {
    // toast msg
    const { addToast } = useToasts();

    const validate = (fieldValues = values) => {
        let temp = errors;

        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ""
                : "This field is required.";

        if ("mobile" in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required.";

        if ("bloodGroup" in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup
                ? ""
                : "This field is required.";

        if ("email" in fieldValues)
            temp.email = /^$|.+@.+..+/.test(fieldValues.email)
                ? ""
                : "Email is not valid.";

        setErrors({
            ...temp
        });

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, setCurrentId);

    // material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        if (currentId !== 0)
            setValues({
                ...candidateList.find(c => c.id === currentId)
            });
    }, [currentId, candidateList]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (validate()) {
            if (currentId === 0) {
                await create(values, () => {
                    addToast("Created candidate successfully!", {
                        appearance: "success"
                    });
                });
            } else
                await update(currentId, values, () => {
                    addToast("Updated candidate successfully!", {
                        appearance: "success"
                    });
                });
            resetForm();
        }
    };

    return (
        <FormControl autoComplete="off" noValidate className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && {
                            error: true,
                            helperText: errors.fullName
                        })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {
                            error: true,
                            helperText: errors.email
                        })}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        {...(errors.bloodGroup && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {errors.bloodGroup && (
                            <FormHelperText>{errors.bloodGroup}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && {
                            error: true,
                            helperText: errors.mobile
                        })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    );
};

const mapStateToProps = state => ({
    candidateList: state.Candidate.list
});

const mapActionsToProps = {
    create,
    update,
    deleteRecord
};

// With styles simply passes our custom style into the component; it is named classes
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(CandidateForm));
