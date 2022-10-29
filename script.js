const table = document.querySelector("#table")
let initialStudents = [];
let students = [];
let titles = ["ID", "First-Name", "Last-Name", "Capsule", "Age", "City", "Gender", "Hobby"]
// Function to get data from the API and return a JSON
const IDBtn = document.querySelector(".ID");
const FirstBtn = document.querySelector(".First");
const LastBtn = document.querySelector(".Last");
const CapsuleBtn = document.querySelector(".Capsule");
const AgeBtn = document.querySelector(".Age");
const CityBtn = document.querySelector(".City");
const GenderBtn = document.querySelector(".Gender");
const HobbyBtn = document.querySelector(".Hobby");
const resetBtn = document.querySelector("#resetBtn");
// -------------------- Fatch the data from the API ------------------
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// ----------------- Connect the data from the fatches --------------
const connectData = async () => {
  const data1a = await fetchData("https://capsules7.herokuapp.com/api/group/one");
  const data1b = await fetchData("https://capsules7.herokuapp.com/api/group/two");
  const data = data1a.concat(data1b);
  // initial sort by id
  data.sort((a, b) => a.id - b.id)
  // studentArr will contain the merged array of objects sorted by id
  const studentArr = []
  for (let i = 0; i < data.length; i++) {
    let student = fetchData(`https://capsules7.herokuapp.com/api/user/${data[i].id}`)
    studentArr.push(student);
  }
  const studentList = await Promise.all(studentArr)
  console.log(studentList);
  return studentList
};
connectData().then(_students => {
  initialStudents = _students;
  students = structuredClone(_students);
  renderStudents();
}).catch(e => { console.log(e); })
// ----------------------- Render the list ---------------------------
const renderStudents = () => {
  // reset the table before every render
  table.innerHTML = '';
  //create row with a ul element with unique ID each
  students.forEach(stdnt => {
    const row = document.createElement("ul")
    row.id = `${stdnt.id}`
    row.classList.add(`row`)
    // create the res of the li elements - no specific id
    const newArr = [stdnt.firstName, stdnt.lastName, stdnt.capsule, stdnt.age, stdnt.city, stdnt.gender, stdnt.hobby];
    const id = document.createElement('li')
    id.innerHTML = `${stdnt.id}`;
    id.classList.add(`id`)
    id.classList.add(`${stdnt.id}`)
    row.appendChild(id);
    newArr.forEach((e) => {
      const cell = document.createElement("li");
      cell.textContent = e;
      cell.classList.add("cell");
      row.appendChild(cell);
    })
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "DELETE"
    deleteBtn.classList.add("cell");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", (e) => {
      students.pop(stdnt)
      console.log(students);
      e.target.parentElement.remove();
      console.log(e.target.parentElement);
    })
    row.appendChild(deleteBtn);
    table.appendChild(row);
  })
}
// -------------------- Sorting Functions -------------------------
const orderByID = () => {
  students = students.sort((a, b) => a.id.localeCompare(b.id));
  renderStudents();
}
const orderByFirstName = () => {
  students = students.sort((a, b) => a.firstName.localeCompare(b.firstName));
  renderStudents();
}
const orderByLastName = () => {
  students = students.sort((a, b) => a.lastName.localeCompare(b.lastName));
  renderStudents();
}
const orderByCapsule = () => {
  students = students.sort((a, b) => a.capsule - b.capsule);
  renderStudents();
}
const orderByAge = () => {
  students = students.sort((a, b) => a.age - b.age);
  renderStudents();
}
const orderByCity = () => {
  students = students.sort((a, b) => a.city.localeCompare(b.city));
  renderStudents();
}
const orderByGender = () => {
  students = students.sort((a, b) => a.gender.localeCompare(b.gender));
  renderStudents();
}
const orderByHobby = () => {
  students = students.sort((a, b) => a.hobby.localeCompare(b.hobby));
  renderStudents();
}

IDBtn.addEventListener("click", () => { orderByID() });
FirstBtn.addEventListener("click", () => { orderByFirstName() });
LastBtn.addEventListener("click", () => { orderByLastName() });
CapsuleBtn.addEventListener("click", () => { orderByCapsule() });
AgeBtn.addEventListener("click", () => { orderByAge() });
CityBtn.addEventListener("click", () => { orderByCity() });
GenderBtn.addEventListener("click", () => { orderByGender() });
HobbyBtn.addEventListener("click", () => { orderByHobby() });
// ------------------ Reset Button -----------------------------
resetBtn.addEventListener("click", () => {
  students = structuredClone(initialStudents)
  renderStudents()
})
