// Things to be stored in cookies:
// Username, courses on registration worksheet
// Username shall be stored verbatim, courses will be stored as "DEPARTMENT COURSE#"

// Cookie functions adapted from here: https://www.w3schools.com/js/js_cookies.asp
function clearCookies() {
    // If a cookie is set to a past date, it is automatically destroyed
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i =0; i < ca.length; i++) {
        document.cookie = ca[i] + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    }
}

function signOut(){
    clearCookies();
    window.location = "./../index.html"
}

function setUsername(name) {
    console.log("set " + name)
    document.cookie = "username=" + name + "; expires=Tue, 01 Jan 2019 00:00:01 GMT"
    window.location = "pages/account.html"

}

function setBackDestination(){
}

function goBack(){
    window.history.back();
}

function getUsername() {

    var name = "username="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i]
        console.log(c)
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }

    return ""
}

function findCourseArray(dept, id) {
    // Go thru all entries in DB, find a department and ID that match our cookie, add to our list
    for (var j = 0; j < classesDB.length; j++) {
        if ((dept == classesDB[j][1]) && (id == classesDB[j][2])) {
            return classesDB[j]
            break
        }
    }
}

// Adds course to worksheet
function addCourse(course) {
    // If course is not already in cookie, add
    if (!checkCourse(course)) {
        var name = course[1] + " " + course[2] + "=true;"
        document.cookie = name
    }
}

// Checks if course is in database
function checkCourse(course) {
    var courseName = course[1] + " " + course[2]
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        var storedName = c.split("=")[0]
        if (courseName == storedName) {
            return true
        }
    }
    return false
}

// Same as 'dropCourse' but completely removes it
// Probably could merge functions but idgaf
function removeCourse(course) {
    // If course is in cookie, then remove
    if (checkCourse(course)) {
        // If a cookie is set to a past date, it is automatically destroyed
        var name = course[1] + " " + course[2] + "=true;"
        document.cookie = name + " expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    }
}

// Returns array of worksheet courses
function getWorksheet() {
    // Output array of courses from DB in worksheet
    var wkst = []
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")
    // Iterate through all cookies
    for (var i = 0; i < ca.length; i++) {
        var storedName = ca[i].split("=")
        // Don't want username
        if (storedName != "username" && !storedName.includes("review")) {
            if (storedName[1] == "true") {
                var dept = storedName[0].split(" ")[0]
                var id = storedName[0].split(" ")[1]
                wkst.push(findCourseArray(dept, id))
            }
        }
    }

    return wkst
}

// Returns array of registered courses
function getRegistered() {
    // Output array of courses from DB in worksheet
    var reg = []
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")
    // Iterate through all cookies
    for (var i = 0; i < ca.length; i++) {
        var storedName = ca[i].split("=")
        // Don't want username
        if (storedName != "username" && !storedName.includes("review")) {
            if (storedName[1] == "false") {
                var dept = storedName[0].split(" ")[0]
                var id = storedName[0].split(" ")[1]
                reg.push(findCourseArray(dept, id))
            }
        }
    }

    return reg
}

// Registers for courses in worksheet
function register() {
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")

    for (var i = 0; i < ca.length; i++) {
        var storedName = ca[i].split("=")
        if (storedName[1] == "true") {
            document.cookie = storedName[0] + "=false;"
        }
    }
}

// Drops a course, puts it back on worksheet
function dropCourse(course) {
    // If course is in cookie, then change to worksheet
    if (checkCourse(course)) {
        var name = course[1] + " " + course[2] + "=true;"
        document.cookie = name
    }
}

function addReview(review) {
    // If course is not already in cookie, add
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")
    var review_count = 0;
    for(var i =0; i < ca.length; i++){
        var storedName = ca[i].split("=")
        if(storedName[0].includes("review")){
            var c = storedName[0].split("_")[1]
            if(c == null){
                c = 0
            }
            review_count =  parseInt(c) + 1
        }
    }

    var name = "review_" + review_count +"=" +review + "; expires=Tue, 01 Jan 2019 00:00:01 GMT"
    document.cookie = name
}
function getReviews() {
    // Output array of courses from DB in worksheet
    var reviews = []
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split("; ")
    // Iterate through all cookies
    for (var i = 0; i < ca.length; i++) {
        var storedName = ca[i].split("=")
        // Don't want username
        if (storedName[0].includes("review")) {
            reviews.push(storedName[1].split(","))
        }
    }
    return reviews
}

