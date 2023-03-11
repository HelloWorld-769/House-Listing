import { CREATE_HOUSES, DELETE_HOUSES, FETCH_HOUSES} from "../actions/houseAction";


const initialState={
    houses:[]
}

export default function(state=initialState,action){
    switch (action.type) {
        case FETCH_HOUSES:
            return {
                ...state,
                houses: action.payload
            }
        case CREATE_HOUSES:
            // console.log(action.payload)
            return{
                ...state,
                houses:state.houses.concat(action.payload)
            }
        case DELETE_HOUSES:
            return{
                houses:state.houses.filter(id=> id!==action.payload)
            }       
    }
    return state;
}