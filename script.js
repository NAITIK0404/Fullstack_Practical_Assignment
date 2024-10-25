document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const { token } = await response.json();
        sessionStorage.setItem('token', token);
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('studentSection').style.display = 'block';
        loadStudents();
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;

    const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, age, grade })
    });

    if (response.ok) {
        loadStudents();
    }
});

async function loadStudents() {
    const response = await fetch('http://localhost:3000/api/students', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    const students = await response.json();
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name} (${student.age}, ${student.grade})`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            await fetch(`http://localhost:3000/api/students/${student._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            loadStudents();
        };
        li.appendChild(deleteBtn);
        studentList.appendChild(li);
    });
}
