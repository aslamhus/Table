export const actions = {
  selectRows: 'selectRows',
  setData: 'setData',
  setCallbacks: 'setCallbacks',
  setEnableCheckbox: 'setEnableCheckbox',
  setHeaders: 'setHeaders',
  setOrderOption: 'setOrderOption',
};

export const initialState = {
  enableCheckbox: true,
  headers: Map,
  orderOption: {},
  data: [],
  selectedRows: {},
  callbacks: {
    onChangeOrder: null,
    onDelete: null,
    onFilterChange: null,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setData:
      return {
        ...state,
        data: action.payload,
      };

    case actions.setCallbacks:
      return {
        ...state,
        callbacks: { ...state.callbacks, ...action.payload },
      };

    case actions.setEnableCheckbox:
      return {
        ...state,
        enableCheckbox: action.payload,
      };

    case actions.selectRows:
      return {
        ...state,
        selectedRows: action.payload,
      };

    case actions.setHeaders:
      return {
        ...state,
        headers: action.payload,
      };

    case actions.setOrderOption:
      return {
        ...state,
        orderOption: action.payload,
      };
    default:
      return state;
  }
};
