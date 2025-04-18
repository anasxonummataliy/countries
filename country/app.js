const searchInput = document.getElementById('searchInput');
const countriesContainer = document.getElementById('countries');

async function getAllcountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Ma\'lumotlarni olishda xatolik');
        }
        const data = await response.json();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        displayCountries(data);
    } catch (error) {
        countriesContainer.innerHTML = '<p>Ma\'lumotlarni yuklashda xatolik yuz berdi</p>';
    }
}

async function searchCountries(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error('Mamlakat topilmadi');
        }
        const data = await response.json();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        displayCountries(data);
    } catch (error) {
        countriesContainer.innerHTML = '<p>Mamlakat topilmadi</p>';
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = '';

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';

        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <h3>${country.name.common}</h3>
            <p>Poytaxti: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Mintaqa: ${country.region}</p>
            <p>Aholisi: ${country.population.toLocaleString()}</p>
            <p>Xitoy tilida: ${country.translations.zho?.common || 'N/A'}</p>

        `;

        countriesContainer.appendChild(countryCard);
    });
}

window.addEventListener('load', getAllcountries);

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length > 0) {
        searchCountries(searchTerm);
    } else {
        getAllcountries();
    }
});