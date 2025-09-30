function truncateDecimals(number, digits) {
const factor = Math.pow(10, digits);
return Math.floor(number * factor) / factor;
}

document.addEventListener('DOMContentLoaded', function() {

  // ===================
  // MENU & OVERLAY 
  // ===================
  const dotsButton = document.getElementById('dotsBtn');
  const dotsMenu   = document.getElementById('dotsMenu');
  dotsButton.addEventListener('click', function(e) {
    e.stopPropagation();
    dotsMenu.style.display = (dotsMenu.style.display === 'block') ? 'none' : 'block';
  });
  document.addEventListener('click', function(e) {
    if (!dotsButton.contains(e.target) && !dotsMenu.contains(e.target)) {
      dotsMenu.style.display = 'none';
    }
  });


  // ABOUT overlay
  const aboutMenuItem = document.getElementById('aboutMenuItem');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutModalBtn = document.getElementById('closeAboutModal');
  aboutMenuItem.addEventListener('click', function(e) {
    e.stopPropagation();
    aboutModal.style.display = 'block';
  });
  closeAboutModalBtn.addEventListener('click', function() {
    aboutModal.style.display = 'none';
  });
  
  
 // INSTRUCTION overlay
  const instructionsMenuItem = document.getElementById('instructionMenuItem');
const instructionsModal = document.getElementById('instructionsModal');
const closeinstructionsModalBtn = document.getElementById('closeinstructionsModal');

instructionsMenuItem.addEventListener('click', function(e) {
  e.stopPropagation();
  instructionsModal.style.display = 'block';
});

closeinstructionsModalBtn.addEventListener('click', function() {
  instructionsModal.style.display = 'none';
});
  
  
  // License overlay
document.getElementById('licenseMenuItem').addEventListener('click', function() {
    document.getElementById('licenseModal').style.display = 'block';
});

document.getElementById('closeLicenseModal').addEventListener('click', function() {
    document.getElementById('licenseModal').style.display = 'none';
});

// Close this overlay by clicking out of it
window.addEventListener('click', function(event) {
    let licenseModal = document.getElementById('licenseModal');
    if (event.target === licenseModal) {
        licenseModal.style.display = 'none';
    }
});
  

  // CONTACT overlay
  const contactMenuItem = document.getElementById('contactMenuItem');
  const contactModal = document.getElementById('contactModal');
  const closeContactModalBtn = document.getElementById('closeContactModal');
  contactMenuItem.addEventListener('click', function(e) {
    e.stopPropagation();
    contactModal.style.display = 'block';
  });
  closeContactModalBtn.addEventListener('click', function() {
    contactModal.style.display = 'none';
  });


  // SETTINGS overlay
  const settingsMenuItem = dotsMenu.querySelector('.menu-item:nth-child(1)');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsModalBtn = document.getElementById('closeSettingsModal');
  const saveSettingsBtn = document.getElementById('saveSettings');
  settingsMenuItem.addEventListener('click', function(e) {
    e.stopPropagation();
    settingsModal.style.display = 'block';
  });
  closeSettingsModalBtn.addEventListener('click', function () {
    settingsModal.style.display = 'none';
  });
  saveSettingsBtn.addEventListener('click', function () {
    const inputName = document.getElementById('hospitalName').value.trim();
    if (inputName) {
      localStorage.setItem('hospitalName', inputName);
      alert(`Hospital Name saved as: ${inputName}`);
    } else {
      alert('Please enter a valid hospital name.');
      return;
    }
    const biformulaSwitch = document.getElementById('biformula_pdf').checked;
    localStorage.setItem('biformula_pdf', biformulaSwitch ? 'true' : 'false');
    const longDecayTable = document.getElementById('longDecayTable').checked;
    localStorage.setItem('longDecayTable', longDecayTable ? 'true' : 'false');
    const shortTableSwitch = document.getElementById('shortDecayTable').checked;
    localStorage.setItem('shortDecayTable', shortTableSwitch ? 'true' : 'false');
    const thysafeSwitch = document.getElementById('thysafe').checked;
    localStorage.setItem('thysafe', thysafeSwitch ? 'true' : 'false');
    const prevTherSwitch = document.getElementById('previoustherapies').checked;
    localStorage.setItem('previoustherapies', prevTherSwitch ? 'true' : 'false');

    alert('Settings saved!');
    settingsModal.style.display = 'none';
  });


  // ============================
  // PATIENT DATA OVERLAY
  // ============================
  const openBtn  = document.getElementById('openCFModal');
  const closeBtn = document.getElementById('closeCFModal');
  const cfModalEl= document.getElementById('cfModal');
  openBtn.addEventListener('click', function() {
    cfModalEl.style.display = 'block';
  });
  closeBtn.addEventListener('click', function() {
    const cfName    = document.getElementById('cfName').value.trim();
    const cfSurname = document.getElementById('cfSurname').value.trim();
    const cfSex     = document.getElementById('cfSex').value.trim();
    const cfDate    = document.getElementById('cfDate').value.trim();
    if (cfName && cfSurname && cfSex && cfDate) {
      openBtn.style.backgroundColor = "#4CAF50";
    } else {
      openBtn.style.backgroundColor = "#b4b4b4f8";
    }
    cfModalEl.style.display = 'none';
  });


  // PREVIOUS TREATMENTS
  const addTreatmentBtn = document.getElementById('addTreatment');
  const treatmentList = document.getElementById('treatmentList');
  const cumulativeInput = document.getElementById('cumulative');

  function updateCumulative() {
    let total = 0;
    const doseInputs = treatmentList.querySelectorAll('input[type="number"]');
    doseInputs.forEach(input => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) total += value;
    });
    cumulativeInput.value = total.toFixed(2);
  }

  function addTreatment() {
    const treatmentDiv = document.createElement('div');
    treatmentDiv.className = 'treatment-entry';

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date:';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.required = true;

    const doseLabel = document.createElement('label');
    doseLabel.textContent = 'Dose (mCi):';
    const doseInput = document.createElement('input');
    doseInput.type = 'number';
    doseInput.placeholder = 'mCi';
    doseInput.step = 'any';
    doseInput.min = '0';
    doseInput.required = true;
    doseInput.addEventListener('input', updateCumulative);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.type = 'button';
    removeBtn.addEventListener('click', function() {
      treatmentList.removeChild(treatmentDiv);
      updateCumulative();
    });

    treatmentDiv.appendChild(dateLabel);
    treatmentDiv.appendChild(dateInput);
    treatmentDiv.appendChild(doseLabel);
    treatmentDiv.appendChild(doseInput);
    treatmentDiv.appendChild(removeBtn);
    treatmentList.appendChild(treatmentDiv);
    updateCumulative();
  }

  if (addTreatmentBtn) {
    addTreatmentBtn.addEventListener('click', function(e) {
      e.preventDefault();
      addTreatment();
    });
  }

  // Set default datetime
  var currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);
  var formattedDate = currentDate.toISOString().slice(0, 16);
  document.querySelectorAll('.datetime-input').forEach(function(input) {
    input.value = formattedDate;
  });


  // ============================
  // EXTRA DATA POINT - MEASUREMENTS 
  // ============================
  const extraRealMeasContainer = document.getElementById('extraRealMeasurementsContainer');
  const addExtraMeasBtn        = document.getElementById('addExtraMeasBtn');

  addExtraMeasBtn.addEventListener('click', function(e){
    e.preventDefault();
    addExtraRealMeasurementRow();
  });

  function addExtraRealMeasurementRow() {
  const wrap = document.createElement('div');
  wrap.className = 'extra-measure-entry';

  wrap.innerHTML =
    '<label>Datetime: </label>' +
    '<input type="datetime-local" class="extraRealDate" style="margin-right:6px;">' +
    '<label> </label>' +
    '<input type="number" step="any" class="extraRealValue" placeholder="Set activity value" style="margin-right:6px;">' +
    '<button type="button" class="remove-measure-btn">X</button>';

  const dtInput = wrap.querySelector('.extraRealDate');
  dtInput.value = new Date().toISOString().slice(0,16);

  const removeBtn = wrap.querySelector('.remove-measure-btn');
  removeBtn.addEventListener('click', function(){
    extraRealMeasContainer.removeChild(wrap);
    updateAllCalculations();
  });
  extraRealMeasContainer.appendChild(wrap);

  const allInputs = wrap.querySelectorAll('input');
  allInputs.forEach(inp => {
    inp.addEventListener('input', updateAllCalculations);
    inp.addEventListener('change', updateAllCalculations);
  });
}


  function getAllRealMeasurements() {
    const arr = [];
    // t1
    const t1DateVal = document.getElementById('initialDate').value;
    const t1Val = parseFloat(document.getElementById('initialRadioactivity').value);
    if (t1DateVal && !isNaN(t1Val)) {
      const d = new Date(t1DateVal);
      if (!isNaN(d.getTime())) {
        arr.push({ date: d, value: t1Val });
      }
    }
    // t2
    const t2DateVal = document.getElementById('secondDate').value;
    const t2Val = parseFloat(document.getElementById('remainingRadioactivity').value);
    if (t2DateVal && !isNaN(t2Val)) {
      const d = new Date(t2DateVal);
      if (!isNaN(d.getTime())) {
        arr.push({ date: d, value: t2Val });
      }
    }
    // t3
    const t3DateVal = document.getElementById('realmeasure_date1').value;
    const t3Val = parseFloat(document.getElementById('effective1m').value);
    if (t3DateVal && !isNaN(t3Val)) {
      const d = new Date(t3DateVal);
      if (!isNaN(d.getTime())) {
        arr.push({ date: d, value: t3Val });
      }
    }
    // Extra
    const extraRows = extraRealMeasContainer.querySelectorAll('.extra-measure-entry');
    extraRows.forEach(row => {
      const dt = row.querySelector('.extraRealDate').value;
      const val= parseFloat(row.querySelector('.extraRealValue').value);
      if (dt && !isNaN(val)) {
        const d = new Date(dt);
        if (!isNaN(d.getTime())) {
          arr.push({ date: d, value: val });
        }
      }
    });
    arr.sort((a,b) => a.date - b.date);
    return arr;
  }


  // ============================
  // UPDATE CALCULATION 
  // ============================
  const inputsToMonitor = [
    'initialRadioactivity', 
    'remainingRadioactivity', 
    'effective1m',
    'initialDate',
    'secondDate',
    'realmeasure_date1',
    'mci',
    'nfactor'
  ];
  inputsToMonitor.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateAllCalculations);
      el.addEventListener('change', updateAllCalculations);
    }
  });

  function calculateTimeElapsed(startDate, endDate) {
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
    const diffMs = endDate - startDate;
    return diffMs / (1000 * 3600);
  }


  function updateAllCalculations() {
  // Tempo base t1->t2->t3
  const t1DateVal = document.getElementById('initialDate').value;
  const t2DateVal = document.getElementById('secondDate').value;
  const t3DateVal = document.getElementById('realmeasure_date1').value;
  const t1Date = new Date(t1DateVal);
  const t2Date = new Date(t2DateVal);
  const t3Date = new Date(t3DateVal);

  const dt_12 = calculateTimeElapsed(t1Date, t2Date);
  document.getElementById('tempo_trascorso').value = dt_12;
  const dt_23 = calculateTimeElapsed(t2Date, t3Date);
  document.getElementById('second_to_realmeasure1').value = dt_23;

  const realMeas = getAllRealMeasurements();

  if (realMeas.length >= 2) {
    const firstDate = realMeas[0].date;
    const lastDate = realMeas[realMeas.length - 1].date;
    const dt_firstLast = calculateTimeElapsed(firstDate, lastDate);
    document.getElementById('first_to_realmeasure1').value = dt_firstLast;
  } else {
    document.getElementById('first_to_realmeasure1').value = '';
  }

  // Mono-exponential
  const A0 = parseFloat(document.getElementById('initialRadioactivity').value) || 0;
  const A1 = parseFloat(document.getElementById('remainingRadioactivity').value) || 0;
  const A2 = parseFloat(document.getElementById('effective1m').value) || 0;
  const nFactor = parseFloat(document.getElementById('nfactor').value) || 1;

  let lambda_12 = 0;
  if (A0 > 0 && A1 > 0 && dt_12 > 0) {
    lambda_12 = Math.log(A0 / A1) / dt_12;
    document.getElementById('lambda').value = lambda_12;
    const hl_12 = Math.log(2) / lambda_12;
    document.getElementById('halfLife').value = hl_12;
    const halfLife_h = hl_12 * nFactor;
    document.getElementById('halfLifeh').value = halfLife_h;
  } else {
    document.getElementById('lambda').value = '';
    document.getElementById('halfLife').value = '';
    document.getElementById('halfLifeh').value = '';
  }

  let lambda_23 = 0;
  if (A1 > 0 && A2 > 0 && dt_23 > 0) {
    lambda_23 = Math.log(A1 / A2) / dt_23;
    document.getElementById('lambda2').value = lambda_23;
    const hl_23 = Math.log(2) / lambda_23;
    document.getElementById('halflife2').value = hl_23;
  } else {
    document.getElementById('lambda2').value = '';
    document.getElementById('halflife2').value = '';
  }

  // Calcolate λ_tot and t1/2_tot by using all measurement (first ↔ last)
  if (realMeas.length >= 2) {
    const firstVal = realMeas[0].value;
    const lastVal  = realMeas[realMeas.length - 1].value;
    const tFirst   = realMeas[0].date.getTime();
    const tLast    = realMeas[realMeas.length - 1].date.getTime();
    const dt_hours = (tLast - tFirst) / (1000 * 3600);

    if (firstVal > 0 && lastVal > 0 && dt_hours > 0) {
      const lambdaTot = Math.log(firstVal / lastVal) / dt_hours;
      document.getElementById('lambdatot').value = lambdaTot;
      const hl_tot = Math.log(2) / lambdaTot;
      document.getElementById('halflifetot').value = hl_tot;
    } else {
      document.getElementById('lambdatot').value = '';
      document.getElementById('halflifetot').value = '';
    }
  } else {
    document.getElementById('lambdatot').value = '';
    document.getElementById('halflifetot').value = '';
  }

  // Populate table, limits, comparation, formula piecewise, etc.
autoPopulateDecayTable(); // Mono-exponential
autoPopulateDecayTable3();// Multi-segmented
  findHypotheticalLimits();
  findRealLimits();
  compareHypoReal();
  updatePiecewiseFormula();
  updateFormula();
}


  // ======================
