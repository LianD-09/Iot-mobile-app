import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userId: 0,
    data: {},
};

const apartmentSlice = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        initiate: (state, action) => {
            state.userId = action.payload;
        },
        setApartment: (state, action) => {
            state.data = action.payload;
        },
    },
});

//reducer
const apartmentReducer = apartmentSlice.reducer;

export const apartmentDataSelector = state => state.apartmentReducer.data;
export const { initiate, setApartment } = apartmentSlice.actions;
export default apartmentReducer;
