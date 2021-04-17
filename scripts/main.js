import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreMax = document.getElementById("button-filterCreditMax");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxMin = document.getElementById("search-boxmin");
var inputSearchBoxMax = document.getElementById("search-boxmax");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreMax.onclick = function () { return applyFilterByCreditInterval(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    student.forEach(function (s) {
        var trElement = document.createElement("tbody");
        trElement.innerHTML = "<tr>\n        <td> C\u00F3digo </td>                       \n        <td> " + s.codigo + "</td>      \n    </tr>\n    <tr>\n        <td>C\u00E9dula</td>\n        <td>" + s.cedula + "</td>\n    </tr>\n    <tr>\n        <td>Edad</td>\n        <td>" + s.edad + " A\u00F1os</td>\n    </tr>\n    <tr>\n        <td>Direcci\u00F3n</td>\n        <td>" + s.direccion + "</td>\n    </tr>\n    <tr>\n        <td>Tel\u00E9fono</td>\n        <td>" + s.telefono + "</td>\n    </tr>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCreditInterval() {
    var minimo = parseInt(inputSearchBoxMin.value);
    var maximo = parseInt(inputSearchBoxMax.value);
    minimo = (minimo == null) ? 0 : minimo;
    maximo = (maximo == null) ? 25 : maximo;
    clearCoursesInTable();
    var coursesFiltered = searchByInterval(minimo, maximo, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchByInterval(max, min, courses) {
    return courses.filter(function (c) {
        return c.credits <= max && c.credits >= min;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
    btnfilterByName.onclick = function () { return applyFilterByName(); };
}
