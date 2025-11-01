import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserRequest } from "./authSlice";
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false
    },
    reducers: {
        fetchAllUsersRequest(state) {
            state.loading = true;
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchAllUsersFailed(state) {
            state.loading = false;
            state.error = null;
        },
        addNewAdminRequest(state) {
            state.loading = true;
        },
        addNewAdminSuccess(state) {
            state.loading = false;
        },
        addNewAdminFailed(state) {
            state.loading = false;
            state.error = null;
        },
    },
});

export const fetchAllUsers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllUsersRequest());
    await axios.get('http://localhost:4000/api/v1/users/all-users', {
        withCredentials: true,
    }).then((res) => {
        dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));

    }).catch((error) => {
        dispatch(userSlice.actions.fetchAllUsersFailed(error.response.data.message));
    });
};


export const addNewAdmin = (data) => async (dispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest());
    await axios.post('http://localhost:4000/api/v1/users/add-new-admin', data, {
        withCredentials: true,headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(res.data.message);
    }).catch((error) => {
        toast.error(error.response.data.message);
        dispatch(userSlice.actions.addNewAdminFailed(error.response.data.message));
    });
};

export default userSlice.reducer;
