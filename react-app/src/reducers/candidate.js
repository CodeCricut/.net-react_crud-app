import { ACTION_TYPES } from "./../actions/candidate";

//                                      WHAT ARE REDUCERS FOR?
/*
        Reducers are functions that return a modified state based on an action. There header looks something like this:
                    function myReducer(state = initialState, action)
        
        They will usually contain a switch-statement that decides what to do based on the action type.

        Reducers take in a state parameter. If you would like to provide an initial state, simply use es6 syntax to define if null.
*/

const initialState = {
    list: []
};

export const Candidate = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            };
        default:
            return state;
    }
};
