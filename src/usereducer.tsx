import React from 'react';

// arr.reduce(sum,0)

export default function ReducerExample() {
  const reducer = (state: number, action: any) => {
    console.log(action);
    switch (action) {
      case 'ADD':
        return state + 1;
      case 'SUB':
        return state - 1;
      case 'RES':
        return (state = 0);
      default:
        return state;
    }
  };

  const [count, dispatch] = React.useReducer(reducer, 0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch('ADD')}>+</button>
      <button
        onClick={() => {
          dispatch('SUB');
          console.log(dispatch);
        }}
      >
        -
      </button>
      <button onClick={() => dispatch('RES')}>reset</button>
    </div>
  );
}
