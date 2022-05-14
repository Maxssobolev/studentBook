import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TYPE_HOMEWORK, TYPE_NEWS } from '../../config/postTypes'
import { $host } from '../../http'

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const response = await $host.get(`/api/posts/all`)
    return response.data
  }
)

const postsReducer = createSlice({
  name: 'posts',
  initialState: {
    news: [],
    homeworks: [],
    isLoading: false
  },
  reducers: {
    pushNewPost(state, action) {
      /*
      isSeen - добавляем флажок на пришедшую запись "просмотрено?"
      */
      if (action.payload.postType == TYPE_NEWS) {
        state.news.unshift({ ...action.payload, isSeen: false, usersLiked: [] })
      }
      if (action.payload.postType == TYPE_HOMEWORK) {
        state.homeworks.unshift({ ...action.payload, isSeen: false, usersDoned: [], usersLiked: [] })
      }
    },

    seenAllIncomingPosts(state, action) {
      if (action.payload.postType == TYPE_NEWS) {
        state.news.forEach((itm) => {
          if (itm?.isSeen == false) {
            itm.isSeen = true
          }
        })
      }
      if (action.payload.postType == TYPE_HOMEWORK) {
        state.homeworks.forEach((itm) => {
          if (itm?.isSeen == false) {
            itm.isSeen = true
          }
        })
      }
    }
  },
  extraReducers: (builder) => {
    //getting posts reducer
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.news = action.payload.news
      state.homeworks = action.payload.homeworks
    })
  },
})

const { reducer, actions } = postsReducer
export const {
  seenAllIncomingPosts,
  pushNewPost
} = actions

export default reducer
