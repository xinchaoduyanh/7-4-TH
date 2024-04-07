import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel();
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography>
        <List component="nav">
      {users.map((user) => (
        <React.Fragment key={user._id}>
          <ListItem>
            <ListItemText primary={user.last_name} />
            <Link to={`/users/${user._id}`} style={{ textDecoration: 'none', marginRight: '10px' }}>Details</Link>
            <Link to={`/photos/${user._id}`} style={{ textDecoration: 'none' }}>Photos</Link>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;
