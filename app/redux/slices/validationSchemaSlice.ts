import { createSlice } from "@reduxjs/toolkit";

interface Constraint {
    name: string;
    value: string;
}

interface Key {
    name: string;
    type: string;
    constraints: Constraint[];
}

interface ValidationSchemaState {
    schema: Key[] | null;
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