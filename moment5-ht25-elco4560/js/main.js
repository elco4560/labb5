// Denna fil ska innehålla din lösning till uppgiften (moment 5).

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

//när sidan laddats färdigt körs funktionen init
window.onload = init;


function init() {
    //anropar funktionen som hämtar alla radiokanaler
    channels();
}

//hämtar kanaldata från sveriges radio API
function channels() {
    const url = "https://api.sr.se/api/v2/channels/?format=json"; // URL för alla kanaler, i JSON-format

    fetch(url) // hämtar API:et
        .then(response => response.json()) //omvandlar till ett JavaScript-objekt
        .then(data => displayChannels(data.channels)) //skickar datan vidare till funktionen displayChannels
        .catch(error => console.log(error)); // fångar eventuella felmeddelanden i konsollen
}

//funktion som visar kanalerna på sidan
function displayChannels(channels) {
    const channelList = document.getElementById("mainnavlist"); //Hämtar <ul>-elementet där kanalerna ska visas

    channels.forEach(channel => { //loopar igenom varje kanal i listan
        let mainNavListEl = document.createElement("li"); //skapar nytt <li>-elementl
        let mainnavlistText = document.createTextNode(channel.name); //lägger till kanalens namn som textnod
        mainNavListEl.appendChild(mainnavlistText); //lägger till textnoden i <li>-elementet

        channelList.appendChild(mainNavListEl); //lägger till <li> i <ul>

        //Skapar en eventlyssnare som reagerar när musen förs över elementet
        mainNavListEl.addEventListener("mouseover", () => {
            mainNavListEl.title = channel.tagline; //Sätter kanalens beskrivning som tooltip(en liten informationsruta) via title-attributet
        });
        //när man klickar på kanalen hämtas tablån för den kanalen
        mainNavListEl.addEventListener("click", () => {
            displaySchedules(channel.id, channel.name); //anropar funktionen med kanalens id
<<<<<<< HEAD
        });      
=======
        })
>>>>>>> ba7e5b831796fb786654b070e6c3201eea930654
    });
}

