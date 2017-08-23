// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart'], 'language':'es'});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Nueve horas o mas', 3],
    ['Ocho horas', 3],
    ['Siete horas', 7],
    ['Seis Horas', 8],
    ['Cinco horas', 4],
    ['Cuatro horas', 2]
  ]);

  // Set chart options
  var options = {'title':'Horas que dormimos las personas'};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  //cambia la visualizacion
  // var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
