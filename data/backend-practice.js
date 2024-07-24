const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  //status code that starts 4 and 5 (400, 404, 500) = failed, if it starts with 4 means our problem and if 5 it is the backend problem
  //status code that starts 2 (200, 201, 204) = succeeded
  console.log(xhr.response);
})

//.open() takes 1st param as types of request (GET, POST, PUT, DELETE)
// 2nd param takes where to send the message in another computer, in order to find amother computer we use URL
xhr.open('GET', 'https://supersimplebackend.dev')
xhr.send();