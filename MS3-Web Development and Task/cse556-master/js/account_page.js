// Code for showing/manipulating the user account page

// Tab behavior from here: https://www.w3schools.com/howto/howto_js_tabs.asp
// Calendar view from here: https://javascript.daypilot.org/open-source/
function openTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

function populateSchedule() {
    var dp = new DayPilot.Calendar("dp")
    dp.viewType = "Week"
    dp.dayBeginsHour = 8
    dp.dayEndsHour = 18
    dp.startDate = "2018-11-05"
    dp.theme = "calendar_transparent"
    dp.eventMoveHandling = "Disabled"
    dp.eventResizeHandling = "Disabled"
    dp.init()
    dp.events.list = processCalendarEvents()
    dp.onEventClicked = function (d) {
        var page = "detail.html?class=" + d.e["data"]["name"]
        window.open(page, '_top')
    }
    dp.update()
}

function processCalendarEvents() {
    var chosen = getRegistered()
    var output = []

    // Generates the array of classes, which should be an array of dictionaries
    for (var i = 0; i < chosen.length; i++) {
        var allMeetings = calcCalTimes(chosen[i])
        for (var j = 0; j < allMeetings.length; j++) {
            var classInfo = {}
            classInfo["id"] = output.length + 1
            classInfo["text"] = chosen[i][1] + " " + chosen[i][2]
            classInfo["start"] = allMeetings[j][0]
            classInfo["end"] = allMeetings[j][1]
            classInfo["name"] = chosen[i][7]
            output.push(classInfo)
        }
    }

    return output
}

function academicCalendar() {
    var ac = new DayPilot.Month("ac")
    ac.theme = "month_transparent"
    ac.eventMoveHandling = "Disabled"
    ac.eventResizeHandling = "Disabled"
    ac.init()
    ac.events.list = processAcademicCaledar()
    document.getElementById("prev-button").addEventListener("click", function () {
        ac.startDate = ac.startDate.addMonths(-1)
        ac.update()
    })
    document.getElementById("next-button").addEventListener("click", function () {
        ac.startDate = ac.startDate.addMonths(1)
        ac.update()
    })
    ac.update()
}

function processAcademicCaledar() {
    var events = []
    for (var i = 0; i < holidays.length; i++) {
        var event = {}
        event["id"] = i
        event["text"] = holidays[i][2]
        event["start"] = holidays[i][0]
        event["end"] = holidays[i][1]

        events.push(event)
    }

    return events
}

function populateReviews() {
    var res = getReviews()
    var res_2 = getYourReviews()
    var elm = document.getElementById("reviews")
    for (var i = 0; i < res.length; i++) {
        var div = document.createElement('div');
        div.className = 'customer-review_wrap';
        var course = res

        var sp = '';
        if (parseInt(res[i][5]) < 3) {
            for (var j = 0; j < parseInt(res[i][5]); j++) {
                sp = sp + '<span class="customer-rating-red"></span>'
            }
        } else {
            for (var j = 0; j < parseInt(res[i][5]); j++) {
                sp = sp + '<span></span>'
            }
        }
        for (var j = 0; j < 5 - parseInt(res[i][5]); j++) {
            sp = sp + '<span class="round-icon-blank"></span>';
        }

        div.innerHTML =
            '<div class="customer-img">\
                <p>Grade Received</p>\
                <span>'+ res[i][4] + '</span>\
        </div>\
         <div class="customer-content-wrap">\
             <div class="customer-content">\
             <div class="customer-review">\
             <h6></h6>\
         '+ sp + '\
         <div class="customer-rating">'+ parseInt(res[i][5]) + '</div>\
         </div>\
         <br>\
         <p class="customer-text">'+ res[i][3] + '</p>\
         </div>\
         </div>\
         <hr>';


        elm.appendChild(div);
    }
    for (var i = 0; i < res_2.length; i++) {
        var div = document.createElement('div');
        div.className = 'customer-review_wrap';
        var course = res_2

        var sp = '';
        if (parseInt(res_2[i][5]) < 3) {
            for (var j = 0; j < parseInt(res_2[i][5]); j++) {
                sp = sp + '<span class="customer-rating-red"></span>'
            }
        } else {
            for (var j = 0; j < parseInt(res_2[i][5]); j++) {
                sp = sp + '<span></span>'
            }
        }
        for (var j = 0; j < 5 - parseInt(res_2[i][5]); j++) {
            sp = sp + '<span class="round-icon-blank"></span>';
        }

        div.innerHTML =
            '<div class="customer-img">\
            <p>Grade Received</p>\
            <span>'+ res_2[i][4] + '</span>\
        </div>\
         <div class="customer-content-wrap">\
             <div class="customer-content">\
             <div class="customer-review">\
             <h6></h6>\
         '+ sp + '\
         <div class="customer-rating">'+ parseInt(res_2[i][5]) + '</div>\
         </div>\
         <br>\
         <p class="customer-text">'+ res_2[i][3] + '</p>\
         </div>\
         </div>\
         <hr>';


        elm.appendChild(div);
    }

}
function getYourReviews() {
    var r = []
    var user = getUsername()
    for (var i = 0; i < reviews.length; i++) {
        var sub_r = []
        if (reviews[i][3] == user) {
            sub_r.push(reviews[i][0])
            sub_r.push(reviews[i][1])
            sub_r.push(reviews[i][2])
            sub_r.push(reviews[i][6])
            sub_r.push(reviews[i][4])
            sub_r.push(reviews[i][5])
            r.push(sub_r)
        }
    }
    return r
}

function populateRequirements() {
    var el = document.getElementById("requirements")

    var user = getUsername()
    var d = document.createElement('div');
    var inhtml = '';
    inhtml = inhtml + '<hr><h5>Fulfilled Requirements</h5>'
    for (var j = 0; j < requirements[user][0].length; j++) {
        inhtml = inhtml + '<input type="checkbox" onclick="return false;" checked/>     ' + requirements[user][0][j] + '<br>'
    }
    inhtml = inhtml + '<hr><h5>Requirements Left to Fulfill</h5>'
    for (var j = 0; j < requirements[user][1].length; j++) {
        inhtml = inhtml + '<input type="checkbox" onclick="return false;"/>      ' + requirements[user][1][j] + '<br>'
    }
    d.innerHTML = inhtml
    el.appendChild(d);

}

// Display 'Current Schedule' tab on page load
document.getElementById("defaultOpen").click()
populateRequirements()
populateSchedule()
academicCalendar()
populateReviews()
document.getElementById("welcome-message").innerHTML = "Welcome " + getUsername() + "!"
