const allEvents = document.getElementById('posts');
fetch('http://localhost:3000/events')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const eventDiv = document.createElement('div');
      const eventTitle = document.createElement('h3');
      eventTitle.textContent = item.title;
      const eventContent = document.createElement('p');
      eventContent.textContent = item.description;
      const interest = document.createElement('p');
      interest.textContent = item.intrest;
      eventDiv.appendChild(eventTitle)
      eventDiv.appendChild(eventContent)
      eventDiv.appendChild(interest);
      allEvents.appendChild(eventDiv);
    });
  });
  const form = document.getElementById('post-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const event_title = document.getElementById('title').value;
    const event_description = document.getElementById('content').value;
    const formData = {
      event_title,
      event_description
    };
  
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)

    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  });