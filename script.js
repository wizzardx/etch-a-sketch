"use strict";

const DEFAULT_SQUARES_PER_GRID_SIDE = 16;
const MIN_SQUARES_PER_GRID_SIDE = 1;
const MAX_SQUARES_PER_GRID_SIDE = 100;

// Global variables indicating the size of the grid on each side. These
// are updated when the user clicks on the "Change Grid Size" button
let numGridRows = DEFAULT_SQUARES_PER_GRID_SIDE;
let numGridColumns = DEFAULT_SQUARES_PER_GRID_SIDE;
let GRID_WIDTH_PX = 960;
let GRID_HEIGHT_PX = 960;


function createCell() {
  const cell = document.createElement("div");
  cell.classList.add("grid-cell")
  return cell;
}

function createRow() {
  // Create a div to act as the row.
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("grid-row");
  rowDiv.style.width = `${GRID_WIDTH_PX}px`;
  rowDiv.style.height = `${GRID_HEIGHT_PX / numGridRows}px`;

  // Inside the row div, add 16 divs to act as the cells.
  for (let i = 0; i < numGridColumns; i++) {
    const cell = createCell();
    rowDiv.appendChild(cell);
  }

  // Return our row div.
  return rowDiv;
}

function random256() {
  return Math.floor(Math.random() * 256);
}

function getRandomRgbString() {
  return `rgb(${random256()}, ${random256()}, ${random256()})`;
}

function increaseOpacity(style) {
  // Grab opacity, if present at all, from the style.
  let opacityString = style.opacity;

  // If the opacity is an empty string then convert it to 0.0
  if (opacityString === "") {
    opacityString = "0.1";
  }

  // Convert from string to a floating point
  let opacity = parseFloat(opacityString);

  // If opacity is less than 1.0, then add 0.1 to it.
  if (opacity <= 1.0) {
    opacity += 0.1;
  }

  // If the opacity went past 1.0 then clip it back to 1.0.
  if (opacity > 1.0) {
    opacity = 1.0;
  }

  // Convert opacity back to string
  opacityString = `${opacity}`;

  // Save updated opacity to the style
  style.opacity = opacityString;
}

function mouseEnteredCell(event) {
  // Get the target of the event, that points to the div for the cell that was entered
  const target = event.target

  // Don't process the "container" div itself.
  if (target.id === "container") {
    return;
  }

  // Mouse moved through the cell, so highlight the cell.
  // target.classList.add("cell-highlighted");

  // For extra credit part 2: Work with gradually increasing opacity.
  increaseOpacity(target.style);

  // For extra credit part 1: Use random RGB values.
  target.style.backgroundColor = getRandomRgbString();
}

function setupGrid() {
  // Grab a reference to the container.
  const container = document.querySelector("#container");
  if (container === null) {
    throw new Error("Could not container element.");
  }

  // Add 16 rows to the container:
  for (let i= 0; i < numGridRows; i++) {
    const row = createRow();
    container.appendChild(row);
  }

  // Use event delegation on the container to manage a hover effect on the per-cell divs
  container.addEventListener('mouseover', mouseEnteredCell)
}

setupGrid();

  function deleteDivsInContainer() {
    // Grab a reference to the container.
    const container = document.querySelector("#container");
    if (container === null) {
      throw new Error("Could not container element.");
    }

    // Convert live NodeList to a static array
    const children = Array.from(container.childNodes);

    // Proceed through and delete the direct child nodes of #container that are divs.
    for (const child of children) {
      if (child.tagName === "DIV") {
        container.removeChild(child);
      }
    }
  }

function userClickedChangeGridSizeButton() {
  const input = prompt("How many squares per side?\n" +
    `(${MIN_SQUARES_PER_GRID_SIDE}-${MAX_SQUARES_PER_GRID_SIDE})`, DEFAULT_SQUARES_PER_GRID_SIDE.toString());
  // Quit if the user quit the prompt
  if (input === null) {
    return;
  }
  // Attempt to convert user input to integer
  const squaresPerSide = parseInt(input);

  // Show a message and quit if the integer wasn't a valid integer.
  if (isNaN(squaresPerSide)) {
    alert("Input was not a valid integer");
    return;
  }

  // Check the range of the user input.
  if (squaresPerSide < MIN_SQUARES_PER_GRID_SIDE) {
    alert("Your input number was too low")
  } else if (squaresPerSide > MAX_SQUARES_PER_GRID_SIDE) {
    alert("Your input number was too high");
    return;
  }

  // Update the global variables indicating the size of the grid.
  // and then delete and re-create the grid.
  numGridRows = squaresPerSide;
  numGridColumns = squaresPerSide;

  deleteDivsInContainer();
  setupGrid()
}

function setupChangeGridSizeButton() {
  // Handle click events on the "Change Grid Size" button.
  const button = document.getElementById("change-grid-size-button")
  if (button === null) {
    throw new Error("Unable to find 'Change Grid Size' button");
  }
  button.addEventListener('click', userClickedChangeGridSizeButton);
}

// Respond to the user clicking on the "Change Grid Size" button
setupChangeGridSizeButton();