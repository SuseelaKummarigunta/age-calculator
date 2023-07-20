var datePicker = document.querySelector('#datePicker')
var Bdate = document.querySelector('.birthDate')
var BMonth = document.querySelector('.birthMonth')
var Byear = document.querySelector('.birthYear')

var ageYear = document.getElementById('ageYear')
var ageMonth = document.getElementById('ageMonth')
var ageFortnight = document.getElementById('ageFortnight')
var ageWeek = document.getElementById('ageWeeks')
var ageDays = document.getElementById('ageDays')
var ageHours = document.getElementById('ageHours')
var ageMinutes = document.getElementById('ageMinutes')
var ageSeconds = document.getElementById('ageSeconds')
var ageMiliseconds = document.getElementById('ageMiliseconds')
var dateFormet = document.querySelector('.dateFormet')


const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

datePicker.addEventListener('change', () => {
    
    let today = new Date()
    let birthDates = new Date(datePicker.value)

    // let todayTime = today.getTime()
    // let bithTime =  birthDates.getTime()

    // let result = todayTime - bithTime
    // console.log(result);
    
    let birthDate, birthMonth, birthYear

    let birthDetails = {
        year: birthDates.getFullYear(),
        month: birthDates.getMonth()+1,
        date: birthDates.getDate()
    }

    let currentDetails = {
        year: today.getFullYear(),
        month: today.getMonth()+1,
        date: today.getDate()
    }


    // Check for leap year.
    leapYear(currentDetails.year)

    // Calculate Age...

    birthYear = currentDetails.year - birthDetails.year

    if(currentDetails.month >= birthDetails.month){
        birthMonth = currentDetails.month - birthDetails.month
    }
    else{
        birthYear--
        birthMonth = 12 + currentDetails.month - birthDetails.month
    }
    

    if(currentDetails.date >= birthDetails.date){
        birthDate = currentDetails.date - birthDetails.date
    }
    else{
        birthMonth--
        let days = months[currentDetails.month - 2]
        birthDate = days + currentDetails.date - birthDetails.date

        if(birthMonth < 0){
            birthMonth = 11
            birthYear--
        }
    }


    let option = {year: 'numeric', month: 'long', day: 'numeric'}
    let DOB = birthDates.toLocaleDateString('en-us',option)
    
    if(birthDetails.year > currentDetails.year || (birthDetails.month > currentDetails.month && birthDetails.year == currentDetails.year) || (birthDetails.date > currentDetails.date && birthDetails.month == currentDetails.month && birthDetails.year == currentDetails.year)){
        alert("Not Born Yet, May be Your given DOB is Wrong.")

        datePicker.value = ""
        Byear.innerHTML = "-"
        BMonth.innerHTML = "-"
        Bdate.innerHTML = "-"
        dateFormet.innerHTML = ""
        document.querySelector('.age-calc').classList.remove('expand')
    }

    else{
        Byear.innerHTML = birthYear
        BMonth.innerHTML = birthMonth
        Bdate.innerHTML = birthDate
        document.querySelector('.age-calc').classList.add('expand')
        dateFormet.innerHTML = `DOB: <span class="birthDate">${DOB}</span>`
    }

    var milisecond_Btw_DOB = Date.parse(DOB)
    var milisecond_Btw_Now = Date.now()

    var age_in_milisecond = milisecond_Btw_Now - milisecond_Btw_DOB
    
    var milisecond = age_in_milisecond

    val_sec = Math.floor(milisecond / 1000)
    val_min = Math.floor(milisecond / (1000 * 60))
    val_hour = Math.floor(milisecond / (1000 * 60 * 60))
    val_day = Math.floor(milisecond / (1000 * 60 * 60 * 24))
    val_fortN = Math.floor(milisecond / (1000 * 60 * 60 * 24 * 15))
    val_week = Math.floor(milisecond / (1000 * 60 * 60 * 24 * 7))
    val_month = Math.floor(milisecond / (1000 * 60 * 60 * 24 * 30.4375))
    val_year = Math.floor(milisecond / (1000 * 60 * 60 * 24 * 365.25))

    ageYear.innerHTML = val_year.toLocaleString('en-US')
    ageMonth.innerHTML = val_month.toLocaleString('en-US')
    ageFortnight.innerHTML = val_fortN.toLocaleString('en-US')
    ageWeek.innerHTML = val_week.toLocaleString('en-US')
    ageDays.innerHTML = val_day.toLocaleString('en-US')
    ageHours.innerHTML = val_hour.toLocaleString('en-US')
    ageMinutes.innerHTML = val_min.toLocaleString('en-US')
    ageSeconds.innerHTML = val_sec.toLocaleString('en-US')
    ageMiliseconds.innerHTML = milisecond.toLocaleString('en-US')
})


function leapYear(year){
    if((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29
    }
    else{
        months[1] = 28
    }
}