import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/config";

// Async Thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching post
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await service.getPost(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for creating a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await service.createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for updating a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const response = await service.updatePost(slug, postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await service.deletePost(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    deleteStatus: "idle",
  }, // Add deleteStatus
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.documents || [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, action.payload];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post.slug === updatedPost.slug ? updatedPost : post
        );
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const deletedSlug = action.payload;
        state.posts = state.posts.filter((post) => post.slug !== deletedSlug);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
