import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    connections: [],
    pendingConnections: [],
    followers: [],
    following: []
}

export const fetchConnections = createAsyncThunk(
    'users/fetchConnections',
    async (token) => {
        const { data } = await api.get('/api/user/connections', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.success ? data : null;
    },
)

export const connectionSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchConnections.fulfilled, (state, action) => {
            if (action.payload) {
                state.connections = action.payload.connections;
                state.pendingConnections = action.payload.pendingConnections;
                state.following = action.payload.following;
                state.followers = action.payload.followers;
            }
        })
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = connectionSlice.actions

export default connectionSlice.reducer