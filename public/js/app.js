const input = document.querySelector('input');
const display = document.querySelector('#message');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = input.value;
    display.textContent = 'Loading...';
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then(({error, forecast} = {}) => {
            if(error){
                return display.textContent = error;
            }
            display.textContent = forecast;
        });
    });
});