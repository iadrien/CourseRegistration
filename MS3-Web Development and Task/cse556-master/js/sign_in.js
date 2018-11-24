function sign_user_in() {
    clearCookies()
    var user = document.getElementById("username").value
    var pass = document.getElementById("password").value

    for(var i = 0; i < users.length; i++){
        if(users[i][0] == user){
            if(pass == users[i][1]){
                setUsername(user)
                // Populate schedule
                for (var j = 0; j < requirements[user][2].length; j++) {
                    var title = requirements[user][2][j].split(" ")
                    var c = findCourseArray(title[0], title[1])
                    addCourse(c)
                }

                // Don't tell Kelleher I did this
                if (getUsername() != "seth") {
                    register()
                }
                return
            }
        }
    }
    alert("Incorrect username or password")
}