// 5) TABLE BASED ON MONO-EXPONENTIAL (updated using explicit lambda)
// ======================
function autoPopulateDecayTable() {
  const A0 = parseFloat(document.getElementById('initialRadioactivity').value) || 0;
  const A1 = parseFloat(document.getElementById('remainingRadioactivity').value) || 0;
  const halfLife = parseFloat(document.getElementById('halfLife').value) || 0;
  const halfLifeh = parseFloat(document.getElementById('halfLifeh').value) || 0;
  const dt = parseFloat(document.getElementById('tempo_trascorso').value) || 0;
  const selectedMci = parseFloat(document.getElementById('mci').value) || 0;

  const tableBody = document.getElementById('decayTable').querySelector('tbody');
  tableBody.innerHTML = '';
  if (!A0 || !A1 || !halfLife) return;

  // Calcolo di lambda esplicito
  const lambda_12 = Math.log(2) / halfLife;
  const lambda_h = Math.log(2) / halfLifeh;

  let time = 0, step = 1;
  let keepLoop = true;
  while (keepLoop) {
    let R;
    if (time <= dt) {
      R = A0 * Math.exp(-lambda_12 * time);
    } else {
      let timeFirst = dt;
      let timeSecond = time - dt;
      R = A0 
        * Math.exp(-lambda_12 * timeFirst)
        * Math.exp(-lambda_h * timeSecond);
    }
    const rMci = (R * selectedMci / A0);
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = time;
    newRow.insertCell(1).textContent = truncateDecimals(R, 3);
    newRow.insertCell(2).textContent = selectedMci;
    newRow.insertCell(3).textContent = A0;
    newRow.insertCell(4).textContent = rMci.toFixed(2);

    if (R < 0.1 || time > 500) {
      keepLoop = false;
    }
    time += step;
  }
}


  // ================================
  // TABLE BASED ON MULTI-EXPONENTIAL
  // ================================
  function autoPopulateDecayTable3() {
  const tableBody = document.getElementById('decayTable3').querySelector('tbody');
  tableBody.innerHTML = '';

  const realMeas = getAllRealMeasurements();
  if (realMeas.length < 2) return;

  if (realMeas.length === 3) {


generateRealDecayTable_3points(tableBody)

  } else {
    generateRealDecayTable_piecewise_lambda(tableBody);
  }
}

