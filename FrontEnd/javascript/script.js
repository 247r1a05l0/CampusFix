const API_URL = "http://localhost:8090/api/complaints";

const form = document.getElementById('complaintForm');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      studentName: document.getElementById('studentName').value,
      email: document.getElementById('email').value,
      category: document.getElementById('category').value,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value,
      priority: document.getElementById('priority').value
    };

    try {
      const r = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!r.ok) {
        throw new Error('Unable to submit');
      }

      const c = await r.json();

      const complaintId = `CF-${String(c.id).padStart(4, '0')}`;

      document.getElementById('result').innerHTML = `
        <div class="success">
          <h3>Complaint Submitted Successfully! 🎉</h3>

          <p>Your Complaint ID is:</p>

          <h2>${complaintId}</h2>

          <button type="button" onclick="copyComplaintId('${complaintId}')">
            📋 Copy Complaint ID
          </button>

          <p id="copyMessage"></p>

          <p>Please save this ID to track your complaint.</p>
        </div>
      `;

      form.reset();

    } catch (err) {
      document.getElementById('result').innerHTML =
        '<div class="error">Backend is not reachable. Start CampusFix backend first.</div>';
    }
  });
}


// Copy Complaint ID
function copyComplaintId(id) {
  navigator.clipboard.writeText(id).then(() => {

    const message = document.getElementById('copyMessage');

    if (message) {
      message.innerHTML = '✅ Complaint ID copied!';
    }

  }).catch(() => {

    alert("Unable to copy Complaint ID. Please copy it manually.");

  });
}


// Find Complaint
async function findComplaint() {

    const input = document.getElementById('searchId').value.trim();
    const out = document.getElementById('statusResult');

    if (!input) {
        out.innerHTML = '<div class="error">Please enter Complaint ID.</div>';
        return;
    }

    try {

        const all = await fetch(API_URL).then(r => r.json());

        // Convert CF-0036 → 36
        const idText = input.replace(/^CF-/i, '');
        const id = parseInt(idText, 10);

        const c = all.find(x => x.id === id);

        if (c) {

            out.innerHTML = `
                <div class="card">
                    <h3>CF-${String(c.id).padStart(4, '0')}</h3>

                    <p><b>${c.title}</b></p>

                    <p>
                        Status:
                        <span class="badge">${c.status}</span>
                    </p>

                    <p>Priority: ${c.priority}</p>

                    <p>Category: ${c.category}</p>

                    <p>Location: ${c.location || '-'}</p>
                </div>
            `;

        } else {

            out.innerHTML =
                '<div class="error">Complaint not found.</div>';

        }

    } catch (e) {

        out.innerHTML =
            '<div class="error">Backend is not reachable.</div>';

    }
}


// Admin Dashboard
async function loadAdmin() {

  const body = document.getElementById('complaints');

  if (!body) return;

  try {

    const list = await fetch(API_URL).then(r => r.json());

    const open =
      list.filter(c => c.status === 'OPEN').length;

    const progress =
      list.filter(c => c.status === 'IN_PROGRESS').length;

    const resolved =
      list.filter(c => c.status === 'RESOLVED').length;

    document.getElementById('stats').innerHTML = `
      <div class="stat">
        Total<br>
        <b>${list.length}</b>
      </div>

      <div class="stat">
        Open<br>
        <b>${open}</b>
      </div>

      <div class="stat">
        In Progress<br>
        <b>${progress}</b>
      </div>

      <div class="stat">
        Resolved<br>
        <b>${resolved}</b>
      </div>
    `;

    body.innerHTML = list.map(c => `
      <tr>

        <td>${c.id}</td>

        <td>${c.studentName}</td>

        <td>${c.category}</td>

        <td>${c.title}</td>

        <td>${c.location || '-'}</td>

        <td>${c.priority}</td>

        <td>
          <span class="badge">
            ${c.status}
          </span>
        </td>

        <td>

          <select
            onchange="updateStatus(${c.id},this.value)"
          >

            <option
              value="OPEN"
              ${c.status === 'OPEN' ? 'selected' : ''}
            >
              OPEN
            </option>

            <option
              value="IN_PROGRESS"
              ${c.status === 'IN_PROGRESS' ? 'selected' : ''}
            >
              IN_PROGRESS
            </option>

            <option
              value="RESOLVED"
              ${c.status === 'RESOLVED' ? 'selected' : ''}
            >
              RESOLVED
            </option>

          </select>

        </td>

      </tr>
    `).join('');

  } catch (e) {

    body.innerHTML =
      '<tr><td colspan="8">Backend is not reachable.</td></tr>';

  }
}


// Update Complaint Status
async function updateStatus(id, value) {

  await fetch(
    `${API_URL}/${id}/status?value=${encodeURIComponent(value)}`,
    {
      method: 'PUT'
    }
  );

  loadAdmin();
}


// Load Admin page
if (document.getElementById('complaints')) {
  loadAdmin();
}