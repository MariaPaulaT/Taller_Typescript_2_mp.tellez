import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreMax: HTMLElement = document.getElementById("button-filterCreditMax")!;

const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxmin")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxmax")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreMax.onclick = () => applyFilterByCreditInterval();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student[]): void {
  student.forEach((s) => {
    let trElement = document.createElement("tbody");
    trElement.innerHTML = `<tr>
        <td> Código </td>                       
        <td> ${s.codigo}</td>      
    </tr>
    <tr>
        <td>Cédula</td>
        <td>${s.cedula}</td>
    </tr>
    <tr>
        <td>Edad</td>
        <td>${s.edad} Años</td>
    </tr>
    <tr>
        <td>Dirección</td>
        <td>${s.direccion}</td>
    </tr>
    <tr>
        <td>Teléfono</td>
        <td>${s.telefono}</td>
    </tr>`;
    studentTbody.appendChild(trElement);
  });
}

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCreditInterval() { 
  let minimo: number= parseInt(inputSearchBoxMin.value);
  let maximo: number = parseInt(inputSearchBoxMax.value);
  minimo = (minimo == null) ? 0 : minimo;

  maximo = (maximo == null) ? 25 : maximo;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchByInterval(minimo, maximo, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchByInterval(max: number, min: number, courses: Course[]) {
  return courses.filter( c => 
    c.credits<=max && c.credits>=min);
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
  
btnfilterByName.onclick = () => applyFilterByName();
}