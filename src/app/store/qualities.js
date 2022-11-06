import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/qualities.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualitiesService.get();
        dispatch(qualitiesReceived(content));
    } catch (error) {
        dispatch(qualitiesRequestFailed(error.message));
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qalId of qualitiesIds) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qalId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
