import cloneDeep from 'lodash/cloneDeep';

export const handlersDefaultCase = (handlers, action, state) =>
    handlers.hasOwnProperty(action.type) ? handlers[action.type]() : cloneDeep(state);