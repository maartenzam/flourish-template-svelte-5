import { mount } from 'svelte';
import Viz from './Viz.svelte';

export var data = {};
// If your template includes data tables, use this variable to access the data.
// Each of the 'datasets' in data.json file will be available as properties of the data.

export var state = $state({
	radius: 10,
	stroke: 1,
	color: "#FF0000"
});

// The draw function is called when the template first loads
export function draw() {
    mount(Viz, {
      target: document.body,
      props: state
    })
}

  // The update function is called whenever the user changes a data table or settings
  // in the visualisation editor, or when changing slides in the story editor.
  // Tip: to make your template work nicely in the story editor, ensure that all user
  // interface controls such as buttons and sliders update the state and then call update.
export function update() {
	if (state.radius <= 0) throw new Error("Radius must be positive");
}
