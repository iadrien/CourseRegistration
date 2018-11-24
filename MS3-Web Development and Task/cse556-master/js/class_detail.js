document.addEventListener('DOMContentLoaded', fillClass, false);

var school, dept, num;

function fillClass() {
    var s = window.location.href
    s = s.split("?")[1]
    var title = s.split("=")[1]
    var c = title.split("%20").length
    for(var i = 0; i< c ; i++){
        title = title.replace("%20"," ")
    }

    for (var i = 0; i < classesDB.length; i++) {
        // A correct match has its title as a substring
        if (classesDB[i][7] == title) {
            // Matches the school dropdown
            fillDetails(classesDB[i]);
            school = classesDB[i][0]
            dept = classesDB[i][1]
            num = classesDB[i][2]

        }
    }

    var count = 0;
    var sum = 0;

    for(var i = 0; i<reviews.length; i++){
        if (reviews[i][0] == school && reviews[i][1] == dept && reviews[i][2] == num){
            fillReviews(reviews[i], document.getElementById("reviews"))
            sum = sum + parseInt(reviews[i][5])
            count = count + 1
        }
    }
    var foo = fillFromCookies(document.getElementById("reviews"), sum, count);
    sum = foo[0]
    count = foo[1]

    var r = " review"
    if(count > 1){
        r = " reviews"
    }

    var rate = (sum/count).toFixed(2);

    document.getElementById("num_reviews").innerHTML = count + r
    document.getElementById("rating_detail").innerHTML = rate
    document.getElementById("top_num_reviews").innerHTML = count + r

    setup_popups()
}

function fillDetails(c) {
    document.getElementById("course").innerHTML = setBtnLabel(c)
    document.getElementById("course").id = c
    document.getElementById("class_number").innerHTML = c[7]
    document.getElementById("class_title").innerHTML = c[0] + " " + c[1] + " " + c[2]
    document.title = c[1] + " " + c[2]
    document.getElementById("course_description").innerHTML = c[9]
    document.getElementById("teacher").innerHTML = c[6]
    document.getElementById("class_time").innerHTML = c[5] + " " + twentyfour2ampm(c[3]) + "-" + twentyfour2ampm(c[4])
}

function fillReviews( arr , elm){
    var div = document.createElement('div');
    div.className = 'customer-review_wrap';
    var course = arr

    var sp ='';
    if(arr[5] < 3){
        for(var i = 0; i< arr[5]; i++){
            sp = sp + '<span class="customer-rating-red"></span>'
        }
    }else{
        for(var i = 0; i< arr[5]; i++){
            sp = sp + '<span></span>'
        }
    }
    for(var i = 0; i < 5-arr[5]; i++){
        sp = sp + '<span class="round-icon-blank"></span>';
    }

    div.innerHTML =
        '<div class="customer-img">\
        <p>Grade Received</p>\
        <span>'+arr[4]+'</span>\
        </div>\
         <div class="customer-content-wrap">\
             <div class="customer-content">\
             <div class="customer-review">\
             <h6></h6>\
         '+sp+'\
         <div class="customer-rating">'+arr[5]+'</div>\
         </div>\
         <p class="customer-text">'+arr[6]+'</p>\
         </div>\
         </div>\
         <hr>';


    elm.appendChild(div);

}

function  setup_popups() {

    var modal = document.getElementById('ReviewPopUp');

    // Get the button that opens the modal
    var btn = document.getElementById("add_review_btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };
}

function submit_review() {
    var modal = document.getElementById('ReviewPopUp');
    var review = document.getElementById("review_input").value
    var grade = document.getElementById("grade_options").value
    var rating = document.getElementById("rating_options").value

    var s = school + ","+ dept + ","+ num + ","+review + "," + grade + "," + rating

    addReview(s)

    modal.style.display = "none";

}

function fillFromCookies(elm, sum, count) {
    var res = getReviews()

    for( var i = 0; i < res.length; i++){

        if(res[i][0] == school && res[i][1] == dept && res[i][2] == num) {

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
                <span>' + res[i][4] + '</span>\
            </div>\
             <div class="customer-content-wrap">\
                 <div class="customer-content">\
                 <div class="customer-review">\
                 <h6></h6>\
             ' + sp + '\
             <div class="customer-rating">' + parseInt(res[i][5]) + '</div>\
             </div>\
             <br>\
             <p class="customer-text">' + res[i][3] + '</p>\
             </div>\
             </div>\
             <hr>';


            elm.appendChild(div);
            count += 1
            sum += parseInt(res[i][5])
        }
    }
    return [sum, count]
}

function selectCourse(btn, id) {
    var details = id.split(",")
    var c = findCourseArray(details[1], details[2])

    var wkst = getWorksheet()
    var reg = getRegistered()

    if (wkst.indexOf(c) > -1) {
        removeCourse(c)
        btn.innerHTML = "ADD TO WISHLIST"
    } else if (reg.indexOf(c) > -1) {
        dropCourse(c)
        alert("You have just dropped " + c[1] + " " + c[2] + ". It has been placed into your worksheet.")
        btn.innerHTML = "ADD TO WISHLIST"
    } else {
        addCourse(c)
        btn.innerHTML = "REMOVE COURSE"
    }
}

function setBtnLabel(c) {
    var wkst = getWorksheet()
    var reg = getRegistered()

    if (wkst.indexOf(c) > -1) {
        return "REMOVE FROM WISHLIST"
    } else if (reg.indexOf(c) > -1) {
        return "DROP COURSE"
    }

    return "ADD TO WISHLIST"
}