function generateRealDecayTable_3points(tableBody) {
  const A0 = parseFloat(document.getElementById('initialRadioactivity').value) || 0;
  const lambda1 = parseFloat(document.getElementById('lambda').value) || 0;
  const lambda2 = parseFloat(document.getElementById('lambda2').value) || 0;
  const dt = parseFloat(document.getElementById('tempo_trascorso').value) || 0;
  const dt2 = parseFloat(document.getElementById('second_to_realmeasure1').value) || 0;
  const selectedMci = parseFloat(document.getElementById('mci').value) || 0;

  if (!A0 || !lambda1 || !lambda2) return;

  let time = 0, step = 1;
  let continuePop = true;
  while (continuePop) {
    let R;
    if (time <= dt) {
      R = A0 * Math.exp(-lambda1 * time);
    } else {
      const firstPart = dt;
      const secondPart = time - dt;
      R = A0 * Math.exp(-lambda1 * firstPart) * Math.exp(-lambda2 * secondPart);
    }

    const rMci = (R * selectedMci / A0);
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = time;
    row.insertCell(1).textContent = truncateDecimals(R, 3);
    row.insertCell(2).textContent = selectedMci;
    row.insertCell(3).textContent = A0;
    row.insertCell(4).textContent = rMci.toFixed(2);

    if (R < 0.1 || time > 500) {
      continuePop = false;
    }
    time += step;
  }
}


function generateRealDecayTable_piecewise_lambda(tableBody) {
  const realMeas = getAllRealMeasurements();
  if (realMeas.length < 2) return;

  const A0 = realMeas[0].value;
  let time = 0, step = 1;
  let keepLoop = true;

  while (keepLoop) {
    const R = getPiecewiseRealValueAt_lambda(time, realMeas);
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = time;
    row.insertCell(1).textContent = truncateDecimals(R, 3);

    const selectedMci = parseFloat(document.getElementById('mci').value) || 0;
    row.insertCell(2).textContent = selectedMci;
    row.insertCell(3).textContent = A0;
    const rMci = (R * selectedMci / A0);
    row.insertCell(4).textContent = rMci.toFixed(2);

    if (R < 0.1 || time > 500) {
      keepLoop = false;
    }
    time += step;
  }
}

