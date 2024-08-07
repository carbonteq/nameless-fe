import { createSlice } from "@reduxjs/toolkit";
import { Con } from "@/app/drag-test/page";
import { IKey } from "@/app/zodSchemaCreator";

interface ValidationSchemaState {
    schema: IKey[] | null;
}

const initialState: ValidationSchemaState = {
    schema: null
};

const validationSchemaSlice = createSlice({
    name: 'validationSchema',
    initialState,
    reducers: {
        setSchema: (state, action) => {
            state.schema = action.payload;
            console.debug(action.payload)
        }
    }
});

export const { setSchema } = validationSchemaSlice.actions;

export default validationSchemaSlice.reducer;