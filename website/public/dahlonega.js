// Get references to the elements
const chainOfCommandDiv = document.getElementById('chainOfCommand');
const employeeListDiv = document.getElementById('employeeList');

// Check if the data is already stored in local storage, otherwise initialize it
if (!localStorage.getItem('employees')) {
  const initialData = {
    managers: [],
    teamLeads: [],
    associates: []
  };
  localStorage.setItem('employees', JSON.stringify(initialData));
}

// Function to display the chain of command
function displayChainOfCommand() {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const chainOfCommandHTML = `
    <h2>Chain of Command</h2>
    <ul>
      <li>Managers (${employees.managers.length})</li>
      <li>Team Leads (${employees.teamLeads.length})</li>
      <li>Associates (${employees.associates.length})</li>
    </ul>
  `;
  chainOfCommandDiv.innerHTML = chainOfCommandHTML;
}

// Function to display the list of employees
function displayEmployeeList() {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const employeeListHTML = `
    <h2>Employee List</h2>
    <h3>Managers</h3>
    <ul>
      ${employees.managers.map(manager => `<li>${manager}</li>`).join('')}
    </ul>
    <h3>Team Leads</h3>
    <ul>
      ${employees.teamLeads.map(lead => `<li>${lead}</li>`).join('')}
    </ul>
    <h3>Associates</h3>
    <ul>
      ${employees.associates.map(associate => `<li>${associate}</li>`).join('')}
    </ul>
  `;
  employeeListDiv.innerHTML = employeeListHTML;
}

// Function to hire an employee
function hireEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const role = document.getElementById('employeeRole').value;
    if (name !== '') {
      const employees = JSON.parse(localStorage.getItem('employees'));
      employees[role + 's'].push(name);
      localStorage.setItem('employees', JSON.stringify(employees));
      displayChainOfCommand();
      displayEmployeeList();
    }
  }
  
  // Function to fire an employee
  function fireEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const role = document.getElementById('employeeRole').value;
    if (name !== '') {
      const employees = JSON.parse(localStorage.getItem('employees'));
      const index = employees[role + 's'].indexOf(name);
      if (index !== -1) {
        employees[role + 's'].splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
        displayChainOfCommand();
        displayEmployeeList();
      }
    }
  }
  
  // Add event listeners to the buttons
  document.getElementById('hireBtn').addEventListener('click', hireEmployee);
  document.getElementById('fireBtn').addEventListener('click', fireEmployee);

// Call the functions to initially display the data
displayChainOfCommand();
displayEmployeeList();


