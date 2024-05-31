import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/constants";
import { toast } from "react-toastify";

const initialState: {
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
  isVerified: boolean;
} = {
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  isVerified: false,
};

export const loginUser = createAsyncThunk("loginUser", async (body) => {
  try {
    const data = await fetch(`${CONSTANTS.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include"
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
});

export const registerUser = createAsyncThunk("registerUser", async (body) => {
  try {
    const data = await fetch(`${CONSTANTS.BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
});

export const verifyOtp = createAsyncThunk("verifyOtp", async (body) => {
  try {
    const data = await fetch(`${CONSTANTS.BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
});

export const checkLogin = createAsyncThunk(
  "checkLogin",
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("token--->", action.payload)
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("token", action.payload.accessToken);
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isError = true;
      });

    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("userId", action.payload.userId);
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // verify otp
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.isLoading = false;
      state.isVerified = true;
    });
    builder.addCase(verifyOtp.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // check login
    builder
      .addCase(checkLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isVerified = true;
      })
      .addCase(checkLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
