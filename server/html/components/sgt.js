
//commented out this.clearInputs() in handleAdd() and this.deleteStudent callback in createStudent()

class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: 
		- Instantiates a model and stores pre-made dom elements it this object
		- Additionally, will generate an object to store created students 
		  who exists in our content management system (CMS)
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	constructor(elementConfig){
		this.domElements = {
			addButton: elementConfig.addButton,
			cancelButton: elementConfig.cancelButton,
			nameInput: elementConfig.nameInput,
			courseInput: elementConfig.courseInput,
			gradeInput: elementConfig.gradeInput,
			displayArea: elementConfig.displayArea,
			averageArea: elementConfig.averageArea
		};
		this.data = {}; //stores student objects

		//this.deleteStudent = this.deleteStudent.bind(this);
		this.loadDataSuccess = this.loadDataSuccess.bind(this);
		this.addDataSuccess = this.addDataSuccess.bind(this);
		this.deleteDataSuccess = this.deleteDataSuccess.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	addEventHandlers(){
		this.domElements.addButton.on('click', this.handleAdd);
		this.domElements.cancelButton.on('click', this.handleCancel);
		$("#serverDataButton").on('click', this.loadServerData);
	}
	/* clearInputs - take the three inputs stored in our constructor and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){
		this.domElements.nameInput.val('');
		this.domElements.courseInput.val('');
		this.domElements.gradeInput.val('');
	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){
		this.clearInputs();
	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){
		var name = $(this.domElements.nameInput).val();
		var course = $(this.domElements.courseInput).val();
		var grade = $(this.domElements.gradeInput).val();
		this.addServerData(name, course, grade);
	}

	/* displayAllStudents - iterate through all students in the model
	purpose: 
		grab all students from model, 
		iterate through the retrieved list, 
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){
		this.domElements.displayArea.empty();
		for(var index in this.data){
			var studentDomElement = this.data[index].render();
			this.domElements.displayArea.append(studentDomElement);
		}
		this.displayAverage();
	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined 
	ESTIMATED TIME: 15 minutes
	*/

	displayAverage(){
		var gradeSum = null;
		var count = null;
		for(var index in this.data){
			var retrieveData = this.data[index].getData();
			gradeSum += retrieveData.grade;
			count++;
		}
		var gradeAverage = gradeSum / count;
		gradeAverage = gradeAverage.toFixed(2);
		this.domElements.averageArea.text(gradeAverage);
	}
	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object

		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose: 
			If no id is present, it must pick the next available id that can be used
			when it creates the Student object, it must pass the id, name, course, grade, 
			and a reference to SGT's deleteStudent method
	params: 
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id) {
		if (this.doesStudentExist(id)) {
			return false;
		}
		// else {
		// 	if(id === undefined && Object.keys(this.data).length === 0){
		// 			id = 0;
		// 	} else if(id === undefined) {
		// 		for (var index in this.data) {
		// 			id = parseInt(index) + 1;
		// 		}
		// 	}
			if(!isNaN(grade)){
				grade = parseInt(grade);
			}
		// }
		if(name && course && grade && !isNaN(id)) {
			var newStudent = new Student(id, name, course, grade, this.deleteServerData);
			this.data[id] = newStudent;
			return true;
		}
	}

	/* doesStudentExist - 
		determines if a student exists by ID.  returns true if yes, false if no
	purpose: 
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params: 
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){
		if(this.data.hasOwnProperty(id)){
			return true;
		} else {
			return false;
		}
	}
	/* readStudent - 
		get the data for one or all students
	purpose: 
			determines if ID is given or not
			if ID is given, return the student by that ID, if present
			if ID is not given, return all students in an array
	params: 
		id: (number)(optional) the id of the student to search for, if any
	return: 
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){
		if(id){
			if(this.doesStudentExist(id)){
				return this.data[id];
			} else {
				return false;
			}
		} else {
			var dataArray = [];
			for (var index in this.data) {
				dataArray.push(this.data[index]);
			}
			return dataArray;
		}
	}
	/* updateStudent - 
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose: 
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params: 
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return: 
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(id, field, value){
		if(this.doesStudentExist(id)){
			this.data[id].update(field, value);
			this.displayAllStudents();
			return true;
		} else {
			return false;
		}
	}
	/* deleteStudent - 
		delete the given student at the given id
	purpose: 
			determine if the ID exists in this.data
			remove it from the object
			return true if successful, false if not
			this is often called by the student's delete button through the Student handleDelete
	params: 
		id: (number) the id of the student to delete
	return: 
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	// deleteStudent(id){
	// 	// if (this.doesStudentExist(id)) {
	// 	// 	delete this.data[id];
	// 	// 	return true;
	// 	// } else {
	// 	// 	return false;
	// 	// }
	// }

	loadServerData(){
		$.ajax({
			url: 'api/grades',
			method: 'get',
			dataType: 'json',
			data: {
				api_key: 'tLMl85d0PD'
			},
			success: this.loadDataSuccess,
			error: this.serverError
		});
	}

	loadDataSuccess(response){
		if(response.success){
			this.data = {};
			for(var index = 0; index < response.data.length; index++){
				var path = response.data[index];
				this.createStudent(path.name, path.course, path.grade, path.id);
			}
			this.displayAllStudents();
		}
		else {
			this.responseError(response);
			this.loadServerData();
		}
	}

	addServerData(name, course, grade){
		$.ajax({
			url: 'http://s-apis.learningfuze.com/sgt/create',
			method: 'post',
			dataType: 'json',
			data: {
				api_key: 'tLMl85d0PD',
				name: name,
				course: course,
				grade: grade,
			},
			success: this.addDataSuccess,
			error: this.serverError
		});
	}

	addDataSuccess(response){
		if(response.success){
			this.clearInputs();
			this.loadServerData();
		} else {
			this.responseError(response);
			this.loadServerData();
		}
	}

	deleteServerData(id){
		$.ajax({
			url: 'http://s-apis.learningfuze.com/sgt/delete',
			method: 'post',
			dataType: 'json',
			data: {
				api_key: 'tLMl85d0PD',
				student_id: id,
			},
			success: this.deleteDataSuccess,
			error: this.serverError
		});
	}

	deleteDataSuccess(response){
		if(response.success){
			this.loadServerData();
		} else {
			this.responseError(response);
			this.loadServerData();
		}
	}

	responseError(response){
		var errorMessages = '';
		for(var index = 0; index < response.errors.length; index++){
			errorMessages += response.errors[index] + ' ';
		}
		alert(errorMessages);
		var loadingSign = $("<i>", {class: "fa fa-spinner fa-spin"});
		$("#serverDataButton").append(loadingSign);
		setTimeout(function(){
			$(".fa-spinner").remove();
		}, 2000)
	}

	serverError(){
		alert('Server request rejected.')
	}

}