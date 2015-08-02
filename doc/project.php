<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/neuron" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=neuron" ;
$project = new project_object("neuron", "Neuron simulator", "https://github.com/aidansean/neuron", "http://aidansean.com/projects/?tag=neuron", "neuron/images/project.jpg", "neuron/images/project_bw.jpg", "One of my friends wanted to develop a genetic algorithm that was capable of learning and adjusting a neuronal network to suit its environment.  I got as far as making a genetic algorithm before abandoning the project as my friend's interest seemed to move at the same time as my knowledge of the problem was exhausted.", "Maths", "CSS,HTML,JavaScript") ;
?>