import { updatedDate } from "tasks.js";

const dateBtn = document.querySelector(".js-date")
const dates = document.querySelector(".js-dates")

// Default home page on current date
const now = new Date();
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
dateBtn.value = now.toISOString().substring(0,10);
updatedDate(day,month,year)

function addListenerToList() {
    const dateList = dates.querySelectorAll("li");
    dateList.forEach( li => {
        li.addEventListener("click", e => {
            dateList.forEach(li => li.classList.remove("scale"));
            li.classList.add("scale"); 
            day = li.children[0].textContent
            dateBtn.value = "";
            updatedDate(day,month,year);
        })
    })
}

function insertHTMLDateList(day,month,year) {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const daysInMonth = new Date(year,month,0).getDate()

    dates.replaceChildren()
    for (let i = 1; i <= daysInMonth; i++) {
        let html = `<li>
                        <p>${i}</p>
                        <p>${days[new Date(year,month-1,i).getDay()]}</p>
                    </li>
                    `
        dates.insertAdjacentHTML("beforeend",html)

        if (Number(day) === i - 3) {
            dates.parentElement.scroll(10000,0)
        }

        if (Number(day) === i ) {
            dates.lastElementChild.classList.add("scale")
        }
    }
    addListenerToList()
}
insertHTMLDateList(day,month,year)


dateBtn.addEventListener("change",(e) => {
    const inputDate = dateBtn.value.split("-");
    year = inputDate[0];
    month = Number(inputDate[1]);
    day = inputDate[2];

    insertHTMLDateList(day,month,year)
    updatedDate(day,month,year)
})
