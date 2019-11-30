CS174A Final Project: Cook with Mama
====================================
Made by Jessica Cheng (304973591), Justin Chang(), and Jason Chen()

## 1. Our Project
Help mama cook her delicious meals!
This is a Cooking Mama-inspired game, where the player tries their hand at cooking a recipe with different steps. There are different cooking station perspectives, and utilizes two different button inputs from user for cooking activities, which do different things depending on task.
At each station the player have a task to complete, and the end goal is to finish all subtasks and create the final plate of food, a delicious beef stew!

The different stations are:
1: Ingredients will slowly fall from the sky, move a basket left 'a' and right 'd' to catch as many as possible 
2: Chop vegetables/beef to chunks by having 'a' to chop with speed according to timing 
3. Stir ingredients together with 'a' left and d' right, according to the instructions displayed
4. After finished stirring, calculate score, and show the player the results!


## 2. Who did What
Jessica:

One of advanced optimizations in our proposal was the inclusion of physics-based animation, and in our case, that would be the food falling in our first playable station, the food-catching game. Using my knowledge of acceleration in physics, I made it such that when the food fell, it did so with acceleration (though the acceleration rate was of course slowed such that the player has a chance of actually catching the food). Through this, we could develop a framework which allowed foods of different shapes (and thus different mass and aerodynamics) to fall at slightly different rates.

My role involved a lot of artistic direction. As the only person with prior experience in 3D modelling, I used Autodesk Fusion 360 and Blender to create models of all of the food you see in this game, along with the knives, the pot, and the ladle. I made the food textures and applied them to our custom objects. I also improved upon the aesthetics of the game by creating the title screen and the instruction scene of the game using HTML and JavaScript (both of which I also have the most experience in among the group), which was inserted into and interacted with the WebGL code we had. This optimized and enhanced the product as the UI is significantly improved, giving our product a polished look.

