import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const userId = useParams();
    // const user = models.userModel(userId);
    const user =  models.userModel(userId)
    return (
        <>
          <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: 
            {/* {user.userId}, {user.first_name}, {user.last_name}. */}
            You can fetch the model for the user from models.userModel.
          </Typography>
          <strong>Name:</strong> {user.first_name} {user.last_name}<br />
                <strong>Location:</strong> {user.location}<br />
                <strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: user.description }}></span><br />
                <strong>Occupation:</strong> {user.occupation}
        </>
    );
}

export default UserDetail;
