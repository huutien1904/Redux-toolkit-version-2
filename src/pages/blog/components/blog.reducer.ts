import { initalPostList } from './../../../constants/blog'
import { Post } from './../../../types/blog.type'
import { createReducer, createAction } from '@reduxjs/toolkit'

interface BlogState {
  postList: Post[],
  editingPost:Post | null
}
const initialState : BlogState = {
  postList: initalPostList,
  editingPost:null
}
export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string> ('blog/startEditPost')
export const cancelEditingPost = createAction<string> ('blog/cancelEditPost')
export const finishEditingPost = createAction<Post> ('blog/finishEditPost')
const blogReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(addPost,(state,action) => {
        const post = action.payload
        state.postList.push(post)
      })
      .addCase(deletePost,(state,action) => {
        const idPost  = action.payload
        const findPostIndex = state.postList.findIndex((post) => post.id === idPost)
        if(findPostIndex !== -1){
          state.postList.splice(findPostIndex,1)
        }
      })
      .addCase(startEditingPost,(state,action) => {
        const idPost  = action.payload
        const foundPost = state.postList.find((post) => post.id === idPost) || null
        state.editingPost = foundPost
      })
      .addCase(cancelEditingPost,(state,action) => {
        state.editingPost = null
      })
      .addCase(finishEditingPost,(state,action) =>{
        const postId = action.payload.id
        state.postList.some((post,index) => {
          if(post.id ==postId){
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })

})

export default blogReducer
