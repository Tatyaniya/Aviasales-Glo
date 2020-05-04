const FormSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputinputDateDepart = document.querySelector('.input__date-depart');

const citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/';
const city = ['Нью-Йорк', 'Рим', 'Мадрид', 'Париж', 'Венеция', 'Лос-Анжелес', 'Одесса', 'Киев'];

const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;

        if(request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    })
    request.send();
}

const showCity = (input, list) => {
    list.textContent = '';

    // если инпут не пустой, фильтруем массив
    if (input.value !== '') {
        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });
        // из нового массива строим список
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
        });
    }
}

const hendlerCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        // записываем значение из ли в инпут
        input.value = target.textContent;
        // очищаем список
        list.textContent = '';
    }
}

// Изменения инпута
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

// выбираем откуда
dropdownCitiesFrom.addEventListener('click', (event) => {
    hendlerCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

// выбираем куда
dropdownCitiesTo.addEventListener('click', (event) => {
    hendlerCity(event, inputCitiesTo, dropdownCitiesTo);
});

getData(proxy + citiesAPI, (data) => {
    console.log(data);
});