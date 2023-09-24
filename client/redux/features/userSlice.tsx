import { UserState } from '@/types/global/redux.types'
import { User } from '@/types/global/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserState = {
  user: null,
  isUserSidebarOpen: false,
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUserSidebar: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isUserSidebarOpen: action.payload,
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
    deleteUser: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        user: null,
      }
    },
  },
})

export const { toggleUserSidebar, updateUser, deleteUser } = userReducer.actions
export default userReducer.reducer
