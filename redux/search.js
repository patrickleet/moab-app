export const SEARCH = 'SEARCH';

const initialState = {
  keywords: ''
};
Object.freeze(initialState);

export default function reducer(state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case SEARCH:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}

export function search(keywords = '') {
  return {
    type: SEARCH,
    payload: {
      keywords
    }
  };
}
