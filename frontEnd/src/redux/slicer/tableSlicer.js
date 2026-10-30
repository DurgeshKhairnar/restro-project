import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    table : []
}

export const tableSlicer = createSlice({
    name:'table',
    initialState,
    reducers:{
        addTables : (state,action) => {
            const tables = {
                tableNo : action.payload.tableNo,
                seats : action.payload.seats,
                status: action.payload.status
            }
            state.table.push(tables);
        },
        getTables : (state,action) => {
            state.table = action.payload;
        }
    }
})


export  const { getTables , addTables } = tableSlicer.actions;

export default tableSlicer.reducer;