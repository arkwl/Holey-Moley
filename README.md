# Holey Moley



##### Inspiration
We really wanted to put our skills to the limit this hackathon. We wanted to see if we could use image classification to identify potholes, send that information to the city, and assign that work onto a worker's phone.

##### What it does
It sends video feed from the front of the car to IBM Watson, then based on whether it's a pot hole or not, we move on and send the information to Esri. Then a use would be able to view all potholes and assign a task to their constituents.

##### How we built it
Using python, we take instant video, turn them into image frame that are sent into an image classification model. Then depending on degree of certainty, we send that data to Argcis, which allows all of that data to be displayed and manipulated. Then we created a client app which facilitates a service that allows them to "complete the job".

##### Built With
Esri, IBM Watson, Node.JS, Python

##### Contributors
Alexa Rockwell   |   Lasha Zakariashvili