function getPiecewiseRealValueAt_lambda(timeInH, realMeas) {
  const baseTime = realMeas[0].date.getTime();
  const queryMs = baseTime + timeInH * 3600 * 1000;

  let iFound = -1;
  for (let i = 0; i < realMeas.length - 1; i++) {
    const t_i = realMeas[i].date.getTime();
    const t_next = realMeas[i + 1].date.getTime();
    if (t_i <= queryMs && queryMs < t_next) {
      iFound = i;
      break;
    }
  }

  if (iFound < 0) {
    const t1 = realMeas[0].date.getTime();
    if (queryMs < t1) return realMeas[0].value;
    iFound = realMeas.length - 2;
    if (iFound < 0) return realMeas[0].value;
  }

  const t_i = realMeas[iFound].date.getTime();
  const A_i = realMeas[iFound].value;
  const t_next = realMeas[iFound + 1].date.getTime();
  const A_next = realMeas[iFound + 1].value;

  const dt_hours = (t_next - t_i) / (1000 * 3600);
  const lambda = Math.log(A_i / A_next) / dt_hours;
  const elapsed = (queryMs - t_i) / (1000 * 3600);

  return A_i * Math.exp(-lambda * elapsed);
}

  // =========================
  // FORMULA PIECEWISE
  // =========================
  
  function updatePiecewiseFormula() {
    const biformulaEl = document.getElementById('biformula');
    if (!biformulaEl) return;

    const realMeas = getAllRealMeasurements();
    if (realMeas.length < 2) {
      biformulaEl.value = "";
      return;
    }

   
    let lines = [];
    lines.push("Piecewise formula for Multi-exponential Decay:\n");

    for (let i=0; i<realMeas.length-1; i++){
      const t_i   = realMeas[i].date;
      const A_i   = realMeas[i].value;
      const t_next= realMeas[i+1].date;
      const A_next= realMeas[i+1].value;
      const dt_hours = (t_next - t_i)/(1000*3600);

      const lam_i = Math.log(A_i / A_next)/dt_hours;
      
      const timeLabel_i   = t_i.toISOString().slice(0,16);   // t_i in stringa
      const timeLabel_i1  = t_next.toISOString().slice(0,16);

      // EXAMPLE:
      // "A_i * exp[-lam_i * (t - t_i)],   for t_i <= t < t_(i+1)"
      let line = `Interval ${i+1}:\n  from ${timeLabel_i} to ${timeLabel_i1}:\n`;
      line    += `  R(t) = ${A_i.toFixed(8)} * exp[-(${lam_i.toFixed(12)})*(t - t_i)]\n`;

      lines.push(line);
    }

    biformulaEl.value = lines.join("\n");
  }


  // =========================
  // LIMITS & AUC
  // =========================
  function calculateAreaUnderCurve(points) {
    let area = 0;
    for (let i=1; i<points.length; i++){
      const base1 = points[i-1][0];
      const base2 = points[i][0];
      const h1 = points[i-1][1];
      const h2 = points[i][1];
      area += 0.5 * (base2 - base1) * (h1 + h2);
    }
    return area;
  }

document.getElementById('threshold').addEventListener('input', findHypotheticalLimits);

  function findHypotheticalLimits() {
  const tableRows = document.querySelectorAll('#decayTable tbody tr');
  if (!tableRows.length) return;
  
  //Read threshold or use 30 as default 
  
  const thresholdInput = document.getElementById('threshold').value;
  const userThreshold = parseFloat(thresholdInput);
  const effectiveThreshold = !isNaN(userThreshold) ? userThreshold : 30;
  
  let foundThreshold = false, found16 = false;
  
  for (let i = 0; i < tableRows.length; i++){
    const decVal = parseFloat(tableRows[i].cells[1].textContent);
    const mciVal = parseFloat(tableRows[i].cells[4].textContent);
    const time   = parseFloat(tableRows[i].cells[0].textContent);
    
    if (!foundThreshold && decVal <= effectiveThreshold) {
      document.getElementById('valore1').value = time;
      foundThreshold = true;
    }
    if (!found16 && mciVal <= 16) {
      document.getElementById('valore2').value = time;
      found16 = true;
    }
    if (foundThreshold && found16) break;
  }


  // Calcolate area
  let pointsDecay = [];
  for (let i=0; i<tableRows.length; i++){
    const t = parseFloat(tableRows[i].cells[0].textContent);
    const d = parseFloat(tableRows[i].cells[1].textContent);
    pointsDecay.push([t, d]);
  }
  let aucDecay = calculateAreaUnderCurve(pointsDecay);
  document.getElementById('valore3').value = aucDecay.toFixed(3);
}  

function findRealLimits() {
  const tableRows = document.querySelectorAll('#decayTable3 tbody tr');
  if (!tableRows.length) return;
  
  
  const thresholdInput = document.getElementById('threshold').value;
  const userThreshold = parseFloat(thresholdInput);
  const effectiveThreshold = !isNaN(userThreshold) ? userThreshold : 30;
  
  let foundThreshold = false, found16 = false;
  
  for (let i = 0; i < tableRows.length; i++) {
    const decVal = parseFloat(tableRows[i].cells[1].textContent);
    const mciVal = parseFloat(tableRows[i].cells[4].textContent);
    const time   = parseFloat(tableRows[i].cells[0].textContent);
    
    if (!foundThreshold && decVal <= effectiveThreshold) {
      document.getElementById('real_limit_msv').value = time.toFixed(3);
      foundThreshold = true;
    }
    if (!found16 && mciVal <= 16) {
      document.getElementById('real_limit_mci').value = time.toFixed(3);
      found16 = true;
    }
    if (foundThreshold && found16) break;
  }
  
   document.getElementById('threshold').addEventListener('input', function() {
  findRealLimits();
});

  // Calcolate area
  let pointsDecay=[];
  for (let i=0; i<tableRows.length; i++){
    const t = parseFloat(tableRows[i].cells[0].textContent);
    const d = parseFloat(tableRows[i].cells[1].textContent);
    pointsDecay.push([t,d]);
  }
  let aucDecay = calculateAreaUnderCurve(pointsDecay);
  document.getElementById('valore4').value = aucDecay.toFixed(3);
}  


// =========================
// COMPARE HYPO/MONOEX TO REAL/MULTISEGM
// =========================
function compareHypoReal() {
  const val1 = parseFloat(document.getElementById('valore1').value) || 0;
  const val2 = parseFloat(document.getElementById('valore2').value) || 0;
  const realMsv= parseFloat(document.getElementById('real_limit_msv').value) || 0;
  const realMci= parseFloat(document.getElementById('real_limit_mci').value) || 0;

  const diff1 = (val1 - realMsv).toFixed(3);
  document.getElementById('difference1m').value = diff1;
  let perc1=0;
  if (realMsv) perc1 = ((val1 - realMsv)/realMsv)*100;
  document.getElementById('difference1m_perc').value = perc1.toFixed(3);

  const diff2 = (val2 - realMci).toFixed(3);
  document.getElementById('difference2m').value = diff2;
  let perc2=0;
  if (realMci) perc2 = ((val2 - realMci)/realMci)*100;
  document.getElementById('difference2m_perc').value = perc2.toFixed(3);

  const v3 = parseFloat(document.getElementById('valore3').value) || 0;
  const v4 = parseFloat(document.getElementById('valore4').value) || 0;
  const diffAUC = (v3 - v4).toFixed(3);
  document.getElementById('valore5').value = diffAUC;
  let percAUC=0;
  if (v4) percAUC = ((v3 - v4)/v4)*100;
  document.getElementById('valore6').value = percAUC.toFixed(3);
}  


  // =========================
  // SHOW/HIDE
  // =========================
  function toggleContainer(btnId, containerId) {
    const btn = document.getElementById(btnId);
    const c   = document.getElementById(containerId);
    btn.addEventListener('click', function() {
      const currentDisplay = window.getComputedStyle(c).display;
      c.style.display = (currentDisplay === 'none') ? 'block' : 'none';
    });
  }
  toggleContainer('more_data', 'innerinputContainer');
  toggleContainer('more_data2', 'innerinputContainer2');
  toggleContainer('hypodata', 'innerinputContainer4');
  toggleContainer('realdata', 'innerinputContainer5');
  toggleContainer('HvsReal', 'innerinputContainer6');


  const btnHypothetical    = document.getElementById('populate_button');
  const tableHypothetical  = document.getElementById('decayTable');
  btnHypothetical.addEventListener('click', function() {
    if (tableHypothetical.style.display==='' || tableHypothetical.style.display==='none'){
      tableHypothetical.style.display='table';
    } else {
      tableHypothetical.style.display='none';
    }
  });

  
  const btnReal            = document.getElementById('populate_button2');
  const tableReal          = document.getElementById('decayTable3');
  btnReal.addEventListener('click', function() {
    if (tableReal.style.display==='' || tableReal.style.display==='none'){
      tableReal.style.display='table';
    } else {
      tableReal.style.display='none';
    }
  });


  // =========================
  // PLOT 
  // =========================
  let isTAC1Visible = false;
