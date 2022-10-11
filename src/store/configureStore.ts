import { configureStore, combineReducers } from "@reduxjs/toolkit";
import repositorySliceReducer from '../reducers/RepositoryReducer'
import exerciseCreatorSliceReducer from '../reducers/CreateReducer'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export const rootReducer = combineReducers({
    repository: repositorySliceReducer,
    create: exerciseCreatorSliceReducer
  }
)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = configureStore({ reducer: rootReducer})
export type StoreType = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<StoreType> = useSelector