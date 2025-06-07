const btnMilk = document.getElementById('milkBtn');
const btnNappy = document.getElementById('nappyBtn');
const table = document.getElementById('logTable');
const btnDelete = document.getElementById('deleteBtn');

// Load saved rows from localStorage on page load
window.addEventListener('load', function () {
  const saved = localStorage.getItem('logRows');
  if (saved) {
    const rows = JSON.parse(saved);
    rows.forEach((row) => addRowToTable(row.action, row.date, row.time));
  }
});

// Add event listeners
btnMilk.addEventListener('click', function () {
  logAction('🍼Milk');
});

btnNappy.addEventListener('click', function () {
  logAction('🩲Nappy');
});

btnDelete.addEventListener('click', function () {
  removeLastAction();
});

// Function to log action and save to localStorage
function logAction(action) {
  const today = new Date();

  const dateOptions = {
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Manila',
  };
  const formattedDate = today.toLocaleDateString('en-PH', dateOptions);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  };
  const formattedTime = today.toLocaleTimeString('en-PH', timeOptions);

  addRowToTable(action, formattedDate, formattedTime);

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('logRows')) || [];
  existing.push({ action, date: formattedDate, time: formattedTime });
  localStorage.setItem('logRows', JSON.stringify(existing));
}

// Function to add row to table
function addRowToTable(action, date, time) {
  const newRow = document.createElement('tr');

  const td1 = document.createElement('td');
  td1.textContent = action;

  const td2 = document.createElement('td');
  td2.textContent = date;

  const td3 = document.createElement('td');
  td3.textContent = time;

  newRow.appendChild(td1);
  newRow.appendChild(td2);
  newRow.appendChild(td3);

  if (table.rows.length > 1) {
    // Insert before first data row (index 1)
    table.insertBefore(newRow, table.rows[1]);
  } else {
    // If no data rows yet, append to end
    table.appendChild(newRow);
  }
  countAction();
}


//Function to remove last Action
function removeLastAction () {
  table.removeChild(table.rows[1]);
  countAction();
}

//Function to count action
function countAction () {
  let milkCount = 0;
  let nappyCount = 0;

  for (let i = 1; i < table.rows.length; i++) {
    const currentRow = table.rows[i];
    const actionContent = currentRow.cells[0].textContent;

    switch (actionContent) {
      case '🍼Milk':
        milkCount += 1;
        break;
      case '🩲Nappy':
        nappyCount += 1;
        break;
    }
  }
  document.querySelector('.milk-count').textContent = milkCount;
  document.querySelector('.nappy-count').textContent = nappyCount;
}