document.getElementById('tac').addEventListener('click', function() {
  const plotDiv = document.getElementById('plot');
  if (!isTAC1Visible) {
    plotDiv.style.display = 'block';
    generateDecayPlot();
    isTAC1Visible = true;
  } else {
    plotDiv.style.display = 'none';
    isTAC1Visible = false;
  }
});

let isTAC2Visible = false;
document.getElementById('tac2').addEventListener('click', function() {
  const thirdDiv = document.getElementById('thirdPlot');
  if (!isTAC2Visible) {
    thirdDiv.style.display = 'block';
    generateThirdPlot();
    isTAC2Visible = true;
  } else {
    thirdDiv.style.display = 'none';
    isTAC2Visible = false;
  }
});

  
  function generateDecayPlot() {
    const rows = document.querySelectorAll('#decayTable tbody tr');
    let time=[], decay=[];
    rows.forEach(r=>{
      time.push(parseFloat(r.cells[0].textContent));
      decay.push(parseFloat(r.cells[1].textContent));
    });
    const trace = { x:time, y:decay, type:'scatter', mode:'lines', line:{color:'#4077ff'} };
    const layout= { 
      xaxis:{title:'Time (h)'}, 
      yaxis:{title:'Decay (μSv)'},
      margin:{l:50, r:50, b:50, t:15}, 
      height:250
    };
    Plotly.newPlot('plot', [trace], layout, {displayModeBar:false});
  }

  
  function generateThirdPlot() {
    const rows1 = document.querySelectorAll('#decayTable tbody tr');
    let t1=[], d1=[];
    rows1.forEach(r=>{
      t1.push(parseFloat(r.cells[0].textContent));
      d1.push(parseFloat(r.cells[1].textContent));
    });

    const rows2 = document.querySelectorAll('#decayTable3 tbody tr');
    let t2=[], d2=[];
    rows2.forEach(r=>{
      t2.push(parseFloat(r.cells[0].textContent));
      d2.push(parseFloat(r.cells[1].textContent));
    });

    // **Punti dei dati di misurazione reale**
    const realMeas = getAllRealMeasurements();
    let realTimes = [], realDecay = [];
    realMeas.forEach(m => {
        let baseTime = realMeas[0].date.getTime();
        let currentTime = (m.date.getTime() - baseTime) / (1000 * 3600);
        realTimes.push(currentTime);
        realDecay.push(m.value);
    });

    const trace1 = { x:t1, y:d1, name:'Mono-exponential', type:'scatter', mode:'lines', line:{color:'#4077ff'}};
    const trace2 = { x:t2, y:d2, name:'Multi-segmented', type:'scatter', mode:'lines', line:{color:'#ffa500'}};
    
    // **GRAY DOT**
    const trace3 = {
        x: realTimes,
        y: realDecay,
        name: 'Measurements',
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'gray', size: 8 }
    };

    const layout = {
        xaxis:{title:'Time (h)'},
        yaxis:{title:'Decay (μSv)'},
        margin:{l:50, r:50, b:50, t:15},
        height:250,
        legend:{ x:0.6, y:1, orientation:'h' }
    };

    Plotly.newPlot('thirdPlot', [trace1, trace2, trace3], layout, {displayModeBar:false});
}


  // =========================
  // THYSAFE
  // =========================
  document.getElementById('ThySAFE').addEventListener('click', function() {
    document.getElementById('thySAFEModal').style.display = 'block';
  });
  document.getElementById('closeThySAFEModal').addEventListener('click', function() {
    document.getElementById('thySAFEModal').style.display = 'none';
    const doseRate1 = document.getElementById('doseRate1').value;
    const hoursPassed1 = document.getElementById('hoursPassed1').value;
    const doseRate2 = document.getElementById('doseRate2').value;
    const hoursPassed2 = document.getElementById('hoursPassed2').value;
    if (doseRate1 && hoursPassed1 && doseRate2 && hoursPassed2) {
      document.getElementById('ThySAFE').style.backgroundColor = '#4CAF50';
    } else {
      document.getElementById('ThySAFE').style.backgroundColor = '#111111';
    }
  });

  function populateSelect(selectElement, start, end, step, isFloat=false) {
    selectElement.innerHTML = '<option value="" selected disabled></option>';
    for (let i=start; i<=end; i+=step) {
      const option = document.createElement('option');
      option.value = isFloat ? i.toFixed(1) : i;
      option.textContent = isFloat ? i.toFixed(1) : i;
      selectElement.appendChild(option);
    }
  }
  document.getElementById('ThySAFE').addEventListener('click', function() {
    populateSelect(document.getElementById("doseRate1"), 0.1, 8, 0.1, true);
    populateSelect(document.getElementById("doseRate2"), 0.1, 8, 0.1, true);
    populateSelect(document.getElementById("hoursPassed1"), 24, 120, 24);
    populateSelect(document.getElementById("hoursPassed2"), 24, 120, 24);
    document.getElementById('thySAFEModal').style.display = 'block';
  });

  document.getElementById('calcForm1').addEventListener('submit', function(e){
    e.preventDefault();
    calculateDays(1);
  });
  document.getElementById('calcForm2').addEventListener('submit', function(e){
    e.preventDefault();
    calculateDays(2);
  });
  function calculateDays(formNumber) {
    const doseRate = parseFloat(document.getElementById("doseRate"+formNumber).value);
    const hoursPassed = parseInt(document.getElementById("hoursPassed"+formNumber).value);
    if (isNaN(doseRate) || isNaN(hoursPassed)) {
      document.getElementById("result"+formNumber).innerText = "Please select values.";
      return;
    }
    let daysToSuspend;
    const rules = {
      1: { // adult
        "0-2": [
          { minHours:120, days:13 }, { minHours:96, days:10 },
          { minHours:72, days:6 },   { minHours:48, days:2 },
          { minHours:24, days:2 }
        ],
        "2-4": [
          { minHours:120, days:18 }, { minHours:96, days:15 },
          { minHours:72, days:11 },  { minHours:48, days:5 },
          { minHours:24, days:3 }
        ],
        "4-6": [
          { minHours:120, days:21 }, { minHours:96, days:18 },
          { minHours:72, days:14 },  { minHours:48, days:8 },
          { minHours:24, days:4 }
        ],
        "6-8": [
          { minHours:120, days:23 }, { minHours:96, days:20 },
          { minHours:72, days:16 },  { minHours:48, days:10 },
          { minHours:24, days:5 }
        ]
      },
      2: { // child
        "<2": [
          { minHours:120, days:16 }, { minHours:96, days:13 },
          { minHours:72, days:9 },   { minHours:48, days:4 },
          { minHours:24, days:4 }
        ],
        "2-4": [
          { minHours:120, days:21 }, { minHours:96, days:18 },
          { minHours:72, days:14 },  { minHours:48, days:9 },
          { minHours:24, days:4 }
        ],
        "4-6": [
          { minHours:120, days:24 }, { minHours:96, days:21 },
          { minHours:72, days:17 },  { minHours:48, days:11 },
          { minHours:24, days:6 }
        ],
        "6-8": [
          { minHours:120, days:26 }, { minHours:96, days:23 },
          { minHours:72, days:19 },  { minHours:48, days:14 },
          { minHours:24, days:8 }
        ]
      }
    };
    let doseKey;
    if (formNumber===1) {
      if (doseRate<=2) {
        doseKey="0-2";
      } else if (doseRate>2 && doseRate<=4){
        doseKey="2-4";
      } else if (doseRate>4 && doseRate<=6){
        doseKey="4-6";
      } else if (doseRate>6 && doseRate<=8){
        doseKey="6-8";
      } else {
        document.getElementById("result"+formNumber).innerText = "Dose rate out of range.";
        return;
      }
    } else {
      if (doseRate<=2) {
        doseKey="<2";
      } else if (doseRate>2 && doseRate<=4){
        doseKey="2-4";
      } else if (doseRate>4 && doseRate<=6){
        doseKey="4-6";
      } else if (doseRate>6 && doseRate<=8){
        doseKey="6-8";
      } else {
        document.getElementById("result"+formNumber).innerText = "Dose rate out of range.";
        return;
      }
    }
    const formRules = rules[formNumber][doseKey];
    for (let rule of formRules) {
      if (hoursPassed >= rule.minHours) {
        daysToSuspend = rule.days;
        break;
      }
    }
    if (daysToSuspend===undefined) {
      daysToSuspend="Undefined for those hours.";
    }
    document.getElementById("result"+formNumber).innerText = daysToSuspend;
  }


