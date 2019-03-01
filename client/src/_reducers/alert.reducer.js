import { alertConstantes} from "../_constants";

export function alert(state = {}, action){
    switch (action.type) {
        case alertConstantes.SUCCESS :
            return {
                type: 'alert-success',
                message: action.message
            }
        case alertConstantes.ERROR :
            return {
                type: 'alert-danger',
                message: action.message
            }
        case alertConstantes.CLEAR :
            return {}
        default :
            return state;
    }
}