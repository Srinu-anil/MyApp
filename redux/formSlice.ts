import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import formData from '../ProtoForm.json';

const formSlice = createSlice({
  name: 'form',
  initialState: {data: null, user: null, password: null},
  reducers: {
    formResponse: (state, action) => {
      state.data = state.data ? state.data : action.payload;
      console.log('data ', state.data);
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.password = action.payload.password;
    },
    logout: () => {
      return {data: formData, user: null, password: null};
    },
    setFieldValue: (
      state,
      action: PayloadAction<{section: string; name: string; value: string}>,
    ) => {
      console.log('setFieldValue ', state, action);
      const section = state.data[sectionKey(action.payload.section)];
      if (section && section.fields) {
        const field = section.fields.find(f => f.name === action.payload.name);
        if (field) {
          field.value = action.payload.value;
        }
      }
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.data.activeSection = action.payload;
    },
  },
});

const sectionKey = (title: string) => {
  return title.charAt(0).toLowerCase() + title.replace(/\s+/g, '').slice(1);
};

export const {
  setFieldValue,
  setActiveSection,
  loginSuccess,
  logout,
  formResponse,
} = formSlice.actions;
export default formSlice.reducer;
