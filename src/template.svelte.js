import { mount } from 'svelte';
import Viz from './Viz.svelte';

export var data = {};

// Set up state as a serializable object
export var state = {
  radius: 50,
  stroke: 2,
  color: '#ffffff',
};

// Create a separate reactive store for internal Svelte use
let reactiveState = $state({});

// The draw function is called when the template first loads
export function draw() {
  reactiveState = { ...state };
  reactiveState.data = data;

  mount(Viz, {
    target: document.body,
    props: reactiveState, // Pass the reactive state to Svelte
  });
}

// The update function is called whenever the user changes a data table or settings
// in the visualisation editor, or when changing slides in the story editor.
// Tip: to make your template work nicely in the story editor, ensure that all user
// interface controls such as buttons and sliders update the state and then call update.
export function update() {
  if (state.radius <= 0) throw new Error('Radius must be positive');

  // Update reactive state with changes from Flourish
  Object.assign(reactiveState, state);
  reactiveState.data = data;
}
