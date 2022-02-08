const searchBtn = document.getElementById('search');
const form = document.getElementById('search-location')
const moreInfoBtn = document.getElementById('more-information');
searchBtn.addEventListener('click', getInput);
const countryRadioEl = document.getElementById('country');
const capitalRadioEl = document.getElementById('capital');
const inputEls = document.querySelectorAll('input');
const allCards = document.querySelectorAll('card-panel');
const containerDiv = document.querySelector('.container')


// add modal for alert message, or jquery modal
// add .catch


function getInput(e) {
    // form.innerText = ""
    console.log('working')
    e.preventDefault();
    input = form.value;
    console.log(input);
    // check which input is checked
    // console.log(countryRadioEl.checked) 
    // console.log(capitalRadioEl.checked)
    if(input && countryRadioEl.checked){
        getLocation(input)
    } else if(input && capitalRadioEl.checked) {
        getLocationCapital(input)
    } else {
        showAlert('Please enter a valid location name and select country or capital');
    }
    // if(input){
    //     getLocation(input);
    //     console.log(input);
    // } else {
    //     showAlert("Please enter a valid location name");
    //     // alert('enter valid location');
    // }
    deselectAnswers();
};

function deselectAnswers() {
    // for each answer element, deselect answer checked option
    inputEls.forEach((inputEls) => (inputEls.checked = false));
}

function getLocation(name) {
    let requestURL = `https://restcountries.com/v3.1/name/` + name
    console.log(requestURL);
    fetch(requestURL)
    .then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayInfo(data);
            });
        }else {
            alert('Country/Capital not found, please try again.');
        }
    })
}

function getLocationCapital(name) {
    let requestURL = "https://restcountries.com/v3.1/capital/" + name
    console.log(requestURL);
    fetch(requestURL)
    .then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayInfo(data);
            });
        }else {
            alert('Country/Capital not found, please try again.');
        }
    })
}

const appendDiv = document.querySelector('.append-div');
const countryHeaderEl = document.createElement('h3');
const populationHeaderEl = document.createElement('h5');
const capitalEl = document.querySelector('.capital');
const currencyEl = document.querySelector('.currency');
const languageEl = document.querySelector('.language');
const sectionContainer = document.querySelector('.section-icons');
sectionContainer.style.display = 'none';

function displayInfo(data) {
    console.log(data)
    const countryName = `${data[0].name['common']} ${(data[0].flag)}`;
    countryHeaderEl.innerHTML = countryName;
    appendDiv.appendChild(countryHeaderEl);
    populationHeaderEl.innerText = "Population: " + data[0].population.toLocaleString();
    countryHeaderEl.appendChild(populationHeaderEl)
    capitalEl.innerText = data[0].capital[0];
    currencyEl.innerText= `${data[0].currencies[Object.keys(data[0].currencies)[0]].name}  (${data[0].currencies[Object.keys(data[0].currencies)[0]].symbol})`
    languageEl.innerText = data[0].languages[Object.keys(data[0].languages)[0]]
    // console.log(data[0].region);
    // flagEl.innerText = data[0].flag;
    // use toLocaleString to insert commas within population number
    // currencyEl.innerText = (data[0].population.toLocaleString());
    // console.log(data[0].languages);

    // more information button is displayed with results
    // moreInfoBtn.classList.remove("d-none");
    // containerDiv.classList.remove("d-none");
    sectionContainer.style.display = 'block';
    // when clicking more info button, redirects to a wiki page with more information about location
    moreInfoBtn.addEventListener('click', function(e){
        e.preventDefault();
        input = form.value.trim();
        moreInfoBtn.target= '_blank';
        // location.href= 'https://en.wikipedia.org/wiki/' + input ;

        window.open(`https://en.wikipedia.org/wiki/${input}`, '_blank')
    })

}



function showAlert(message, color) {
    let div = document.createElement('div');
    div.classList.add("alert");
    div.classList.add('alert-warning');
    div.innerText = message;
    document.querySelector('#input').prepend(div);

    setTimeout(function () {
        $(".alert").remove();
    }, 3000);
}