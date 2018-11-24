document.addEventListener('DOMContentLoaded', displayCourses, false);
document.getElementById("enroll-button").addEventListener("click", completeRegistration, false)

function displayCourses() {
    var courseList = document.getElementById("enrolled")

    // Delete any previous children
    while (courseList.firstChild) {
        courseList.removeChild(courseList.firstChild);
    }

    var chosen = getWorksheet()

    for (var i = 0; i < chosen.length; i++) {
        var res = document.createElement("div")
        res.classList.add("course")
        var name = document.createElement("p")
        name.innerHTML = chosen[i][1] + " " + chosen[i][2] + " - " + chosen[i][7]
        res.appendChild(name)
        var info = document.createElement("p")
        info.innerHTML = chosen[i][5] + " " + twentyfour2ampm(chosen[i][3]) + "-" + twentyfour2ampm(chosen[i][4])
        res.appendChild(info)

        var addButton = document.createElement("input")
        addButton.type = "button"
        addButton.id = i
        addButton.value = "-"
        addButton.addEventListener("click", function(d) {
            removeCourse(chosen[d.target.id])
            displayCourses()
        })
        res.appendChild(addButton)

        courseList.appendChild(res)
    }
}

function completeRegistration() {
    register()
    displayCourses()
}
