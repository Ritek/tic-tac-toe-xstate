import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

const toggleMachine2 = createMachine({
  id: 'toggle2',
  initial: 'active',
  states: {
    active: {
      on: { TOGGLE: 'inactive' }
    },
    inactive: {
      on: { TOGGLE: 'active' }
    },
  }
})

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);
  const [state2, send2] = useMachine(toggleMachine2);

  return (
    <>
      <button onClick={() => send('TOGGLE')}>
        {state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'}
      </button>

      <button onClick={() => send2('TOGGLE')}>
        {state2.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
      </button>

    </>
  );
};

export default Toggler;