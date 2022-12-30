import React, { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({ ...state, error: false, loading: false, confirmed: true });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, deleted: false, confirmed: false, value: '' });
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
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };