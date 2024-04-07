import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const photos = models.photoOfUserModel(user.userId);
  console.log(photos);
  
  return (
    <div>
      <Typography variant="body1">
        This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
      </Typography>
      {
        photos.map((photo) => (
          <Photo key={photo._id} {...photo} />
        ))
      }
      <h1> Ở đây em nghĩ webpack bản cũ quá nên bị lỗi k thể hiện thị ảnh mặc dù em truyền đúng định dạng rùi</h1>
    </div>
  );
}
function Photo(photo) {
  const fileName = photo.file_name;
  console.log(fileName, "hehe");
  return(
  <div>
      <strong>Id:</strong> {photo._id} <br />
      <strong>UserId:</strong> {photo.user_id} <br />
      <strong>Date:</strong> {photo.date_time} <br />
      <strong>FileName:</strong> {photo.file_name}
      <br />
      <img src={require(`../../images/${photo.file_name}`).default} alt="Ảnh" />
   
  </div>
  )
}
export default UserPhotos;
