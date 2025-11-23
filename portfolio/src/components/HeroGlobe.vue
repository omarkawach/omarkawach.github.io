<template>
  <div id="globe" aria-label="3D rotating graticule"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as d3 from "d3";
import worldData from "../data/world.json";

onMounted(() => {
  const el = document.getElementById("globe");
  if (!el) return;
  const size = Math.min(el.clientWidth || 360, el.clientHeight || 360);
  const projection = d3
    .geoOrthographic()
    .scale(size * 0.48)
    .translate([size / 2, size / 2])
    .rotate([0, -25]);
  let path = d3.geoPath(projection);
  const svg = d3
    .select(el)
    .append("svg")
    .attr("viewBox", `0 0 ${size} ${size}`)
    .attr("width", size)
    .attr("height", size);
  // Define gradient
  const defs = svg.append("defs");
  const grad = defs
    .append("radialGradient")
    .attr("id", "globeFill")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");
  grad.append("stop").attr("offset", "0%" ).attr("stop-color", "#0b3d2e");
  grad.append("stop").attr("offset", "70%" ).attr("stop-color", "#062019");
  grad.append("stop").attr("offset", "100%" ).attr("stop-color", "#04140f");
  // Sphere outline with gradient fill
  svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("d", path)
    .attr("fill", "url(#globeFill)")
    .attr("stroke", "var(--color-border)")
    .attr("stroke-width", 1);
  // Graticule lines
  const graticule = d3.geoGraticule10();
  svg
    .append("path")
    .datum(graticule)
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "var(--color-accent)")
    .attr("stroke-opacity", 0.35)
    .attr("stroke-width", 0.5);
  // Countries (sample dataset; replace with full world for detail)
  if (worldData?.features) {
    svg
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "rgba(20,160,46,0.18)")
      .attr("stroke", "var(--color-accent)")
      .attr("stroke-width", 0.6)
      .attr("vector-effect", "non-scaling-stroke");
  }
  // Rotation
  const speed = 0.015; // degrees per ms
  d3.timer((elapsed) => {
    const deg = (elapsed * speed) % 360;
    projection.rotate([deg, -25]);
    path = d3.geoPath(projection);
    svg.selectAll("path").attr("d", path);
  });
});
</script>
<style scoped>
#globe {
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.35));
}
@media (prefers-reduced-motion: reduce) {
  svg {
    animation: none !important;
  }
}
</style>
