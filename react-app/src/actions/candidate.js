import api from "./api";

// Actions are payloads of information used to update your store. You can send them to the store.dispatch()
// Action Creators are functions that create actions. You would call one like this: dispatch(myActionCreator(argsToCreateAction))
// If you would like to automatically dispatch the action from the action creator, make sure to prefix the action creator name with 'bound'

export const ACTION_TYPES = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL"
};

//                                              BASIC ACTIONS/ACTION CREATORS
/*
        function myActionCreator(myArgs){
            return {
                type: MY_TYPE,
                payload: myArgs
            }
        }

        dispatch(myActionCreator(myArgs))
*/

//                                              WHAT THE HECK IS A THUNK?
/*
        it is bascially a function returned by another function:
                function wrapperFunc(){
                    return function thunk(){
                        console.log("I'm a thunk!");
                    }
                }
        
        An action can't actually do anything, and a reducer can't make API calls. 
        If you want an action to do something, the code needs to live inside a function. That function is a thunk.

        To put it simply, THUNK IS A MIDDLEWARE THAT CALLS ANY ACTION THAT IS A FUNCTION. For example, console.log would get 
        called in the following Action Creator:
                function logAction(message){
                    return () => console.log(message)
                }
        
        Thunk also passes the dispatch and getState functions to the thunk- (inner-) function so you can interact with the state:
                function updateDb(info){
                    return function(dispatch, getState){
                        axios.post("/api") // or update db somehow
                        dispatch(oldInfo(getState()))
                        dispatch(success());
                    }
                }
*/
//                                              WHY USE THUNK?
/*
        In short, Thunk is used to perform complex, sometimes asynchronous, operations on the store; or to interact
        with external APIs.
*/

// Since this action creator returns a function, Thunk will call it and pass in the necessary args.
export const fetchAll = () => async (dispatch, getState) => {
    // get api req.
    try {
        const { data } = await api.candidate().fetchAll();
        console.dir(data);
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: data // update the internal state
        });
    } catch (err) {
        console.error(err);
    }
};

const formatData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
});

export const create = (data, onSuccess) => async dispatch => {
    try {
        data = formatData(data);
        const { data: newData } = await api.candidate().create(data);
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: newData
        });
        onSuccess();
        return newData.id;
    } catch (err) {
        console.error(err);
    }
};

export const update = (id, data, onSuccess) => async dispatch => {
    try {
        data = formatData(data);
        const { data: newData } = await api.candidate().update(id, data);

        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { id, ...newData }
        });
        onSuccess();
    } catch (err) {
        console.error(err);
    }
};

export const deleteRecord = (id, onSuccess) => async dispatch => {
    try {
        await api.candidate().delete(id);

        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        });
        onSuccess();
    } catch (err) {
        console.error(err);
    }
};
