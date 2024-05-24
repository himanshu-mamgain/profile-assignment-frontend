import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadPhoto } from "../../store/slices/profile.slice";
import { CONSTANTS } from "../../constants/constants";

interface ProfilePhotoProps {
  photo: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photo }) => {
  const [file, setFile] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!file) {
      setFile(`${CONSTANTS.BASE_URL}/profile-photo/${userId}`);
    }
  }, [file]);

  function handleUploadFile() {
    if (uploadRef.current && uploadRef.current.files) {
      const file = uploadRef.current.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setFile(fileUrl);

        console.log(file)

        let formData = new FormData();
        formData.append("image", file);

        const payload = {
          token: localStorage.getItem("token"),
          formData,
        };

        console.log(formData)

        // @ts-ignore
        dispatch(uploadPhoto(payload));
      }
    }
  }

  return (
    <Box>
      <Avatar
        src={file || photo}
        alt="Profile Photo"
        sx={{ width: 150, height: 150, mb: 2 }}
      />
      <Button variant="contained" component="label">
        Upload Photo
        <input onChange={handleUploadFile} type="file" ref={uploadRef} hidden />
      </Button>
    </Box>
  );
};

export default ProfilePhoto;
