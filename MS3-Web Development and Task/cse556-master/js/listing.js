document.addEventListener('DOMContentLoaded', parse, false);
var undergradBox = document.getElementById("undergradCheck")
undergradBox.addEventListener("change", parse, false)
var gradBox = document.getElementById("gradCheck")
gradBox.addEventListener("change", parse, false)

var m = document.getElementById("MCheck")
m.addEventListener("change", parse, false)
var t = document.getElementById("TCheck")
t.addEventListener("change", parse, false)
var w = document.getElementById("WCheck")
w.addEventListener("change", parse, false)
var r = document.getElementById("RCheck")
r.addEventListener("change", parse, false)
var f = document.getElementById("FCheck")
f.addEventListener("change", parse, false)

var dayBoxes = [m, t, w, r, f]
var dayMap = {"M": m, "T": t, "W": w, "R": r, "F": f}

function checkWeekday(days) {
    for (var i = 0; i < days.length; i++) {
        if (!dayMap[days[i]].checked) {
            return false
        }
    }
    return true
}

function parse() {
    setBackDestination()
    var s = window.location.href
    s = s.split("?")[1]
    var params = s.split("&")
    var textBox = params[0].split("=")[1]
    var school = params[1].split("=")[1]
    var department = params[2].split("=")[1]
    if(department == "ALL"){
        console.log("ALL")
    }else{
        department = department.split(",")[1].replace("%20", '')
    }

    var list = document.getElementById('listing');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    var user = getUsername();

    if(user == "sal"){
        //use crossDepart
        var count = 0;
        if(document.getElementById("requirements_check").checked){
            for (var i = 0; i < crossDepart.length; i++) {
                // A correct match has its title as a substring
                if (crossDepart[i][7].toLowerCase().includes(textBox) || crossDepart[i][6].toLowerCase().includes(textBox.toLowerCase()) || textBox.toLocaleLowerCase().includes(crossDepart[i][1].toLowerCase())|| textBox.toLocaleLowerCase().includes(crossDepart[i][2])) {
                    // Matches the school dropdown
                    if ((crossDepart[i][0] == school) || (school == "ALL")) {
                        // Matches the department dropdown
                        if ((crossDepart[i][1] == department) || (department == "ALL")){
                            // Add classes based on checked options
                            // For some stupid reason ArtSci has classes in the thousands
                            if (undergradBox.checked && (crossDepart[i][2] < 500 || (1000 <= crossDepart[i][2] && crossDepart[i][2] < 5000))) {
                                if (checkWeekday(crossDepart[i][5])) {
                                    buildListing(list, crossDepart[i])
                                    count += 1
                                }
                            } else if (gradBox.checked && (5000 <= crossDepart[i][2] || (500 <= crossDepart[i][2] && crossDepart[i][2] < 1000))) {
                                if (checkWeekday(crossDepart[i][5])) {
                                    buildListing(list, crossDepart[i])
                                    count += 1
                                }
                            }
                            else if(crossDepart[i][9].includes(textBox)){
                                buildListing(list, crossDepart[i])
                                count += 1
                            }else{
                                buildListing(list, crossDepart[i])
                                count += 1
                            }
                        }
                    }
                }
            }
        }else{
            count = 0;
            for (var i = 0; i < classesDB.length; i++) {
                // A correct match has its title as a substring
                if (classesDB[i][7].toLowerCase().includes(textBox) || classesDB[i][6].toLowerCase().includes(textBox.toLowerCase())|| textBox.toLocaleLowerCase().includes(classesDB[i][1].toLowerCase())|| textBox.toLocaleLowerCase().includes(classesDB[i][2])) {
                    // Matches the school dropdown
                    if ((classesDB[i][0] == school) || (school == "ALL")) {
                        // Matches the department dropdown
                        if ((classesDB[i][1] == department) || (department == "ALL")){
                            // Add classes based on checked options
                            // For some stupid reason ArtSci has classes in the thousands
                            if (undergradBox.checked && (classesDB[i][2] < 500 || (1000 <= classesDB[i][2] && classesDB[i][2] < 5000))) {
                                if (checkWeekday(classesDB[i][5])) {
                                    buildListing(list, classesDB[i])
                                    count += 1
                                }
                            } else if (gradBox.checked && (5000 <= classesDB[i][2] || (500 <= classesDB[i][2] && classesDB[i][2] < 1000))) {
                                if (checkWeekday(classesDB[i][5])) {
                                    buildListing(list, classesDB[i])
                                    count += 1
                                }
                            }
                        }
                    }
                }
            }

        }
        document.getElementById("search_count").innerHTML = count + " search results"
        var res = ""

        document.getElementById("search_field").innerHTML = res


    }
    else if(user == "frank"){

        // use allMusic
        var count = 0;
        if(textBox.length != 0){
            for (var i = 0; i < allMusic.length; i++) {
                // A correct match has its title as a substring
                if (allMusic[i][7].toLowerCase().includes(textBox) || allMusic[i][6].toLowerCase().includes(textBox.toLowerCase()) || textBox.toLocaleLowerCase().includes(allMusic[i][1].toLowerCase())|| textBox.toLocaleLowerCase().includes(allMusic[i][2])) {
                    // Matches the school dropdown
                    if ((allMusic[i][0] == school) || (school == "ALL")) {
                        // Matches the department dropdown
                        if ((allMusic[i][1] == department) || (department == "ALL")){
                            // Add classes based on checked options
                            // For some stupid reason ArtSci has classes in the thousands
                            if (undergradBox.checked && (allMusic[i][2] < 500 || (1000 <= allMusic[i][2] && allMusic[i][2] < 5000))) {
                                if (checkWeekday(allMusic[i][5])) {
                                    buildListing(list, allMusic[i])
                                    count += 1
                                }
                            } else if (gradBox.checked && (5000 <= allMusic[i][2] || (500 <= allMusic[i][2] && allMusic[i][2] < 1000))) {
                                if (checkWeekday(allMusic[i][5])) {
                                    buildListing(list, allMusic[i])
                                    count += 1
                                }
                            }else if(allMusic[i][9].includes(textBox)){
                                buildListing(list, allMusic[i])
                                count += 1
                            }

                        }
                    }
                }
            }
        }else{
            count = 0;
            for (var i = 0; i < classesDB.length; i++) {
                // A correct match has its title as a substring
                if (classesDB[i][7].toLowerCase().includes(textBox) || classesDB[i][6].toLowerCase().includes(textBox.toLowerCase()) || textBox.toLocaleLowerCase().includes(classesDB[i][1].toLowerCase())|| textBox.toLocaleLowerCase().includes(classesDB[i][2])) {
                    // Matches the school dropdown
                    if ((classesDB[i][0] == school) || (school == "ALL")) {
                        // Matches the department dropdown
                        if ((classesDB[i][1] == department) || (department == "ALL")){
                            // Add classes based on checked options
                            // For some stupid reason ArtSci has classes in the thousands
                            if (undergradBox.checked && (classesDB[i][2] < 500 || (1000 <= classesDB[i][2] && classesDB[i][2] < 5000))) {
                                if (checkWeekday(classesDB[i][5])) {
                                    buildListing(list, classesDB[i])
                                    count += 1
                                }
                            } else if (gradBox.checked && (5000 <= classesDB[i][2] || (500 <= classesDB[i][2] && classesDB[i][2] < 1000))) {
                                if (checkWeekday(classesDB[i][5])) {
                                    buildListing(list, classesDB[i])
                                    count += 1
                                }
                            } else if(classesDB[i][9].includes(textBox)){
                                buildListing(list, classesDB[i])
                                count += 1
                            }
                        }
                    }
                }
            }
        }
        document.getElementById("search_count").innerHTML = count + " search results"
        var res = ""

        document.getElementById("search_field").innerHTML = res


    }else{
        var count = 0;
        for (var i = 0; i < classesDB.length; i++) {
            // A correct match has its title as a substring
            if (classesDB[i][7].toLowerCase().includes(textBox) || classesDB[i][6].toLowerCase().includes(textBox.toLowerCase()) || textBox.toLocaleLowerCase().includes(classesDB[i][1].toLowerCase())|| textBox.toLocaleLowerCase().includes(classesDB[i][2])) {
                // Matches the school dropdown
                if ((classesDB[i][0] == school) || (school == "ALL")) {
                    // Matches the department dropdown
                    if ((classesDB[i][1] == department) || (department == "ALL")){
                        // Add classes based on checked options
                        // For some stupid reason ArtSci has classes in the thousands
                        if (undergradBox.checked && (classesDB[i][2] < 500 || (1000 <= classesDB[i][2] && classesDB[i][2] < 5000))) {
                            if (checkWeekday(classesDB[i][5])) {
                                buildListing(list, classesDB[i])
                                count += 1
                            }
                        } else if (gradBox.checked && (5000 <= classesDB[i][2] || (500 <= classesDB[i][2] && classesDB[i][2] < 1000))) {
                            if (checkWeekday(classesDB[i][5])) {
                                buildListing(list, classesDB[i])
                                count += 1
                            }
                        }
                    }
                }
            }
        }
        document.getElementById("search_count").innerHTML = count + " search results"
        var res = ""
        if(textBox === undefined || textBox.length == 0) {
            res = "ALL CLASSES"
        }else {
            res = textBox;
            if (department.length > 0) {
                res = res + " in " + department
            }
            if (school.length > 0) {
                res = res + " at " + school
            }
        }
        document.getElementById("search_field").innerHTML = res
    }
}

function buildListing(elm, arr) {

    var count = 0;
    var sum = 0;
    for(var i = 0; i<reviews.length; i++){
        if (reviews[i][0] == arr[0] && reviews[i][1] == arr[1] && reviews[i][2] == arr[2]){
            sum = sum + parseInt(reviews[i][5])
            count = count + 1
        }
    }

    var div = document.createElement('div');
    div.id = arr[7];

    div.className = 'featured-place-wrap full';
    var course = arr

    if( sum == 0){
        sum = 1;
        count =1;
    }

    div.innerHTML =
        '<span class="featured-rating-orange ">'+sum/count+'</span>\
        <a href="detail.html?class='+arr[7]+'">\
        <div class="featured-title-box">\
        <h6>'+ arr[1]+ ' '+ arr[2]+': '+ arr[7] +'</h6></a>\
        <p>'+arr[6]+' </p>\
        <ul><li><span class="icon-location-pin"></span>\
        <p>'+arr[5] + ' '+ twentyfour2ampm(arr[3])+'-'+ twentyfour2ampm(arr[4]) +'</p></li>\
        <p>'+arr[9]+'</p></li>\
        </ul>\
         </div>';

    elm.appendChild(div);
}

function likeclass(elem) {
    elem.style.color = 'red';
}
