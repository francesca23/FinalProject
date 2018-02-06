# Drink Don't Drive #

## Project idea ##
Drink Don’t Drive is a university project, developed using p5.js library, for the course Creative Coding, attended at Politecnico di Milano.<br/>
The aim of this interactive app is to make sober people experience drunk driving to become aware of its risks, without underestimate them because of drunkenness.<br/>
For our experience we selected three of the main effects caused by alcohol consumption: delayed reflexes, dizziness and sleepiness. As you increase blood alcohol concentration (BAC), you can experience gradually, in five steps, all these effects adding together.

<img width="1440" alt="starting screen" src="https://user-images.githubusercontent.com/32325582/35881044-d069fc18-0b7f-11e8-980e-b7a1bdcbdf5c.png">

## Interactions ##
Our project is built to work on desktop. User can interact with the sketch only by pressing arrow keys. Up and down arrow keys set BAC, symbolized by the amount of drunk beers, while left and right arrow keys control car movements. The goal is to keep the car on track, although it becomes harder step by step.<br/>
Using arrow keys allows you to experience also the physical effort of this challenge because with high blood alcohol level you have to press the keys very fast.

## Graphic style ##
To draw our sketch we tried to find a middle ground between a realistic representation and a simplified one, so we chose to simulate the watercolour technique.<br/>
Since we decided to opt for a nocturnal setting, we focused on how to make lights look real.

## Music ##
The chosen song is a Royalty Free Music (link below):<br/>
https://soundcloud.com/free-cc-music/street-riot?in=free-cc-music/sets/rock-playlist

As the other parameters it is influenced by BAC variable. As it grows, the music rate slows down and consequently the pitch becomes lower, increasing the overall sense of drunkenness.

## Used libraries ##
To develop our project we used the following libraries:
* p5.js
* p5.dom.js
* p5.sound.js

## Problems and solutions ##
The main challenge of our project was having several effects working together, depending on a single variable (BAC).
The solution was to use a number of if statements for each set of variables with a common parameter.

Another difficult point was to give a realistic perception of speed and depth. To achieve that result we decided to reproduce the perspective, moving and scaling the trees on both sides of the road. Moreover clouds movement emphasizes the driving experience.

Together with these challenges there was the problem of reshaping all the elements and set their new positions, according to the new proportions and dimensions of the window resized. Unfortunately we’re not able to do that for the objects car and tree: their properties, related to window width and height, don’t update along with the window scaling. We suggest you to refresh the page when you scale it.

## Project developers ##
Simone Casartelli<br/>
Livia Fiume<br/>
Francesca Pavanel
