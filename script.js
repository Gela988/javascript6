

let requist = new XMLHttpRequest();

requist.addEventListener('load', function() {
    let response = this.responseText;
    let responseData = JSON.parse(response);
     console.log(responseData);

 let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.textContent = responseData.data[3].first_name;

    ul.appendChild(li);

    document.getElementById('api').appendChild(ul);

});

requist.addEventListener('error', function() {
    let p = document.createElement('p');
    p.textContent = 'Error';

    document.getElementById('api').appendChild(p);
})

requist.open('GET' ,'https://reqres.in/api/users?page=2');

requist.send();




let currentPage = 1;

function getUsers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    .then(function(response) {
        if (response.status !== 200) {
            throw 'error';
        }
        return response.json();
    })
    .then(function(responseData) {

        var fragment = document.createDocumentFragment();

        responseData.data.forEach(element => {
            let li = document.createElement('li');
            li.textContent = element.first_name;

            fragment.appendChild(li);
        });

        document.getElementById('user').appendChild(fragment);
    })
    .catch(function(error) {
       
        if (error == 404) {
            let p = document.createElement('p');
            p.textContent = 'Page not Found';

            document.getElementById('api').appendChild(p)
        } else {
            let p = document.createElement('p');
            p.textContent = 'Server Error';

            document.getElementById('api').appendChild(p)
        }

    })
}


document.getElementById('next').addEventListener('click', function() {
    currentPage += 1;
    getUsers(currentPage);
})

getUsers(currentPage);


