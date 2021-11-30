import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
const crypto = require("crypto");

export const mainListItems = (
  <div>
    <Link to="/users" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
          {/* <DashboardIcon />*/}
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to="/roles" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
          {/*ShoppingCartIcon*/}
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
    </Link>
    {/*<ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
    */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset> </ListSubheader>
    <ListItem
      button
      onClick={() => {
        sessionStorage.clear();
        // window.open("/login", "_self");
        var d = new Date();
        var link =
          "https://demodash.awskeytech.com/?US=" +
          window.sessionStorage.getItem("user") +
          "&TK=" +
          crypto
            .createHash("md5")
            .update(d.getHours() + d.getMinutes() + "")
            .digest("hex")
            .toString();
        window.open(link, "_self");
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Torna al Portale" />
    </ListItem>
    {/*<ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
    */}
  </div>
);
