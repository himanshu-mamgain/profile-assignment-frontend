import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/constants";
import { toast } from "react-toastify";
import { EducationDetails } from "../../components/education-details-form/EducationDetailsForm";
import { ExperienceDetails } from "../../components/past-experience-form/PastExperienceForm";

const initialState: {
  isLoading: boolean;
  isError: boolean;
  profileData: any;
  skillProfile: any;
  profileDetails: any;
  educationDetails: any;
  experienceDetails: any;
} = {
  isLoading: false,
  isError: false,
  profileData: null,
  skillProfile: null,
  profileDetails: null,
  educationDetails: null,
  experienceDetails: null,
};

export const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (token: string) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/profile`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const fetchSkillProfile = createAsyncThunk(
  "fetchSkillProfile",
  async (token: string) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/skill-profile`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const fetchProfileDetails = createAsyncThunk(
  "fetchProfileDetails",
  async (token: string) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/profile-details`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const updateBasicDetails = createAsyncThunk(
  "updateBasicDetails",
  async ({ token, basicDetails }: { token: string; basicDetails: any }) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/update-basic-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(basicDetails),
      });

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  "uploadPhoto",
  async ({ token, formData }: { token: string; formData: FormData }) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/upload-photo`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const addSkills = createAsyncThunk(
  "addSkills",
  async ({ token, skills }: { token: string; skills: string[] }) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/add-skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills }),
      });

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const addEducation = createAsyncThunk(
  "addEducation",
  async ({
    token,
    education,
  }: {
    token: string;
    education: EducationDetails;
  }) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/add-education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(education),
      });

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const addExperience = createAsyncThunk(
  "addExperience",
  async ({
    token,
    experience,
  }: {
    token: string;
    experience: ExperienceDetails;
  }) => {
    try {
      const data = await fetch(`${CONSTANTS.BASE_URL}/add-experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experience),
      });

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "deleteSkill",
  async ({ token, skillIndex }: { token: string; skillIndex: number }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/delete-skill?skillIndex=${skillIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "deleteEducation",
  async ({ token, educationId }: { token: string; educationId: number }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/delete-education/${educationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "deleteExperience",
  async ({ token, experienceId }: { token: string; experienceId: number }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/delete-experience/${experienceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const updateEducation = createAsyncThunk(
  "updateEducation",
  async ({
    token,
    education,
    educationId,
  }: {
    token: string;
    education: any;
    educationId: string;
  }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/update-education/${educationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(education),
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const updateExperience = createAsyncThunk(
  "updateExperience",
  async ({
    token,
    experience,
    experienceId,
  }: {
    token: string;
    experience: any;
    experienceId: number;
  }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/update-experience/${experienceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(experience),
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        toast.success(response.message);
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const getEducationDetails = createAsyncThunk(
  "getEducationDetails",
  async ({ token, educationId }: { token: string; educationId: string }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/education-details/${educationId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

export const getExperienceDetails = createAsyncThunk(
  "getExperienceDetails",
  async ({ token, experienceId }: { token: string; experienceId: string }) => {
    try {
      const data = await fetch(
        `${CONSTANTS.BASE_URL}/experience-details/${experienceId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();

      if (data.status === 200) {
        return response;
      }

      toast.error(response.message);
    } catch (err: any) {
      console.error(err?.message);
      toast.error(err?.message);
    }
  }
);

const profileSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profileData = action.payload.profileData;
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.isError = true;
    });

    // fetch skill profile
    builder.addCase(fetchSkillProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSkillProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.skillProfile = action.payload.skillProfile;
    });
    builder.addCase(fetchSkillProfile.rejected, (state) => {
      state.isError = true;
    });

    // fetch profile details
    builder.addCase(fetchProfileDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profileDetails = action.payload.profileDetails;
    });
    builder.addCase(fetchProfileDetails.rejected, (state) => {
      state.isError = true;
    });

    // upload photo
    builder.addCase(uploadPhoto.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadPhoto.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(uploadPhoto.rejected, (state) => {
      state.isError = true;
    });

    // add skills
    builder.addCase(addSkills.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSkills.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addSkills.rejected, (state) => {
      state.isError = true;
    });

    // add education
    builder.addCase(addEducation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEducation.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addEducation.rejected, (state) => {
      state.isError = true;
    });

    // add experience
    builder.addCase(addExperience.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addExperience.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addExperience.rejected, (state) => {
      state.isError = true;
    });

    // education details
    builder.addCase(getEducationDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEducationDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.educationDetails = action.payload.educationDetails;
    });
    builder.addCase(getEducationDetails.rejected, (state) => {
      state.isError = true;
    });

    // experience details
    builder.addCase(getExperienceDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExperienceDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.experienceDetails = action.payload.experienceDetails;
    });
    builder.addCase(getExperienceDetails.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default profileSlice.reducer;
