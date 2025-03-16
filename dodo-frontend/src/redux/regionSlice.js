import {createSlice} from '@reduxjs/toolkit'


const regionSlice = createSlice({
    name: "region",
    initialState: null,
    reducers: {
        setRegion: (state, action) => {
            return action.payload;
        }
    }
})
export const {setRegion} = regionSlice.actions;
export default regionSlice.reducer;