# Student Grade Table (SGT)

Version 0.1 is the starting point.  The HTML/CSS has already been made.  You will start from this version.
- It already has HTML
- It already has Bootstrap CSS
- Included are template files for the JS functionality
- Additionally, an auto-tester is included to give you feedback on your code

## High Level Design
- JS Functionality
    - Build out all methods & properties based on jsDoc (<a href="http://usejsdoc.org/about-getting-started.html" target="_blank">What is this?</a>) comments inside the `student.js` and `sgt.js` files
    - Version 0.1
        - Initial starter files for HTML document, CSS styles, JS classes and autotesting code
    - Versions 0.2 - 0.23
        - Using `class Student` to instantiate a new student object with appropriate methods to update, delete, and render the DOM elements for one of our student records
    - Versions 0.5 - 0.55
        - Building out the `SGT_Template class` to begin storing in the students created from our `Student` class in 0.2 - 0.23
    - Versions 0.75 - 0.78
        - Continuing functionality for `SGT_Template class` to include **R**ead, **U**pdate, and **D**elete operations with our student data storage
    - Versions 0.9 - 0.91
        - Finishing up the functionality of our Student Grade Table by displaying the data that we are manipulating with the **C**reate, **R**ead, **U**pdate, and **D**elete operations (<a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank"></a>) built out in previous versions


### Getting Started

> - Are you on your `mod2_base` branch?
>    - **Yes** - continue to "Pull Latest Changes"
>    - **I dont know** Run the command below
>        - `git branch` - this will highlight the branch you are currently on
>    - **No** - Make sure you `git add .` and `git commit` to your current branch before you switch to your mod2_base branch
> - Pull Latest Changes
>   - `git checkout mod2_base`
>   - `git pull origin mod2_base` - **Now continue with the next steps**
> - Create a feature branch
>   - `git checkout -b v0.2`


### Versioning

> - Add files to git (Stage changes that have been made)
>   - `git add .`
> - Commit files (Group files together)
>   - `git commit -m "<DESCRIBE THE FEATURE COMPLETED IN VERSION"`
> - Push to Github (Send files)
>   - `git push origin <BRANCH NAME>`


## Functional Scope

### Student Object
- Start with the `mod2_base` branch
- Review the `constructor` within this file:
    - `components/student.js`
- Review the incoming data into the `const SGT` within this file:
    - `script.js`

#### Instantiating a Student object and relatable DOM elements

> #### Version 0.2 - getData (30 minutes) - return the data stored in the object's data object
> - takes in no parameters
> - reads the object's data property
> - returns the object's data property

> #### Version 0.21 - render (2 hours) - create the dom elements for the student 
> - takes in no parameters
> - reads the object's data property
> - makes a row to hold the object's visual data. 
>     - creates TR
>     - Stores the row into the object's domElements property
> - makes a td to hold the name
>     - creates a TD
>     - puts the student's name in the td
>     - saves the TD to the object's domElements property
> - makes a td to hold the course
>     - creates a TD
>     - puts the student's course into the td
>     - saves the TD to the object's domElements property
> - makes a TD to hold the grade
>     - creates a TD
>     - puts the student's grade into the td
>     - saves the TD into the object's domElements property
> - makes an operation TD to hold the button
>     - saves the TD into the domElement's property
> - makes a delete button to delete the student
>     - creates a button element
>     - puts the word "delete" into it
>     - adds a click handler that calls this object's handleDelete method
>     - add the delete button to the object's domElements properties
>     - add the delete button to the operations TD
> - return the TR to the function that called this function

> #### Version 0.22 - handleDelete (15 minutes) - handle the click of the delete button
> - takes in no parameters
> - calls the deleteCallback property stored in this object
>     - passes in the ID property of the data object to the deleteCallback
> - removes the row from the DOM

> #### Version 0.23 - update (1.5 hours) - update the stored data AND the dom elements
> - takes in field and value.  field is the name, course, or grade as a string, then value is the new value
> - updates the row of the field with the new text. 

### SGT_Template
- Start with `v0.23` branch
- Review the `constructor` within this file: 
    - `components/sgt.js`

#### Adding in initial Create functionality and data storage for our table
> #### Version 0.5 - constructor (1 hour) - store construction data
> - take in parameters
> - store parameters into properties/methods
> #### Version 0.51 - addEventHandlers (15 minutes) - add eventhandlers to dom elements 
> #### Version 0.52 - clearInputs (15 minutes) - clear the inputs on the dom
> #### Version 0.53 - handleCancel (15 minutes) - handle the click on the cancel button and clear the inputs
> #### Version 0.54 - handleAdd (1 hour) - handle the click on the add button and adds the student from the inputs in the form
> #### Version 0.55 - createStudent (1.5 hours) - generates a new student object and assigns an id for the new created student

#### Continuing Read, Update, and Delete functionality
> #### Version 0.75 - doesStudentExist (45 minutes) - checks to see if a student exists from a given id
> #### Version 0.76 - readStudent (45 minutes) - retrieves the data for one or all the students 
> #### Version 0.77 - updateStudent (30 minutes) - edits the values of one of our students given an id
> #### Version 0.78 - deleteStudent (30 minutes) - deletes the data for one of our students given an id

#### Displaying student data inside of our table
> #### Version 0.9 - displayAllStudents (1.5 hours) - iterates through all students in the model and renders them to the dom
> #### Version 0.91 - displayAverage (1.5 hours) - gets the average grade and displays it

## Design

#### Mobile appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148427/0384d076-3d30-11e5-83ff-4d10ae2daf70.png" width="200"/>
#### No Data available appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148435/1d8f2bc4-3d30-11e5-926d-72a2a086fd8b.png" width="500"/>
#### Data available appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148437/22e2566e-3d30-11e5-9401-ba2cb8309d65.png" width="500"/>
