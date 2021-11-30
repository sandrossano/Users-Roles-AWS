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
import axios from "axios";
import Toast from "toast-me";
const crypto = require("crypto");

const styles = {
  root: {
    margin: 20,
    padding: 15
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

//var permission = ["Ruolo1", "Ruolo2", "Ruolo3"];

class ManaginRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      roles: [],
      input: "",
      psw: "",
      id: "",
      permissionName: [],
      isLoaded: false,
      isEdit: false,
      max: 0
    };
  }

  componentDidMount = () => {
    var linkroles =
      "https://keytech-demo-backend.herokuapp.com/api/getroleslist";
    axios
      //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .get(linkroles)
      //.then((res) => res.data.json())
      .then((result) => {
        this.setState({
          lista: result.data
        });
        console.log(result.data);
      });

    //var email = window.sessionStorage.getItem("user");
    var link = "https://keytech-demo-backend.herokuapp.com/api/getusers";
    axios
      //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .get(link)
      //.then((res) => res.data.json())
      .then(
        (result) => {
          var roles = [];
          var obj;
          var max = 0;
          //roles = result.data;
          for (var i = 0; i < result.data.length; i++) {
            obj = { id: 0, input: "", permissionName: [] };
            obj.id = result.data[i].id;
            obj.input = result.data[i].input;
            obj.psw = result.data[i].psw;
            obj.permissionName = result.data[i].permissionName;
            var arraysplit = obj.permissionName.split(",");
            for (var j = 0; j < arraysplit.length; j++) {
              arraysplit[j] = arraysplit[j].replace(/['"]+/g, "").trim();
              arraysplit[j] = arraysplit[j].replace(/['[]+/g, "").trim();
              arraysplit[j] = arraysplit[j].replace(/(])+/g, "").trim();
            }
            obj.permissionName = arraysplit;
            console.log(arraysplit);
            roles.push(obj);
            if (obj.id > max) max = obj.id;
          }

          this.setState({
            isLoaded: true,
            roles: roles,
            isEdit: false,
            max: max
          });
          console.log(result.data);
        },
        // Nota: è importante gestire gli errori qui
        // invece di un blocco catch() in modo da non fare passare
        // eccezioni da bug reali nei componenti.
        (error) => {
          this.setState({
            isLoaded: false,
            error,
            isEdit: false
          });
        }
      );
  };

  handleCancel = () => {
    this.setState({
      input: "",
      psw: "",
      id: "",
      permissionName: [],
      isEdit: false,
      max: 0
    });
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleChangePsw = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleCreate = (e) => {
    var idnew = 0;
    var password = "";
    var roles = this.state.roles.filter((item) => item.id === this.state.id);
    if (roles[0] !== undefined) {
      idnew = roles[0].id;
      this.setState(({ roles }) => ({
        roles: roles.filter((item) => item.id !== idnew),
        isEdit: false
      }));
      password = this.state.psw;
    } else {
      idnew = parseInt(this.state.max, 10) + 1;
      password = crypto.createHash("md5").update(this.state.psw).digest("hex");
    }
    console.log(password);
    var permissionNameState = this.state.permissionName;
    if (this.state.input !== "" && this.state.psw !== "") {
      var link =
        "https://keytech-demo-backend.herokuapp.com/api/createuser/" +
        idnew +
        "~" +
        this.state.input +
        "~" +
        password +
        "~" +
        permissionNameState.toString(); //Barella23
      if (roles[0] !== undefined) {
        link =
          "https://keytech-demo-backend.herokuapp.com/api/edituser/" +
          idnew +
          "~" +
          this.state.input +
          "~" +
          password +
          "~" +
          permissionNameState.toString();
      }
      axios
        //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
        .get(link)
        .then((result) => {});
      this.setState(({ roles, input }) => ({
        roles: [
          ...roles,
          {
            id: idnew,
            input,
            permissionName: permissionNameState,
            psw: password
          }
        ],
        input: "",
        psw: "",
        permissionName: [],
        isEdit: false
      }));
    } else {
      Toast("User o Password assenti", "error");
    }
    e.preventDefault();
  };

  handleDelete = (id) => {
    var link =
      "https://keytech-demo-backend.herokuapp.com/api/deleteuser/" + id;
    axios
      //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .get(link)
      .then((result) => {
        this.setState(({ roles }) => ({
          roles: roles.filter((item) => item.id !== id),
          isEdit: false
        }));
      });
  };

  handleEdit = (id) => {
    var roles = this.state.roles.filter((item) => item.id === id);
    console.log(roles);
    this.setState(({ permissionName }) => ({
      input: roles[0].input,
      psw: roles[0].psw,
      permissionName: roles[0].permissionName,
      isEdit: true,
      id: roles[0].id
    }));
  };
  handleChangeSelect = (event) => {
    console.log(event.target.value);
    console.log(this.state.permissionName);
    this.setState({ permissionName: event.target.value });
  };
  render() {
    const { input, roles, psw, lista } = this.state;
    const { classes } = this.props;
    const { isLoaded, items, isEdit } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Paper className={classes.root}>
            <Typography variant="display1" align="center" gutterBottom>
              Users
            </Typography>
            <form className={classes.form} onSubmit={this.handleCreate}>
              <TextField
                style={{ width: "60%" }}
                name="input"
                label="New User"
                value={input}
                onChange={this.handleChange}
                margin="normal"
              />
              {isEdit ? (
                <TextField
                  style={{ width: "60%", display: "none" }}
                  InputProps={{
                    readOnly: true
                  }}
                  name="psw"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={psw}
                  onChange={this.handleChangePsw}
                />
              ) : (
                <TextField
                  style={{ width: "60%" }}
                  name="psw"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={psw}
                  onChange={this.handleChangePsw}
                />
              )}

              <br />
              {/*<MultipleSelect />*/}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Role</InputLabel>
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
                  {lista.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              {isEdit ? (
                <Button
                  color="primary"
                  variant="raised"
                  style={{ marginRight: "25px" }}
                  onClick={() => this.handleCancel()}
                >
                  Cancel
                </Button>
              ) : (
                ""
              )}
              <Button type="submit" color="primary" variant="raised">
                {isEdit ? "Edit User" : "Add User"}
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
                      className="secondary"
                    />
                    <ListItemSecondaryAction
                      style={{ marginTop: "10px", paddingLeft: "30px" }}
                    >
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
}

export default withStyles(styles)(ManaginRoles);
