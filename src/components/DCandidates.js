import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { Grid, Paper, TableContainer, TableHead, Table, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DCandidatesForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.15rem"
    }
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  }
})
//props.classes
//const {classes, props} = props

const DCandidates = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    props.fetchAllDCandidates()
  }, []) //componenetDidMount

  //toast msg.
  const { addToast } = useToasts()
  const onDelete = id => {
    if (window.confirm("Are you sure to delete this record?")) {
      props.deleteDCandidate(id, () => addToast("Deleted successfully", { appearance: 'info' }));
      window.location.reload();
    }

  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidatesForm {...({ currentId, setCurrentId })} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Miles</TableCell>
                  <TableCell>Paint Color</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.dCandidateList.map((record) => {
                    return (
                      <TableRow key={record.rowId} hover>
                        <TableCell>{record.manufacturer}</TableCell>
                        <TableCell>{record.model}</TableCell>
                        <TableCell>{record.year}</TableCell>
                        <TableCell>{record.odometer}</TableCell>
                        <TableCell>{record.paint_color}</TableCell>
                        <TableCell>{record.price}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.rowId) }} /></Button>
                            <Button><DeleteIcon color="secondary" onClick={() => onDelete(record.rowId)} /></Button>
                          </ButtonGroup>
                        </TableCell>

                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = state => ({
  dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));