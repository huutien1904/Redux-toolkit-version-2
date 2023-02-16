import { initalPostList } from '../../../constants/blog'
import { Post } from '../../../types/blog.type'
import { createReducer, createAction,createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

interface BlogState {
  postList: Post[],
  editingPost:Post | null
}
const initialState : BlogState = {
  postList: initalPostList,
  editingPost:null
}

const blogSlice = createSlice({
  name:"blogSlice",
  initialState,
  reducers:{
    deletePost:(state,action:PayloadAction<string>) => {
      const idPost  = action.payload
        const findPostIndex = state.postList.findIndex((post) => post.id === idPost)
        if(findPostIndex !== -1){
          state.postList.splice(findPostIndex,1)
        }
    },
    startEditingPost:(state,action:PayloadAction<string>) =>{
      const idPost  = action.payload
      const foundPost = state.postList.find((post) => post.id === idPost) || null
      state.editingPost = foundPost
    },
    cancelEditingPost:(state) =>{
      state.editingPost = null
    },
    finishEditingPost :(state,action:PayloadAction<Post>) =>{
      const postId = action.payload.id
        state.postList.some((post,index) => {
          if(post.id ==postId){
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
    },
    addPost :{
      reducer:(state,action:PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare:(post:Omit<Post,'id'>) => ({
        payload:{
          ...post,
          id:nanoid()
        }
      })
    }
  }
})

export const {addPost,cancelEditingPost,deletePost,finishEditingPost,startEditingPost} = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer


