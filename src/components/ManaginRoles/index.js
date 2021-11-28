import React, { Component } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import MultipleSelect from "./MultipleSelect";
const styles = {
  root: {
    margin: 20,
    padding: 20
  },
  form: {
    //display: "flex"
    alignItems: "baseline",
    justifyContent: "space-evenly"
  },
  formControl: {
    marginBottom: 20,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 5
  },
  noLabel: {
    marginTop: 15
  }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const permission = ["App1", "App2", "App3", "App4", "App5"];

class ManaginRoles extends Component {
  state = {
    roles: [
      {
        id: 1,
        input: "Super Admin",
        permissionName: ["App1", "App2"],
        isEdit: false
      },
      { id: 2, input: "Admin", permissionName: ["App3"], isEdit: false }
    ],
    input: "",
    permissionName: []
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleCreate = (e) => {
    var idnew = "";
    var roles = this.state.roles.filter(
      (item) => item.input === this.state.input
    );
    if (roles[0] !== undefined) {
      idnew = roles[0].id;
      this.handleDelete(roles[0].id);
    } else {
      idnew = Date.now().toString();
    }
    e.preventDefault();
    var permissionNameState = this.state.permissionName;
    if (this.state.input) {
      //console.log(this.state);
      this.setState(({ roles, input }) => ({
        roles: [
          ...roles,
          {
            id: idnew,
            input,
            permissionName: permissionNameState,
            isEdit: false
          }
        ],
        input: "",
        permissionName: []
      }));
    }
  };

  handleDelete = (id) => {
    this.setState(({ roles }) => ({
      roles: roles.filter((item) => item.id !== id)
    }));
  };

  handleEdit = (id) => {
    var roles = this.state.roles.filter((item) => item.id === id);
    console.log(roles);
    this.setState(({ permissionName }) => ({
      input: roles[0].input,
      permissionName: roles[0].permissionName
    }));
  };
  handleChangeSelect = (event) => {
    this.setState({ permissionName: event.target.value });
  };
  render() {
    const { input, roles } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Typography variant="display1" align="center" gutterBottom>
            Roles
          </Typography>
          <form className={classes.form} onSubmit={this.handleCreate}>
            <TextField
              name="input"
              label="New role"
              value={input}
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            {/*<MultipleSelect />*/}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">App Name</InputLabel>
              <Select
                multiple
                value={this.state.permissionName}
                onChange={this.handleChangeSelect}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {permission.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Button type="submit" color="primary" variant="raised">
              Add Role
            </Button>
          </form>
        </Paper>
        <Paper className={classes.root}>
          <List>
            {roles
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map(({ id, input, permissionName }) => (
                <ListItem key={id}>
                  <ListItemText
                    primary={input}
                    secondary={permissionName.toString()}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      color="primary"
                      onClick={() => this.handleEdit(id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => this.handleDelete(id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(ManaginRoles);
