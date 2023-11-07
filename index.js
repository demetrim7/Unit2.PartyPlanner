const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events';

const mainEL = document.querySelector('main');
const formEl = document.querySelector('form');
const partyName = document.querySelector('#partyName')
const partyDateTime = document.querySelector('#partyDateTime')
const partyLocate = document.querySelector('#partyLocate')
const partyDescrip = document.querySelector('#partyDescrip')





async function getParties() {
    try {
        const response = await fetch(BASE_URL);
        const party = await response.json();
        console.log(party.data);
        return party.data;
    } catch (err) {
        console.error(err);
    }
}

function render(parties) {
    const template = parties.map(party => {
        return (
            `<section>
                <h2>${party.name}</h2>
                <p>${party.date}</p>
                <p>${party.location}
                <p>${party.description}
                <button data-id="${party.id}">Delete Party</button>
            </section>`
        )
    }).join('');
    mainEL.innerHTML = template;
}

async function partyPlanner() {
    const parties = await getParties();
    render(parties);
}

partyPlanner();

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        await fetch (BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: partyName.value,
                date: partyDateTime.value,
                location: partyLocate.value,
                description: partyDescrip.value,
            })
        });

        partyName.value = '';
        partyDateTime.value = '';
        partyLocate.value = '';
        partyDescrip.value = '';

        partyPlanner();
    } catch (err) {
        console.error(err);
    }
});

mainEL.addEventListener('click', async (event) => {
    if(event.target.matches('button')) {
        const id = event.target.dataset.id;
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        partyPlanner();
    }
});