// =========================================
// Export REPORT PDF
// =========================================

// ========== BOTTON PDF ==========
document.getElementById('report_pdf').addEventListener('click', function() {
  
  const reportDate = document.getElementById('reportDate').value.trim();
  const hospital = localStorage.getItem('hospitalName') || "Default Hospital Name";
  const cfName = document.getElementById('cfName')?.value.trim() || "";
  const cfSurname = document.getElementById('cfSurname')?.value.trim() || "";
  const cfDate = document.getElementById('cfDate')?.value.trim() || "";
  let patientData = "Anonymous";
  if (cfName || cfSurname || cfDate) {
    patientData = `Name: ${cfName}\nSurname: ${cfSurname}\nDOB: ${cfDate}`;
  }

  const therapy = document.getElementById('mci')?.value || "-";
  const cumulative = parseFloat(document.getElementById('cumulative').value.trim()) || parseFloat(therapy) || 0;
  const t1value = document.getElementById('initialRadioactivity')?.value || "-";
  const t1date  = document.getElementById('initialDate')?.value || "-";
  const t2value = document.getElementById('remainingRadioactivity')?.value || "-";
  const t2date  = document.getElementById('secondDate')?.value || "-";
  const t3value = document.getElementById('effective1m')?.value || "-";
  const t3date  = document.getElementById('realmeasure_date1')?.value || "-";
  const below30 = document.getElementById('real_limit_msv')?.value || "N/A";

  const isFormulaEnabled    = localStorage.getItem('biformula_pdf') === 'true';
  const isLongTableEnabled  = localStorage.getItem('longDecayTable') === 'true';
  const isShortTableEnabled = localStorage.getItem('shortDecayTable') === 'true';
  const isThysafeEnabled    = localStorage.getItem('thysafe') === 'true';
  const isPrevTherEnabled   = localStorage.getItem('previoustherapies') === 'true';


  // -------------------
  // Format PDF
  // -------------------
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
  });


  // Helper
  function printHeader(doc, text, x, y, fontSize = 16) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.text(text, x, y);
    doc.setFont("helvetica", "normal");
  }


  // Data di report
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(reportDate, 500, 40);

  // Institution
  printHeader(doc, hospital, 40, 60, 16);

