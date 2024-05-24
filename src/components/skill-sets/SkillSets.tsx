import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSkills, deleteSkill } from "../../store/slices/profile.slice";
import { Close } from "@mui/icons-material";

interface SkillSetProps {
  skills: string[];
  onUpdate: () => void;
}

const SkillSets: React.FC<SkillSetProps> = ({ skills, onUpdate }) => {
  const [skillFlag, setSkillFlag] = useState<boolean>(false);
  const [skill, setSkill] = useState<string>("");

  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSkill(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      token: localStorage.getItem("token"),
      skills: skill.split(",").map((s) => s.trim()), // Trim spaces around skills
    };

    // @ts-ignore
    dispatch(addSkills(payload)).then(() => {
      // Re-fetch skills after adding
      onUpdate();
      setSkillFlag(false); // Close the form after submission
      setSkill(""); // Clear the input field
    });
  }

  function handleSkillDelete(skillIndex: number) {
    const payload = {
      token: localStorage.getItem("token"),
      skillIndex,
    };

    // @ts-ignore
    dispatch(deleteSkill(payload)).then(() => {
      // Re-fetch skills after deleting
      onUpdate();
    });
  }

  return (
    <Box sx={{ my: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{ fontFamily: "inherit", p: 2, pt: 0, mb: 1 }}
        >
          Skill Sets
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          {skills?.map((skill, index) => (
            <Button key={index} variant="outlined">
              {skill}
              <IconButton onClick={() => handleSkillDelete(index)}>
                <Close />
              </IconButton>
            </Button>
          ))}
        </Box>
        {skillFlag ? (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ my: 2 }}
          >
            <TextField
              fullWidth
              id="skill"
              name="skill"
              label="Enter new skills, separated by commas"
              value={skill}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        ) : (
          <Button variant="contained" onClick={() => setSkillFlag(true)}>
            Add
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SkillSets;
