// Some useful utility functions

// Converts 24h time (as an int) to 12h AM/PM time (as a string)
function twentyfour2ampm(time) {
    var hour = Math.floor((time / 100))
    var minute = time - (hour * 100)
    hour %= 12
    if (hour == 0) {
        hour = 12
    }
    var ampm = hour + ":" + ("0" + minute).slice(-2) // This way the minute value is always 2 digits
    if (time >= 1200) {
        ampm += "P"
    } else {
        ampm += "A"
    }

    return ampm
}

// Takes a course and generates an array of two strings, for the start and end times
// Times are formatted to be a date and time, needed for the calendar view
function calcCalTimes(course) {
    // Arbitrarily chose 2018-11-05 to be the Monday the weekly view will start on.
    // Probably want to change this to be a realistic start of semester
    var blankDate = "2018-11-0"
    var weekMap = {"M": 5, "T": 6, "W": 7, "R": 8, "F": 9}

    var startTime = course[3]
    var endTime = course[4]
    var meetingDays = course[5]

    // This ensures time is always a four digit string
    var fourDigitStart = ("0" + startTime).slice(-4)
    var fourDigitEnd = ("0" + endTime).slice(-4)
    var formattedStart = fourDigitStart.slice(0,2) + ":" + fourDigitStart.slice(-2) + ":00"
    var formattedEnd = fourDigitEnd.slice(0,2) + ":" + fourDigitEnd.slice(-2) + ":00"

    // Output is array of pairs of start and end strings
    var output = []

    for (var i = 0; i < meetingDays.length; i++) {
        var day = meetingDays.charAt(i)
        var finalStart = blankDate + weekMap[day] + "T" + formattedStart
        var finalEnd = blankDate + weekMap[day] + "T" + formattedEnd
        output.push([finalStart, finalEnd])
    }
    return output
}
