const container = document.getElementById('container');
const addBtn = document.querySelector('.add-btn');

let notes = [];
let saved = localStorage.getItem('saveFile');
if (saved) {
    notes = JSON.parse(saved);
}
renderBoxes();

addBtn.addEventListener('click', () => {
    let boxId = Date.now();
    let title = "Title here";
    let content = "Content here";

    notes.push({id: boxId, title: title, content: content});
    
    renderBoxes();
})

function renderBoxes() {
    container.innerHTML = "";
    notes.forEach(note => {
        let box = document.createElement('box');
        box.dataset.id = note.id;

        let boxTitle = document.createElement('textarea');
        boxTitle.classList.add('title');
        boxTitle.value = note.title;

        let boxContent = document.createElement('textarea');
        boxContent.classList.add('content');
        boxContent.value = note.content;
        
        let deleteBtn = document.createElement('div');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "×";

        box.appendChild(boxTitle);
        box.appendChild(boxContent);
        box.appendChild(deleteBtn);
        container.appendChild(box);

        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            let parentBox = event.target.parentNode;
            let boxId = Number(parentBox.dataset.id);
            const toDelete = notes.findIndex(obj => obj.id === boxId);
            notes.splice(toDelete, 1);
            
            renderBoxes();
        })

        let boxes = document.querySelectorAll('box');
        boxes.forEach(box => {
            let textBoxes = box.querySelectorAll('textarea');
            textBoxes.forEach(textbox => {
                textbox.addEventListener('mousedown', () => {
                    let saveBtn = document.createElement('div');
                    saveBtn.classList.add('save-btn');
                    saveBtn.textContent = '✓';
                    if (!box.querySelector('.save-btn')) {
                        box.appendChild(saveBtn);
                    }

                    boxTitle.classList.add('active');
                    boxContent.classList.add('active');
                    box.classList.add('active');
                    saveBtn.classList.add('active');
                    deleteBtn.classList.add('active');
                    let main = document.querySelector('html');
                    main.classList.add('hide-scrollbar');

                    saveBtn.addEventListener('click', () => {
                        note.title = boxTitle.value;
                        note.content = boxContent.value;
                        main.classList.remove('hide-scrollbar');
                       
                        renderBoxes();
                    })
                })
            })
        })
    })
    localStorage.setItem('saveFile', JSON.stringify(notes));
}

const themes = ['light', 'matcha', 'blue', 'dark-purple', 'dark-turquoise', 'dark-beige']
let savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light');
}

const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    nextTheme();
})

function nextTheme() {
    let current = localStorage.getItem('theme');
    if (!current) {
        current = 'light';
    }
    let index = themes.indexOf(current);
    let nextIndex = index +1;
    if (nextIndex >= themes.length) {
        nextIndex = 0;
    } 
    let next = themes[nextIndex];
    setTheme(next);
}

function setTheme(newTheme) {
    document.documentElement.classList.forEach(c => {
        if (c.startsWith('theme-')) {
            document.documentElement.classList.remove(c);
        }
    });
    document.documentElement.classList.add(`theme-${newTheme}`);
    localStorage.setItem('theme', newTheme);
}
