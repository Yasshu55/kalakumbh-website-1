class ChatUI {
    constructor(list) {
        this.list = list;
    }
    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.createdAt.toDate(),
            {addSuffix: true}
        );
        const html = `
            <li class="list-group-item mb-1">
                <span class="username font-weight-bold bg-dark text-light border">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="date text-muted">${when}</div>
            </li>`;

        this.list.innerHTML += html;
    }
    clear() {
        this.list.innerHTML = "";
    }
}

const mainButtons = document.querySelectorAll('.main-button');
const subButtons = document.querySelectorAll('.sub-buttons');

// add click event listener to each main button
mainButtons.forEach(mainButton => {
  mainButton.addEventListener('click', () => {
    const target = mainButton.dataset.target;
    const targetSubButtons = document.querySelector(`#${target}`);
    subButtons.forEach(subButton => {
      if (subButton !== targetSubButtons) {
        subButton.classList.add('hidden');
      }
    });
    targetSubButtons.classList.toggle('hidden');
  });
});

// add click event listener to each sub button
subButtons.forEach(subButton => {
  subButton.addEventListener('click', () => {
    // remove the 'selected' class from any other sub buttons that have it
    subButtons.forEach(otherButton => {
      if (otherButton !== subButton && otherButton.classList.contains('selected')) {
        otherButton.classList.remove('selected');
      }
    });
    
    // add the 'selected' class to the clicked sub button
    subButton.classList.add('selected');
  });
});

// const subButtons = document.querySelectorAll('.sub-button');

subButtons.forEach(subButtons => {
  subButtons.addEventListener('click', () => {
    subButtons.classList.toggle('active');
  });
});

