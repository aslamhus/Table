export const actions = {
  selectRows: 'selectRows',
  setData: 'setData',
  setCallbacks: 'setCallbacks',
  setEnableCheckbox: 'setEnableCheckbox',
  setHeaders: 'setHeaders',
  setOrderOption: 'setOrderOption',
  setFilterValue: 'setFilterValue',
};

export const initialState = {
  enableCheckbox: true,
  headers: Map,
  orderOption: {},
  data: [],
  selectedRows: {},
  filter: '',
  callbacks: {
    onChangeOrder: null,
    onDelete: null,
    onFilterChange: null,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    // set the data
    case actions.setData:
      return {
        ...state,
        data: action.payload,
      };
    // set the callbacks
    case actions.setCallbacks:
      return {
        ...state,
        callbacks: { ...state.callbacks, ...action.payload },
      };
    // set the enableCheckbox
    case actions.setEnableCheckbox:
      return {
        ...state,
        enableCheckbox: action.payload,
      };
    // select rows
    case actions.selectRows:
      return {
        ...state,
        selectedRows: action.payload,
      };
    // set the table headers
    case actions.setHeaders:
      return {
        ...state,
        headers: action.payload,
      };
    // set the order option (column name, direction, column id)
    case actions.setOrderOption:
      return {
        ...state,
        orderOption: action.payload,
      };
    // set the filter value
    case actions.setFilterValue:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
