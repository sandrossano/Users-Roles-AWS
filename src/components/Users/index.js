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

const permission = ["Ruolo1", "Ruolo2", "Ruolo3", "Ruolo4"];

class ManaginRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [
        {
          id: 1,
          input: "Utente1",
          permissionName: ["Ruolo1", "Ruolo2", "Ruolo3"]
        },
        { id: 2, input: "Utente2", permissionName: ["Ruolo3"] }
      ],
      input: "",
      permissionName: [],
      isLoaded: false
    };
  }

  componentDidMount = () => {
    //var email = window.sessionStorage.getItem("user");
    var link = "https://ui8g2.sse.codesandbox.io/api/getusers";
    axios
      //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .get(link)
      //.then((res) => res.data.json())
      .then(
        (result) => {
          var roles = [];
          var obj;
          //roles = result.data;
          for (var i = 0; i < result.data.length; i++) {
            obj = { id: 0, input: "", permissionName: [] };
            obj.id = result.data[i].id;
            obj.input = result.data[i].input;
            obj.permissionName = result.data[i].permissionName;
            var arraysplit = obj.permissionName.split(",");
            for (var j = 0; j < arraysplit.length; j++) {
              arraysplit[j] = arraysplit[j].replace(/['"]+/g, "");
              arraysplit[j] = arraysplit[j].replace(/['[]+/g, "");
              arraysplit[j] = arraysplit[j].replace(/(])+/g, "");
            }
            obj.permissionName = arraysplit;
            console.log(arraysplit);
            roles.push(obj);
          }

          this.setState({
            isLoaded: true,
            roles: roles
          });
          console.log(result.data);
        },
        // Nota: è importante gestire gli errori qui
        // invece di un blocco catch() in modo da non fare passare
        // eccezioni da bug reali nei componenti.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      );
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
            permissionName: permissionNameState
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
    const { isLoaded, items, month } = this.state;
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
                style={{ width: "80%" }}
                name="input"
                label="New User"
                value={input}
                onChange={this.handleChange}
                margin="normal"
              />
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
                  {permission.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <Button type="submit" color="primary" variant="raised">
                Add User
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
