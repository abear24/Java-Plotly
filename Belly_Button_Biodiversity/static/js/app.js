function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata pa
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    var url='/metadata/${sample}';
    d3.json(url).then(function(sample){
    console.log(sample);
  

    // Use `.html("") to clear any existing metadata
  d3.select("#sample-metadata").html("");
    // Use `Object.entries` to add each key and value pair to the panel
  Object.entries(sample).forEach(([key, value])=>{
  d3.select("#sample-metadata")
    .append("p")
    .text(`${key}: ${value}`);
  });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {
    // @TODO: Build a Bubble Chart using the sample data
    //create variables for trace- refer back to activity listed in one note and slack 
    var x_values = sampleData.otu_ids;
    var y_values = sampleData.sample_values;
    var m_size = sampleData.sample_values;
    var m_colors = sampleData.otu_ids; 
    var t_values = sampleData.otu_labels;

  //create trace- follow exact steps in activity 2 in onenote
  var trace1 = {
    x: x_values,
    y: y_values,
    text: t_values,
    mode: 'markers',
    marker: {color: m_colors,
    size: m_size} 
  };
  var data = [trace1];
  var layout = {
    xaxis:
     { title: "OTU Id"},
  };

  Plotly.newPlot('bubble', data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(url).then(function(data) {  
      var p_values = data.sample_values.slice(0,10);
      var p_otu = data.otu_ids.slice(0,10);
      var p_labels = data.otu_labels.slice(0,10);
    
    //create var and trace - follow previous steps
    //come back to fix syntax for pie chart
    var data =[{
    values: p_values,
    labels:p_labels,
    hovertext:p_otu
    type: "pie"
    }];
    
    Plotly.newPlot('pie', data);

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
