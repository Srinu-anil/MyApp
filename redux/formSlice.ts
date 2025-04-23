import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import formData from '../ProtoForm.json';

const formSlice = createSlice({
  name: 'form',
  initialState: {data: formData, user: null, password: null},
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.password = action.payload.password;
    },
    logout: state => {
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

export const {setFieldValue, setActiveSection, loginSuccess, logout} =
  formSlice.actions;
export default formSlice.reducer;
