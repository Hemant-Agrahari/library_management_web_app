import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const bookSlice = createSlice({
    name: "book",
    initialState: {
        error: null,
        message: null,
        books: [],
        loading: false
    },
    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
            state.message = action.payload.message;
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        addBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetBookSlice(state) {
            state.error = null;
            state.message = null;
            state.loading = false;
        },
    }
});


export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/all`, {
        withCredentials: true,
    }).then((res) => {
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    }).catch((error) => {
        dispatch(bookSlice.actions.fetchBooksFailed(error.response.data.message));
    });
};

export const addBook = (book) => async (dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/admin/add-book`, book, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        dispatch(bookSlice.actions.addBookSuccess(res.data.message));
        toast.success(res.data.message);
        dispatch(fetchAllBooks());
    }).catch((error) => {
        dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
    });
}

export const resetBookSlice = () => (dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;