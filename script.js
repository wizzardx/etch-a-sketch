"use strict";

// TODO: Use CSS for styling, rather than setting style properties directly in JavaScript.
// TODO: Remove 'a' character from each cell
// TODO: Make each cell into a square.


const NUM_GRID_ROWS = 16;
const NUM_GRID_COLUMNS = 16;

function createCell() {
  const cell = document.createElement("div");
  cell.style.borderColor = "red";
  // cell.style.borderWidth = "1px";
  cell.style.borderStyle = "solid";
  cell.textContent = "a";
  // cell.style.cssText = "height:0;width:20%;padding-bottom:20%;background-color:yellow"
  cell.style.flexGrow = "1";
  return cell;
}

function createRow() {
  // Create a div to act as the row.
  const rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";

  // Inside the row div, add 16 divs to act as the cells.
  for (let i = 0; i < NUM_GRID_COLUMNS; i++) {
    const cell = createCell();
    rowDiv.appendChild(cell);
  }

  // Return our row div.
  return rowDiv;
}

function mouseEnteredCell(event) {
  // Get the target of the event, that points to the div for the cell that was entered
  const target = event.target
  // Set its background color to green
  target.style.backgroundColor = "green"
}

function mouseExitedCell(event) {
  // Get the target of the event, that points to the div for the cell that was exited
  const target = event.target
  // Unset the background color
  target.style.backgroundColor = ""
}

function setup16x16grid() {
  // Grab a reference to the container.
  const container = document.querySelector("#container");
  if (container === null) {
    throw new Error("Could not container element.");
  }

  // Add 16 rows to the container:
  for (let i= 0; i < NUM_GRID_ROWS; i++) {
    const row = createRow();
    container.appendChild(row);
  }

  // Use event delegation on the container to manage a hover effect on the per-cell divs
  container.addEventListener('mouseover', mouseEnteredCell)
  container.addEventListener('mouseout', mouseExitedCell)
}

setup16x16grid();