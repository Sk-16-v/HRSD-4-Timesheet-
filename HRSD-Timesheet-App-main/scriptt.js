// ===============================
// HRSD TIMESHEET SCRIPT (FIXED)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.querySelector(".timesheet tbody");
    const addRowBtn = document.querySelector(".btn.outline");
    const totalHoursSpan = document.querySelector(".hours-box span");

    // ===============================
    // CALCULATE TOTAL HOURS
    // ===============================
    function calculateTotalHours() {
        let total = 0;

        tableBody.querySelectorAll('input[type="number"]').forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                total += value;
            }
        });

        totalHoursSpan.textContent = total.toFixed(1);
    }

    // ===============================
    // DELETE ROW
    // ===============================
    function attachDeleteEvents() {
        tableBody.querySelectorAll(".icon-btn.danger").forEach(btn => {
            btn.onclick = () => {
                btn.closest("tr").remove();
                calculateTotalHours();
            };
        });
    }

    // ===============================
    // ADD NEW ROW
    // ===============================
    addRowBtn.addEventListener("click", () => {

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
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

        tableBody.appendChild(newRow);
        attachDeleteEvents();
        calculateTotalHours();
    });

    // ===============================
    // LIVE HOURS UPDATE
    // ===============================
    tableBody.addEventListener("input", (e) => {
        if (e.target.type === "number") {
            calculateTotalHours();
        }
    });

    // ===============================
    // SAVE & SUBMIT (DEMO)
    // ===============================
    document.querySelector(".btn.success").addEventListener("click", () => {
        alert("Timesheet saved as draft 🟡");
    });

    document.querySelector(".btn.primary").addEventListener("click", () => {
        if (confirm("Submit timesheet for manager approval?")) {
            alert("Timesheet submitted successfully ✅");
        }
    });

    // ===============================
    // INIT
    // ===============================
    attachDeleteEvents();
    calculateTotalHours();

});
