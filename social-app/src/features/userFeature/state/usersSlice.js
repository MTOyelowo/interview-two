import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  return usersData;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId) => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const user = usersData.find((item) => item.id === userId);

    return user ? { id: user.id, email: user.email } : null;
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async (profileData) => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsersData = usersData.map((user) =>
      user.id === profileData.id ? { ...user, ...profileData } : user
    );
    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));

    return { ...profileData };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
