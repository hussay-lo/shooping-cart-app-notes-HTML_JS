function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    } else {
      return fallback;
    }
  } catch (error) {
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('ERROR', error);
  }
}

let notes = loadData('notes', []);
function addNote(title, text) {
  const note = { id: Date.now(), title: title, text: text };
  notes.push(note);
  saveData('notes', notes);
  render();
}

const list = document.getElementById('list');

function render(items = notes) {
  list.innerHTML = '';
  items.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note.title + ': ' + note.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.style.color = 'red';
    delBtn.addEventListener('click', () => deleteNote(note.id));

    li.appendChild(delBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';


    editBtn.addEventListener('click',() => startEdit(note));

    li.appendChild(editBtn);
    list.appendChild(li);
  });
}
render();

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveData('notes', notes);

  render();
}

const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const addBtn = document.getElementById('addBtn');


addBtn.addEventListener('click', () => {
  const title = titleInput.value;
  const text = textInput.value;

  if (editingId === null) {
    addNote(title, text);
  } else {
    updateNote(editingId, title, text);
    editingId = null;
    addBtn.textContent = 'add';
  }
  titleInput.value = '';
  textInput.value = '';
});


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
const filtered = notes.filter((note) =>
  note.title.toLowerCase().includes(query) ||
  note.text.toLowerCase().includes(query))

  render(filtered);
})

function updateNote(id, newTitle, newText){
  notes = notes.map((note) => {
    if (note.id === id) {
      return {...note, title: newTitle, text: newText};
    }
    return note;
  })
  saveData('notes', notes);
  render();
}

let editingId = null;

function startEdit(note) {
  titleInput.value = note.title;
  textInput.value = note.text;
  editingId = note.id;
  addBtn.textContent = "saveEdit";
}

