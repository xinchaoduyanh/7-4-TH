import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const UserPhotos = () => {
  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem("user_id");
  const [photos, setPhotos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://9mlf5s-8081.csb.app/api/photo/photosOfUser/${userId}`
        );
        setPhotos(response.data);
        setError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Không tìm thấy ảnh của người này 😢");
        } else {
          console.error("Error fetching photos:", error);
        }
      }
    };

    fetchPhotos();
  }, [userId]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (photoId) => {
    // Function remains unchanged
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePhotoUpload = async () => {
    // Function remains unchanged
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="body1">
        This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
      </Typography>
      {userId === loggedInUserId && (
        <Card variant="outlined" style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6">Upload a new photo</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePhotoUpload}
              style={{ marginTop: "10px" }}
            >
              Upload Photo
            </Button>
            {uploadError && <Alert severity="error">{uploadError}</Alert>}
          </CardContent>
        </Card>
      )}
      {photos.length > 0 ? (
        photos.map((photo) => (
          <Photo
            key={photo._id}
            photo={photo}
            onCommentSubmit={handleCommentSubmit}
            onCommentChange={handleCommentChange}
            commentText={commentText}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
          />
        ))
      ) : (
        <Typography>No photos available.</Typography>
      )}
    </div>
  );
};

const Photo = ({
  photo,
  onCommentSubmit,
  onCommentChange,
  commentText,
  showAllComments,
  setShowAllComments,
}) => {
  const { _id, user_id, date_time, file_name, comments } = photo;

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <Card variant="outlined" style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6">Photo Detail</Typography>
        <Typography>
          <strong>Id:</strong> {_id}
        </Typography>
        <Typography>
          <strong>UserId:</strong> {user_id}
        </Typography>
        <Typography>
          <strong>Date:</strong> {new Date(date_time).toLocaleString()}
        </Typography>
        <Typography>
          <strong>FileName:</strong> {file_name}
        </Typography>
        <img
          src={`https://9mlf5s-8081.csb.app/uploads/${file_name}`}
          alt="Ảnh"
          style={{
            maxWidth: "100%",
            marginTop: "10px",
            maxHeight: "300px",
            objectFit: "cover",
          }}
        />
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Comments:
        </Typography>
        {visibleComments && visibleComments.length > 0 ? (
          <List>
            {visibleComments.map((comment) => (
              <ListItem key={comment._id} alignItems="flex-start">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {comment.user_name ? comment.user_name[0].toUpperCase() : "?"}
                </Avatar>
                <ListItemText
                  primary={<strong>{comment.user_name || "Anonymous"}</strong>}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>
                      <br />
                      {comment.comment}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No comments yet.</Typography>
        )}
        {!showAllComments && comments.length > 3 && (
          <MuiLink
            component="button"
            variant="body2"
            onClick={() => setShowAllComments(true)}
          >
            Show more comments ({comments.length})
          </MuiLink>
        )}
        <TextField
          label="Comment"
          variant="outlined"
          value={commentText}
          onChange={onCommentChange}
          fullWidth
          multiline
          rows={3}
          style={{ marginTop: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onCommentSubmit(_id)}
          style={{ marginTop: "10px" }}
        >
          Submit Comment
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserPhotos;