//funktion som visar tablån för vald kanal
function displaySchedules(channelId, channelName) {
    const today = new Date(); // nytt datumobjekt för dagens datum
    const year = today.getFullYear(); // hämtar året
    const month = String(today.getMonth() + 1).padStart(2, "0"); // hämtar månaden (0-11), lägger till 1, fyller med 0 om ensiffrig
    const day = String(today.getDate()).padStart(2, "0");//Hämtar dagens datum och fyller med 0 om ensiffrig
    const dateStr = `${year}-${month}-${day}`; //skapar sträng i formaten YYYY-MM-DD

    //API-url för tablån, med size=999 för att få med alla program
    const url = `https://api.sr.se/api/v2/scheduledepisodes?channelid=${channelId}&date=${dateStr}&format=json&size=999`;
    const scheduleList = document.getElementById("info"); //hämtar elementet där tablån ska visas

    scheduleList.innerHTML = ""; //rensar tidigare innehåll/tablå

    fetch(url)
        .then(response => response.json()) //omvandlar till JavaScript 
        .then(data => {
            let rubrik = document.createElement("h2"); //skapar rubrik för tablåerna
            let rubrikText = document.createTextNode(`Dagens tablå för ${channelName}`); //text till rubriken, med kanalens namn
            rubrik.style.textDecoration = "underline"; //gör rubriken understruken
            rubrik.appendChild(rubrikText); //lägger till text till <h2>
            scheduleList.appendChild(rubrik); //lägger till <h2> i tablån (info)


            const timeNow = new Date(); //hämtar nuvarande tid
            const timeNowMs = timeNow.getTime(); // omvandlar till millisekunder
<<<<<<< HEAD
                
                //loopar igenom alla program i schemat
                data.schedule.forEach(program => {
                    //hämtar starttid och konverterar från SRs datumformat till millisekunder
                    let startTime = program.starttimeutc;
                    startTime = parseInt(startTime.slice(6,-2)); // slice(6, -2) tar bort "/Date(" i början och ")/" i slutet
                    //hämtar sluttid och konverterar till millisekunder
                    let endTime = program.endtimeutc;
                    endTime = parseInt(endTime.slice(6,-2));
=======
>>>>>>> ba7e5b831796fb786654b070e6c3201eea930654

            //loopar igenom alla program i schemat
            data.schedule.forEach(program => {
                //hämtar starttid och konverterar från SRs datumformat till millisekunder
                let startTime = program.starttimeutc
                startTime = parseInt(startTime.slice(6, -2)); // slice(6, -2) tar bort "/Date(" i början och ")/" i slutet
                //hämtar sluttid och konverterar till millisekunder
                let endTime = program.endtimeutc
                endTime = parseInt(endTime.slice(6, -2));

                //endast program som pågår nu eller i framtiden visas
                if (endTime > timeNowMs) {
                    const startTimeDate = new Date(startTime); //skapar datumobjekt för starttid
                    const endTimeDate = new Date(endTime); //skapar datumobjekt för sluttid

<<<<<<< HEAD
                        let timeEl = document.createElement("p"); //skapar <p>-element för tider
                        
                        //hämtar veckodag, datum och tid på svenska
                        let weekday = startTimeDate.toLocaleDateString("sv-SE", {weekday: "long"});
                        let weekdayCap = weekday[0].toUpperCase() + weekday.substring(1); //Första bokstaven stor
                        let date = startTimeDate.toLocaleDateString("sv-SE", {day: "numeric", month: "long"});
                        let time = startTimeDate.toLocaleTimeString("sv-SE", {hour: "2-digit", minute: "2-digit"});
                        let endTimeTextFormatted = endTimeDate.toLocaleTimeString("sv-SE", {hour: "2-digit", minute: "2-digit"});
                        
                        //skapar textsträng för start och sluttid                    
                        let timeTextFormatted = `${weekdayCap} ${date} kl. ${time} - ${endTimeTextFormatted}`;
=======
                    const articleEl = document.createElement("article"); //skapar ett <article>-element för programmet
>>>>>>> ba7e5b831796fb786654b070e6c3201eea930654

                    let titleEl = document.createElement("h3"); //skapar rubrik
                    if (timeNowMs >= startTime && timeNowMs < endTime) {
                        // Om programmet pågår just nu, lägg till röd prick och text "pågår"
                        titleEl.innerHTML = `${program.title} <marquee><span style="color:red; font-size:0.8em;">● pågår</span></marquee>`;
                    } else {
                        // annars visas bara titeln
                        let titleText = document.createTextNode(program.title);
                        titleEl.appendChild(titleText);
                    }
<<<<<<< HEAD
                });
        }); 
=======

                    let timeEl = document.createElement("p"); //skapar <p>-element för tider

                    //hämtar veckodag, datum och tid på svenska
                    let weekday = startTimeDate.toLocaleDateString("sv-SE", { weekday: "long" });
                    let weekdayCap = weekday[0].toUpperCase() + weekday.substring(1); //Första bokstaven stor
                    let date = startTimeDate.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });
                    let time = startTimeDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
                    let endTimeTextFormatted = endTimeDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })

                    //skapar textsträng för start och sluttid                    
                    let timeTextFormatted = `${weekdayCap} ${date} kl. ${time} - ${endTimeTextFormatted}`;

                    let timeText = document.createTextNode(timeTextFormatted); //skapar textnod
                    timeEl.appendChild(timeText);//lägger till i <p>

                    //skapar <p>-element för beskrivning
                    let descriptionEl = document.createElement("p");
                    let descriptionText = document.createTextNode(program.description);
                    descriptionEl.appendChild(descriptionText);

                    //lägger till rubrik, tid och beskrivning i <article>-elementet
                    articleEl.appendChild(titleEl);
                    articleEl.appendChild(timeEl);
                    articleEl.appendChild(descriptionEl);

                    //lägger till <article> i tablån på sidan (info)
                    scheduleList.appendChild(articleEl);
                }
            })
        })
>>>>>>> ba7e5b831796fb786654b070e6c3201eea930654
        .catch(error => console.log(error)); // fångar eventuella felmeddelanden i konsollen
} 