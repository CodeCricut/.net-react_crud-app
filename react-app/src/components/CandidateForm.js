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
import useForm from "./hooks/useForm";

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

const CandidateForm = ({ classes, ...props }) => {
    const validate = (fieldValues = values) => {
        let temp = {
            ...errors
        };

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

    const { values, _, errors, setErrors, handleInputChange } = useForm(
        initialFieldValues,
        validate
    );

    // material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(errors);

        if (validate()) window.alert("validation succeeded");
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
                        label="Full Name"
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
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default withStyles(styles)(CandidateForm);