let lineY = 80;
doc.setLineWidth(1);
doc.setDrawColor(0, 0, 0);
doc.line(40, lineY, 560, lineY);

  let currentY = 110;
  // Patient data
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text('Patient data:', 40, currentY);

  currentY += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(patientData, 40, currentY);

  currentY += 50;

  // Previous Therapies
  const showPreviousTherapies = document.getElementById('previoustherapies').checked;
  if (showPreviousTherapies) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Previous Treatments:', 40, currentY);
    currentY += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const treatmentEntries = document.querySelectorAll('#treatmentList .treatment-entry');
    let treatmentData = [];
    treatmentEntries.forEach(entry => {
      const dateInput = entry.querySelector('input[type="date"]');
      const doseInput = entry.querySelector('input[type="number"]');
      const treatmentDate = dateInput ? dateInput.value : "";
      const treatmentDose = doseInput ? doseInput.value : "";
      if (treatmentDate && treatmentDose) {
        treatmentData.push([treatmentDate, `${treatmentDose} mCi`]);
      }
    });

    if (treatmentData.length > 0) {
      doc.autoTable({
        startY: currentY,
        head: [["Date", "Dose (mCi)"]],
        body: treatmentData,
        theme: 'grid',
        styles: { fontSize: 10 },
        didDrawPage: function (data) {
          currentY = data.cursor.y + 20; 
        }
      });
    } else {
      doc.text("(None)", 40, currentY);
      currentY += 20;
    }

    // Therapy & Cumulative
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Therapy:', 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${therapy} mCi`, 120, currentY);

    currentY += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Cumulative Dose:', 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let therapyValue = parseFloat(therapy) || 0;
    let totalCumulative = cumulative + therapyValue;
    doc.text(`${totalCumulative} mCi`, 150, currentY);

    currentY += 30;

  } else {
    // Solo Therapy
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Therapy:', 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${therapy} mCi`, 120, currentY);
    currentY += 30;
  }

  // Measurements
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text('Measurements:', 40, currentY);
  currentY += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`(t1) = ${t1value} uSv/h, DateTime: ${t1date}`, 40, currentY);
  currentY += 15;
  doc.text(`(t2) = ${t2value} uSv/h, DateTime: ${t2date}`, 40, currentY);
  currentY += 15;
  doc.text(`(t3) = ${t3value} uSv/h, DateTime: ${t3date}`, 40, currentY);
  currentY += 30;

  doc.setFont("helvetica", "bold");
  doc.text(`Measurement dropped below 30 µSv/h after: ${below30} h`, 40, currentY);
  currentY += 30;

  // Days of Restriction
  if (isThysafeEnabled) {
    const daysRestrictionAdult = document.getElementById('result1').innerText || "N/A";
    const daysRestrictionChildren = document.getElementById('result2').innerText || "N/A";

    doc.setFont("helvetica", "bold");
    doc.text('Days of restriction from adult:', 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(daysRestrictionAdult, 230, currentY);

    currentY += 20;
    doc.setFont("helvetica", "bold");
    doc.text('Days of restriction from children:', 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(daysRestrictionChildren, 230, currentY);

    currentY += 40;
  }

  // Graphic
  Plotly.toImage('thirdPlot', { format: 'png', width: 600, height: 400 })
    .then(function (dataUrl) {

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text('Decay Curve:', 40, currentY);
      currentY += 20;

      doc.addImage(dataUrl, 'PNG', 40, currentY, 400, 250);
      currentY += 270;

      
      // --- Create New Page for decaytable ---
    doc.addPage();
    let newPageStartY = 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Decay Table:', 40, newPageStartY);
    newPageStartY += 20;

    
    if (isLongTableEnabled) {
      doc.setFont("helvetica", "normal");
      generateLongDecayTable(doc, newPageStartY);
      currentY = doc.lastAutoTable.finalY + 20;
    } else if (isShortTableEnabled) {
      doc.setFont("helvetica", "normal");
      generateShortDecayTable(doc, newPageStartY);
      currentY = doc.lastAutoTable.finalY + 20;
    }

   
if (isFormulaEnabled) {
  let formulaText = document.getElementById("biformula").value.trim();
  if (formulaText) {
    
    let textLines = doc.splitTextToSize(formulaText, 500);
    
    let requiredHeight = 20 + (textLines.length * 12) + 20; // 20 per titolo, 20 per spazio dopo il testo
    let pageHeight = doc.internal.pageSize.height;
    
   
    if (currentY + requiredHeight > pageHeight - 40) {
      doc.addPage();
      currentY = 40; // si inizia dalla parte alta della nuova pagina
    }
    
    doc.setFont("helvetica", "bold");
    doc.text('Decay Formula:', 40, currentY);
    currentY += 20;

    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(textLines, 40, currentY);
    currentY += (textLines.length * 12) + 20;
  }
}


// FOOTER REPORT PDF
const totalPages = doc.getNumberOfPages();
doc.setPage(totalPages);
doc.setLineWidth(1);
doc.setDrawColor(0, 0, 0);
doc.line(40, 770, 560, 770);  // riga orizzontale

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text(
  "Report created with ThyRAD - Thyroid Radioactive Decay Prediction Tool",
  40,
  785
);

      // Save
      doc.save('radioactive_decay_report.pdf');
    })
    .catch(function (err) {
      console.error("Errore nella conversione Plotly->immagine:", err);
      alert("Impossibile convertire il grafico thirdPlot in immagine.");
    });
});


// ==============================
// Helper for tables
// ==============================
function generateLongDecayTable(doc, startY) {
  const rows = document.querySelectorAll('#decayTable3 tbody tr');
  let data = [];
  rows.forEach(tr => {
    const cells = tr.querySelectorAll('td');
    data.push([
      cells[0]?.textContent || "",
      cells[1]?.textContent || ""
    ]);
  });
  doc.autoTable({
    startY,
    head: [["Time (h)", "Decay (uSv/h)"]],
    body: data,
    theme: 'grid',
    styles: { fontSize: 10 },
  });
}

function generateShortDecayTable(doc, startY) {
  const rows = document.querySelectorAll('#decayTable3 tbody tr');
  let data = [];
  rows.forEach((tr, index) => {
    if (index % 6 === 0) {
      const cells = tr.querySelectorAll('td');
      data.push([
        cells[0]?.textContent || "",
        cells[1]?.textContent || ""
      ]);
    }
  });
  doc.autoTable({
    startY,
    head: [["Time (h)", "Decay (uSv/h)"]],
    body: data,
    theme: 'grid',
    styles: { fontSize: 10 },
  });
}

 
///////////////////////
// Confidence Interval (CI)
///////////////////////

const formulaTextarea = document.getElementById('predictionModel');

// Aggiungiamo anche l'evento change per il nuovo metodo abtg_cutoff
document.getElementById('abtg_cutoff').addEventListener('change', updateFormula);

// Update confidence interval when Tg, predicted value or abtg changes
document.getElementById('tg').addEventListener('input', updateFormula);
document.getElementById('valore1').addEventListener('input', updateFormula);
document.getElementById('abtg').addEventListener('input', updateFormula);

