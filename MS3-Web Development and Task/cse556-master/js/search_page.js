window.onload = function() {
    populateDepartment()
}

// Code for manipulating the search page
setBackDestination()
function toggleAdvanced() {
    var adv = document.getElementById("advanced")

    if (adv.classList.contains("hidden")) {
        adv.classList.remove("hidden")
    } else {
        adv.classList.add("hidden")
    }
}

function showResults(matches) {
    // matches is an array of courses to display
    var results = document.getElementById("searchResults")
    // Delete previous children
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    for (var i = 0; i < matches.length; i++) {
        var res = document.createElement("div")
        res.classList.add("course")
        var name = document.createElement("p")
        name.innerHTML = matches[i][1] + " " + matches[i][2] + " - " + matches[i][7]
        res.appendChild(name)
        var info = document.createElement("p")
        info.innerHTML = matches[i][5] + " " + twentyfour2ampm(matches[i][3]) + "-" + twentyfour2ampm(matches[i][4])
        res.appendChild(info)
        var addButton = document.createElement("input")
        addButton.type = "button"
        addButton.id = i
        addButton.value = "+"
        addButton.addEventListener("click", function(d) {
            addCourse(matches[d.target.id])
            d.target.style = "cursor: not-allowed"
        })
        res.appendChild(addButton)

        results.appendChild(res)
    }
}

function search() {
    var matches = []
    var textBox = document.getElementById("searchBar").value.toLowerCase()
    var school = document.getElementById("washuSchool").value
    var department = document.getElementById("department").value

    window.location = "./listing.html?textBox=" + textBox + "&school=" + school + "&dept=" + department;
    //parse();
}

// When the "school" dropdown is changed, the options in the "department" dropdown should change
function populateDepartment() {
    var school = document.getElementById("washuSchool").value
    var departmentNode = document.getElementById("department")
    // Clear previous dropdown
    while (departmentNode.firstChild) {
        departmentNode.removeChild(departmentNode.firstChild);
    }
    // Always have the "All departments" option
    var opt = document.createElement("option")
    opt.value = "ALL"
    opt.innerHTML = "All Departments"
    departmentNode.append(opt)

    if (school == "ALL") {
        // Populate with all values in map
        var schools = Object.keys(deptMap)
        for (var i = 0; i < schools.length; i++) {
            for (var j = 0; j < deptMap[schools[i]].length; j++) {
                var opt = document.createElement("option")
                opt.value = deptMap[schools[i]][j]
                opt.innerHTML = deptMap[schools[i]][j]
                departmentNode.append(opt)
            }
        }
    } else {
        var dpts = deptMap[school]
        for (var i = 0; i < dpts.length; i++) {
            var opt = document.createElement("option")
            opt.value = dpts[i]
            opt.innerHTML = dpts[i]
            departmentNode.append(opt)
        }
    }
}
