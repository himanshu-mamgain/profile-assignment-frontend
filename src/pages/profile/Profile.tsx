import { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  fetchProfileDetails,
  fetchSkillProfile,
} from "../../store/slices/profile.slice";

import Header from "../../components/header/Header";

import BasicDetails from "../../components/basic-details/BasicDetails";
import SkillSets from "../../components/skill-sets/SkillSets";
import EducationQualifications from "../../components/education-qualification/EducationQualifications";
import PastExperience from "../../components/past-experience/PastExperience";

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const fetchAllProfileData = (token: string) => {
    // @ts-ignore
    dispatch(fetchProfile(token));
    // @ts-ignore
    dispatch(fetchSkillProfile(token));
    // @ts-ignore
    dispatch(fetchProfileDetails(token));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllProfileData(token);
    }
  }, []);

  const { profileData, skillProfile, profileDetails } = useSelector(
    (state: { profile: any }) => state.profile
  );

  return (
    <Container maxWidth="lg">
      <Header />
      {profileData && (
        <>
          <BasicDetails data={profileData} photo={skillProfile?.photo} />
          <SkillSets
            skills={skillProfile?.skills}
            onUpdate={fetchAllProfileData}
          />
          <EducationQualifications
            educationDetails={profileDetails?.education}
            onUpdate={fetchAllProfileData}
          />
          <PastExperience
            experienceDetails={profileDetails?.experience}
            onUpdate={fetchAllProfileData}
          />
        </>
      )}
    </Container>
  );
};

export default Profile;
