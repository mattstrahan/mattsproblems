import { configureStore, combineReducers } from "@reduxjs/toolkit";
import repositorySliceReducer from '../Reducers/RepositoryReducer'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export const rootReducer = combineReducers({
  repository: repositorySliceReducer}
)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = configureStore({ reducer: rootReducer})
export type StoreType = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<StoreType> = useSelector