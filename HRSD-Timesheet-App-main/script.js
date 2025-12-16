// =====================================
// INDEX PAGE SCRIPT (EMPLOYEE VIEW)
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTS
    const table = document.querySelector(".timesheet");
    const tbody = table.querySelector("tbody");
    const addRowBtn = document.querySelector(".btn.outline");
    const totalHoursEl = document.querySelector(".hours-box span");
    const saveBtn = document.querySelector(".btn.success");
    const submitBtn = document.querySelector(".btn.primary");

    // ---------------------------------
    // CALCULATE TOTAL HOURS
    // ---------------------------------
    function calculateTotalHours() {
        let total = 0;

        tbody.querySelectorAll('input[type="number"]').forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) total += val;
        });

        totalHoursEl.textContent = total.toFixed(1);
    }

    // ---------------------------------
    // DELETE ROW (EVENT DELEGATION)
    // ---------------------------------
    tbody.addEventListener("click", function (e) {
        if (e.target.closest(".icon-btn.danger")) {
            const row = e.target.closest("tr");
            row.remove();
            calculateTotalHours();
        }
    });

    // ---------------------------------
    // LIVE HOURS UPDATE
    // ---------------------------------
    tbody.addEventListener("input", function (e) {
        if (e.target.type === "number") {
            calculateTotalHours();
        }
    });

    // ---------------------------------
    // ADD NEW ROW
    // ---------------------------------
    addRowBtn.addEventListener("click", function () {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="date"></td>
            <td><input type="text" placeholder="Project Name"></td>
            <td>
                <select>
                    <option>Regular</option>
                    <option>Overtime</option>
                    <option>Leave</option>
                </select>
            </td>
            <td><input type="number" min="0" step="0.5" value="0"></td>
            <td><input type="text" placeholder="Optional notes"></td>
            <td>
                <button class="icon-btn danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(row);
        calculateTotalHours();
    });

    // ---------------------------------
    // SAVE & SUBMIT (DEMO)
    // ---------------------------------
    saveBtn.addEventListener("click", function () {
        alert("Timesheet saved as draft 🟡");
    });

    submitBtn.addEventListener("click", function () {
        if (confirm("Submit timesheet for manager approval?")) {
            alert("Timesheet submitted successfully ✅");
        }
    });

    // ---------------------------------
    // INIT
    // ---------------------------------
    calculateTotalHours();

});
