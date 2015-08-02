from project_module import project_object, image_object, link_object, challenge_object

p = project_object('neuron', 'Neuron simulator')
p.domain = 'http://www.aidansean.com/'
p.path = 'neuron'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'neuron'
p.mathjax = True
p.tags = 'Maths'
p.technologies = 'CSS,HTML,JavaScript'
p.links.append(link_object(p.domain, 'neuron', 'Live page'))
p.introduction = 'One of my friends wanted to develop a genetic algorithm that was capable of learning and adjusting a neuronal network to suit its environment.  I got as far as making a genetic algorithm before abandoning the project as my friend\'s interest seemed to move at the same time as my knowledge of the problem was exhausted.'
p.overview = '''The algorithm creates a population of "animals" that have varying physiology.  The physiologies that best match the source of "food" reproduce more frequently.  As the source of food changes, so do the inherited physiologies.  The physiologies are represented by cells in a table, each one given a weight.  They are initially randomly distributed, with the weights representing "investment" in the food source.

The breeding algorithm takes three animals at random, compares their match to the food source, and breeds the two most successful to create a new offspring, while discarding the third.  The genes from each parent are selected at random.  This algorithm was inspired by a similar study performed by the YouTube user cdk007 in his video <a href="https://www.youtube.com/watch?v=mcAq9bmCeR0">"Evolution IS a Blind Watchmaker"</a>.

This was the result of a couple of hours of work, at which point the project was abandoned indefinitely.  If I find some useful literature about how to develop a neuronal network capable of learning (ie simulating the lifespan of an animal with a learning process) I may revisit this project.  It's a shame the working title doesn't actually reflect what the algorithm does.'''

p.challenges.append(challenge_object('The project needed some simple algorithm to get started, to be developed later.', 'Thanks to cdk007, I had some good inspiration here!  Once the model was created there was no need for additional development- I had a fast evolving algorithm to work with.', 'Resolved'))

p.challenges.append(challenge_object('I wanted to create an algorithm that was very visual and quick to develop.', 'At the time I was very experienced with HTML and CSS, so I opted for a series of tables styled with CSS.  I was very happy with how it turned out, it makes a nice web toy.', 'Resolved'))
