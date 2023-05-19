// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Save user data to localStorage
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Clear user data from localStorage
const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      // Validate form
      const requiredFields = [
        "email",
        "password",
        "phone",
        "firstName",
        "lastName",
      ];
      const missingFields = requiredFields.filter((field) => !user[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Check if the email is already registered
      const authData = JSON.parse(localStorage.getItem("authData")) || [];

      const existingUser = authData.find(
        (singleUser) => singleUser.email === user.email
      );
      if (existingUser) {
        const message = "Email already Exists";
        return thunkAPI.rejectWithValue(message);
      }

      // Save data to auth
      authData.push({ email: user.email, password: user.password });
      localStorage.setItem("authData", JSON.stringify(authData));

      // Save data to users
      const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
      const newUser = {
        id: usersData.length + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        dial: user.dial,
        phone: user.phone,
      };
      usersData.push(newUser);
      localStorage.setItem("usersData", JSON.stringify(usersData));

      return user;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredentials, thunkAPI) => {
    try {
      // fetch authdata from LS
      const authData = JSON.parse(localStorage.getItem("authData")) || [];

      // Confirm user exists and password is correct
      const matchedUser = authData.find(
        (userData) =>
          userData.email === userCredentials.email &&
          userData.password === userCredentials.password
      );

      if (matchedUser) {
        // save user to LS
        saveUserToLocalStorage(matchedUser);
        return matchedUser;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      // remove user from LS
      clearUserFromLocalStorage();
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
