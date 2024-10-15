import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../core/models/user.model';
import { Roles } from '../../core/models/roles';
import { clearLocalStorage, persistLocalStorage } from '../../core/utils';

export const EmptyUserState: UserInfo = {
  id: 0,
  name: '',
  email: '',
  rol: Roles.ADMIN
};

export const UserKey = 'user';

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      console.log(state);
      persistLocalStorage<UserInfo>(UserKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    }
  }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
