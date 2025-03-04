<script>
  let { radius, stroke, color } = $props();

  let width = $state(500); // Default values
  let height = $state(500);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<svg {width} {height}>
  <circle
    cx={width / 2}
    cy={height / 2}
    r={radius}
    fill={color}
    stroke="black"
    stroke-width={stroke}
  ></circle>
</svg>
