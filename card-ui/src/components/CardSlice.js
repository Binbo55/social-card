
import { createSlice } from "@reduxjs/toolkit";
import socialCardApi from "../apis/socialCardApi";


const CardSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        cardAdded: {
            reducer(state, action) {
                socialCardApi.saveAll(action.payload)
                console.log(action.payload)
            },
            prepare(avatar, name, description, image) {
                return {
                    payload: {
                        avatar,
                        name,
                        description,
                        image
                    }
                }
            }
        },

        deleteCard: {
            reducer(state, action) {
                socialCardApi.delete(action.payload)
            }
        },
        editCard: {
            reducer(state, action) {
                socialCardApi.saveAll(action.payload)
                console.log(action.payload)
            },
            prepare(avatar, name, description, image) {
                return {
                    payload: {
                        avatar,
                        name,
                        description,
                        image
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.cards;
export const { cardAdded, deleteCard, editCard } = CardSlice.actions
export default CardSlice.reducer