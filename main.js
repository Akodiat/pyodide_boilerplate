import {plot} from "./src/plot.js";

// Get reference to the plot UI element
const plotDiv = document.getElementById("plot");

// Get reference to the file input
const fileInput = document.getElementById("fileInput");

// Setup handler for file upload
// This will be called when the input value changes
fileInput.onchange = () => {
    // Display loading indicator
    plotDiv.ariaBusy = "true";

    // Parse input file
    Papa.parse(fileInput.files[0], {
        complete: result => {
            processData(result.data);
        },
        // Convert to numbers instead of the default strings
        dynamicTyping: true
    });
}

/**
 * Function for processing data in Python (pyodide)
 * Needs to be asyncronous to use "await"
 * @param {*} data
 */
async function processData(data) {
    // Setup pyodide
    let pyodide = await loadPyodide();

    // Load numpy
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('numpy');


    // Set data variables in python global scope
    const xs = data.map(v=>v[0]);
    const ys = data.map(v=>v[1]);
    pyodide.globals.set("xs", xs);
    pyodide.globals.set("ys", ys);

    // Actually run some python
    pyodide.runPython(`
        import numpy as np
        total = np.array(xs) + np.array(ys)
    `);

    // Extract the result
    const total = pyodide.globals.get('total').toJs();

    // Vega-lite needs this format for the data, so we convert
    // the 1D array into a list of {x, y} objects.
    const outputData = [...total].map((v,i)=>({
        x: i,
        y: v
    }));

    // Plot output data with vega-lite
    plot(outputData);

    // Remove loading indicator
    plotDiv.ariaBusy = "false";
}