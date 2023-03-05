import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isChoosen: false,
    data: {},
};

const apartmentSlice = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        initiate: (state) => {
            return initialState;
        },
        setApartment: (state, action) => {
            state.isChoosen = true;
            state.data = action.payload;
        },
    },
});

//reducer
const apartmentReducer = apartmentSlice.reducer;

export const apartmentDataSelector = state => state.apartmentReducer;
export const { initiate, setApartment } = apartmentSlice.actions;
export default apartmentReducer;
