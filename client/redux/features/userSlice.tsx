import { UserState } from '@/types/global/redux.types'
import { User } from '@/types/global/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserState = {
  user: null,
  isProfileSidebarOpen: false,
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleProfileSidebar: (state, action) => {
      return {
        ...state,
        isProfileSidebarOpen: !state.isProfileSidebarOpen,
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.username,
        },
      }
    },
    deleteUser: (state, action) => {
      return {
        ...state,
        user: null,
      }
    },
  },
})

export const { toggleProfileSidebar, updateUser, deleteUser } =
  userReducer.actions
export default userReducer.reducer
