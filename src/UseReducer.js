import React, { useEffect, useReducer, useState } from "react";

const SECURITY_CODE = 'paradigma';
const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = (event) => {
    dispatch({ type: actionTypes.write, payload: event.target.value });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  }

  useEffect(() => {
    console.log('Empezando el efecto');
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validación');
        if (SECURITY_CODE === state.value) {
          onConfirm();
        } else {
          onError();
        }
        console.log('Terminando la validación');
      }, 3000);
    }
    console.log('Terminando el efecto');
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button onClick={onDelete}>
          Sí, eliminar
        </button>
        <button onClick={onReset}>
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

// const reducer = (state, action) => {

// };

// const reducerIf = (state, action) => {
//   if (action.type === 'ERROR') {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === 'CHECK') {
//     return {
//       ...state,
//       loading: true,
//     };
//   } else {
//     return {
//       ...state,
//     };
//   }
// };

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case 'ERROR':
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case 'CHECK':
//       return {
//         ...state,
//         loading: true,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true
  },
  [actionTypes.reset]: {
    ...state,
    deleted: false,
    confirmed: false,
    value: ''
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };