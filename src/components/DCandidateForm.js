
import { TextField, Grid, withStyles, Button, } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  }
})

const initialFieldValues = {
  manufacturer: '',
  model: '',
  year: '',
  odometer: '',
  paint_color: '',
  price: '',
}

const DCandidatesForm = ({ classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();
  //validate()
  //validate({manufacturer:'lexus'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('manufacturer' in fieldValues)
      temp.manufacturer = fieldValues.manufacturer !== "" ? "" : "This field is required."
    if ('model' in fieldValues)
      temp.model = fieldValues.model !== "" ? "" : "This field is required."
    if ('year' in fieldValues)
      temp.year = fieldValues.year !== "" ? "" : "This field is required."
    if ('odometer' in fieldValues)
      temp.odometer = fieldValues.odometer !== "" ? "" : "This field is required."
    if ('paint_color' in fieldValues)
      temp.paint_color = fieldValues.paint_color !== "" ? "" : "This field is required."
    if ('price' in fieldValues)
      temp.price = fieldValues.price !== "" ? "" : "This field is required."
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast("Submitted successfully", { appearance: 'success' })
      }
      if (props.currentId === 0) {
        props.createDCandidate(values, onSuccess)
      }
      else {
        props.updateDCandidate(props.currentId, values, onSuccess)
      }
    }
    resetForm()
  }

  useEffect(() => {
    if (props.currentId !== 0)
      setValues({
        ...props.dCandidateList.find(x => x.rowId === props.currentId)
      })
    setErrors({})
  }, [props.currentId])

  return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="manufacturer"
            variant="outlined"
            label="Manufacturer"
            value={values.manufacturer}
            onChange={handleInputChange}
            {...(errors.manufacturer && { error: true, helperText: errors.manufacturer })}
          />
          <TextField
            name="model"
            variant="outlined"
            label="Model"
            value={values.model}
            onChange={handleInputChange}
            {...(errors.model && { error: true, helperText: errors.model })}
          />
          <TextField
            name="year"
            variant="outlined"
            label="Year"
            value={values.year}
            onChange={handleInputChange}
            {...(errors.year && { error: true, helperText: errors.year })}
          />
          {/* <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.year && { error: true })}
          >
            <InputLabel ref={inputLabel}>Year</InputLabel>
            <Select
              name="year"
              value={values.year}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Year</MenuItem>
              <MenuItem value="2001">2001</MenuItem>
              <MenuItem value="2002">2002</MenuItem>
              <MenuItem value="2003">2003</MenuItem>
              <MenuItem value="2004">2004</MenuItem>
              <MenuItem value="2005">2005</MenuItem>
            </Select>
            {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
          </FormControl> */}
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="odometer"
            variant="outlined"
            label="Odometer"
            value={values.odometer}
            onChange={handleInputChange}
            {...(errors.odometer && { error: true, helperText: errors.odometer })}
          />
          <TextField
            name="paint_color"
            variant="outlined"
            label="Paint Color"
            value={values.paint_color}
            onChange={handleInputChange}
            {...(errors.paint_color && { error: true, helperText: errors.paint_color })}
          />

          <TextField
            name="price"
            variant="outlined"
            label="Price"
            value={values.price}
            onChange={handleInputChange}
            {...(errors.price && { error: true, helperText: errors.price })}
          />


          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
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
    </form>
  );
}

const mapStateToProps = state => ({
  dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,

}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidatesForm));