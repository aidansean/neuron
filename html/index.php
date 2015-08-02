<?php
$title = 'Neuron simulator' ;
$stylesheets = array('style.css') ;
$js_scripts  = array('functions.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
<div class="right">
  <h3>About this page</h3>
  <div class="blurb">
    <p>This page shows the evolution of a system that can adapt through genetic mutation.  Animals are rewarded if they match the food and starve otherwise.  This was to be the first step towards generating a system which could inherit and learn, but I never got to the learning state.  Maybe one day...</p>
  </div>
  
  
  <div class="blurb">
    <div class="table">
      <div class="tab_row">
        <div class="tab_cell">
          <h3>Food</h3>
          <table id="tableFood">
            <tbody id="tbodyFood"></tbody>
          </table>
        </div>
        <div class="tab_cell">
          <h3>Average</h3>
          <table id="tableAverage">
            <tbody id="tbodyAverage"></tbody>
          </table>
        </div>
        <div class="tab_cell">
          <h3>Iterations</h3>
          <div id="iteratorCounter"></div>
        </div>
      </div>
    </div>
  </div>
  <h3>Population</h3>
  <div class="blurb">
    <table id="tablePop">
      <tbody id="tbodyPop"></tbody>
    </table>
  </div>
<?php foot() ; ?>