///////////////////////
// Statistical methods for delta (CI)
///////////////////////
function updateFormula() {
    const hypothesized = parseFloat(document.getElementById('valore1').value) || 0;
    const thStim = parseFloat(document.getElementById('tg').value);
    const abTg = parseFloat(document.getElementById('abtg').value);

    // Stato degli altri metodi:
    const isCutoffActive = document.getElementById('groupComparison_cutoff').checked;
    const isQuartileActive = document.getElementById('groupComparison_quartiles').checked;
    
    const isAbtgCutoffActive = document.getElementById('abtg_cutoff').checked;

    let outputText = `Expected time to drop below 30 μSv/h: ${hypothesized.toFixed(3)}h.\n`;

    
    if (isAbtgCutoffActive) {
        // Deseleziono gli altri metodi
        document.getElementById('groupComparison_cutoff').checked = false;
        document.getElementById('groupComparison_quartiles').checked = false;
        
        
        if (isNaN(thStim)) {
            outputText = "Insufficient data: please enter a valid stimulated Thyroglobulin value.";
        } else if (thStim >= 4.5) {
            outputText = "⚠️ Warning: The abTg Group Comparison (cutoff) method is applicable only when stimulated Thyroglobulin is < 4.5 mg/dl. Please check your input.";
        } else {
            // tg < 4.5: control abTg
            if (isNaN(abTg)) {
                outputText = "Insufficient data: please enter a valid ab-Thyroglobulin value.";
            } else if (abTg < 1.6) {
                outputText += "\nGroup Comparison (abTg cutoff):\n" +
                              "• For stimulated Thyroglobulin < 4.5 mg/dl and abTg < 1.6 mg/dl:\n" +
                              "  - Standard Deviation: 1.5h\n" +
                              "  - 2SD: 3h\n" +
                              "  - Confidence Interval: -0.71h to 0.71h";
            } else { // abTg ≥ 1.6
                outputText += "\nGroup Comparison (abTg cutoff):\n" +
                              "• For stimulated Thyroglobulin < 4.5 mg/dl and abTg ≥ 1.6 mg/dl:\n" +
                              "  - Standard Deviation: 4.8h\n" +
                              "  - 2SD: 9.6h\n" +
                              "  - Confidence Interval: -2h to 2h";
            }
        }
        
        formulaTextarea.value = outputText;
        return;
    }

    
    let abTgWarning = "";
    if (!isNaN(abTg)) {
        if (abTg > 1.6) {
            abTgWarning = "⚠️ Warning for all methods: Statistical models may not be valid due to ab-Thyroglobulin > 1.6 mg/dl.";
        } else {
            abTgWarning = "✅ Since ab-Thyroglobulin ≤ 1.6 mg/dl, statistical methods may be applicable.";
        }
    } else {
        abTgWarning = "⚠️ Warning: If ab-Thyroglobulin > 1.6 mg/dl, statistical models are not valid.";
    }
    outputText += `\n${abTgWarning}\n`;

    ///////////////////////
    // Group Comparison (Cutoff)
    ///////////////////////
    if (isCutoffActive) {
        let sigma, ci;
        if (!isNaN(thStim)) {
            sigma = (thStim <= 4.5) ? 1.24 : 5.8;
            ci = `±${sigma}h`;
        } else {
            ci = "Insufficient data";
        }
        outputText += `\nGroup Comparison (Cutoff Method):\n  - Patients TG ≤ 4.5: CI = ±1.24h\n  - Patients TG > 4.5: CI = ±5.8h\n  - Thyroglobulin Input: ${thStim}\n`;
    }

    ///////////////////////
    // Group Comparison (Quartiles)
    ///////////////////////
    if (isQuartileActive) {
        let sigma, ci;
        if (!isNaN(thStim)) {
            if (thStim <= 0.52) {
                sigma = 0.44;
            } else if (thStim <= 3.65) {
                sigma = 0.54;
            } else if (thStim <= 9.16) {
                sigma = 2.45;
            } else {
                sigma = 8.08;
            }
            ci = `±${sigma}h`;
        } else {
            ci = "Insufficient data";
        }
        outputText += `\nGroup Comparison (Quartiles):\n  - Quartile-based CI = ${ci}\n`;
    }

   
    if (!isCutoffActive && !isQuartileActive) {
        outputText = "⚠️ Prediction may be imprecise. Activate the ThyRAD experimental version in the 'Settings' menu, to display predictions with their confidence intervals (available only when the threshold is set to 30 μSv/h) based on the mono-exponential model and clinical variables (currently, stimulated Tg or ab-Tg).";
    }

    // Output finale
    formulaTextarea.value = outputText;
}


///////////////////////
// Update CI based on TG or prediction method
///////////////////////
document.getElementById('groupComparison_quartiles').addEventListener('change', function(){
    if (this.checked) {
       document.getElementById('abtg_cutoff').checked = false;
    }
    updateFormula();
});

document.getElementById('abtg_cutoff').checked = false;  
updateFormula(); 

updateAllCalculations();
});


///////////////////////
// UNLOCK EXPERIMENTAL PRO FEATURES
///////////////////////

let isProEnabled = false;

function enableProFeatures() {
  isProEnabled = true;
  localStorage.setItem('proEnabled', 'true');  

  // Lista degli elementi da sbloccare
  const proIDs = [
    'openCFModal',
    'hospitalName',
    'reportDate',
    'threshold',
    'previoustherapies',
    'biformula_pdf',
    'thysafe',
    'longDecayTable',
    'shortDecayTable',
    'groupComparison_cutoff',
    'groupComparison_quartiles',
    'abtg_cutoff', 
    'saveSettings', 
  ];
  
  proIDs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('locked');
    }
  });
  
  const thySafeBtn = document.getElementById('ThySAFE');
  if (thySafeBtn) {
    thySafeBtn.classList.remove('locked');
  }

  const reportpdfBtn = document.getElementById('report_pdf');
  if (reportpdfBtn) {
    reportpdfBtn.classList.remove('locked');
  }

   document.querySelectorAll('.pro-option').forEach(opt => {
    opt.classList.remove('locked');
  });

 alert('Pro features unlocked!');
}

   
document.getElementById('proCode').addEventListener('input', function () {
  let code = this.value.trim();
  if (code === "riva11") {
    enableProFeatures();
  }
});

function showOverlay() {
  const overlay = document.getElementById('overlayMessage');
  if (overlay) {
    overlay.style.display = 'block';
  }
}

document.getElementById('closeOverlay').addEventListener('click', function () {
  const overlay = document.getElementById('overlayMessage');
  if (overlay) {
    overlay.style.display = 'none';
  }
});

// Gestione click sui vari elementi
document.getElementById('openCFModal').addEventListener('click', function (e) {
  if (!isProEnabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showOverlay();
    return false;
  }
});

document.getElementById('ThySAFE').addEventListener('click', function (e) {
  if (!isProEnabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showOverlay();
    return false;
  }
});

document.getElementById('report_pdf').addEventListener('click', function (e) {
  if (!isProEnabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showOverlay();
    return false;
  }
});

document.querySelectorAll('input.locked').forEach(input => {
  input.addEventListener('click', function (e) {
    if (!isProEnabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (this.type === 'checkbox') {
        this.checked = false;
      }
      showOverlay();
      return false;
    }
  });
});

if (!isProEnabled) {
  document.querySelectorAll('#settingsModal .pro-option').forEach(opt => {
    if (!opt.contains(document.getElementById('closeSettingsModal'))) {
      opt.classList.add('locked');
    }
  });
}
