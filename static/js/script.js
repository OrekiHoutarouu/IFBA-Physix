let counter = 0
let chart = null
let all_springs_data = []

function add_spring() {
    counter++
    
    const springs_div = document.querySelector("#springs")
    const fieldset = document.createElement("fieldset")
    const fieldset_legend = document.createElement("legend")
    const warning = document.createElement("p")

    fieldset.dataset.spring_id = String(counter)
    fieldset_legend.innerText = `Mola ${counter}`
    
    fieldset.appendChild(fieldset_legend)
    springs_div.appendChild(fieldset)
    
    for (let c = 1; c < 7; c++) {
        const measurement = document.createElement("input")
        const label = document.createElement("label")
        const br = document.createElement("br")
        
        label.innerText = `Medição ${c} em metro`
        measurement.classList.add("measurement_input")
        
        fieldset.appendChild(measurement)
        fieldset.appendChild(label)
        fieldset.appendChild(br)
    }
    
    const submit_button = document.createElement("input")
    
    submit_button.type = "submit"
    submit_button.value = "Enviar"
    submit_button.classList.add("submit_button")
    submit_button.onclick = function() {
        check_filled_out_measurements(submit_button, warning)
    }
    
    fieldset.appendChild(submit_button)
    fieldset.appendChild(warning)
}


function check_filled_out_measurements(submit_button, warning) {
    const fieldset = submit_button.closest("fieldset")
    const inputs = fieldset.querySelectorAll(".measurement_input")
    
    let measurements = []
    let filled = true
    
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            filled = false
        } else if (isNaN(parseFloat(input.value.trim()))) {
            filled = false
        } else {
            measurements.push(parseFloat(input.value.trim()))
        }
    })

    if (!filled) {
        warning.innerText = "Por favor, preencha todos os campos com números antes de enviar"
        warning.style.color = "red"
    } else {
        let total = 0
        for (let measurement in measurements){
            total += measurements[measurement]
        }
        
        let rest_length = total / 6
        
        warning.innerText = `Dados enviados com sucesso, comprimento médio de ${(rest_length).toFixed(4)}m`
        warning.style.color = "green"
        
        const p = document.createElement("p")
        p.innerText = "Agora adicione uma massa à ponta da mola e a nova medição, repita isso 6 vezes, adicionando massas diferentes cada vez"
        fieldset.appendChild(p)
        
        for (let c = 0; c < 6; c++) {
            add_mass(fieldset)
        }
        
        add_submit_button(fieldset)
        add_delete_button(fieldset)
    }
}


function add_mass(fieldset) {
    const inner_fieldset = document.createElement("fieldset")
    inner_fieldset.classList.add("inner_fieldset")
    
    const added_mass = document.createElement("input")
    const new_measurement = document.createElement("input")
    const label_mass = document.createElement("label")
    const label_new_measurement = document.createElement("label")
    const br_1 = document.createElement("br")
    const br_2 = document.createElement("br")
    
    added_mass.classList.add("mass_input")
    new_measurement.classList.add("new_measurement_input")
    label_mass.innerText = "Massa em Kg"
    label_new_measurement.innerText = "Nova medição em metro"
    
    inner_fieldset.appendChild(added_mass)
    inner_fieldset.appendChild(label_mass)
    inner_fieldset.appendChild(br_1)
    inner_fieldset.appendChild(new_measurement)
    inner_fieldset.appendChild(label_new_measurement)
    inner_fieldset.appendChild(br_2)
    fieldset.appendChild(inner_fieldset)

}


function add_submit_button(fieldset) {
    const warning = document.createElement("p")
    const submit_button = document.createElement("input")
    
    submit_button.type = "submit"
    submit_button.value = "Enviar"
    submit_button.classList.add("submit_button")
    submit_button.onclick = function() {
        check_filled_out_mass(fieldset, warning)
    }
    
    fieldset.appendChild(submit_button)
    fieldset.appendChild(warning)
}


function check_filled_out_mass(fieldset, warning) {
    const mass_inputs = document.querySelectorAll(".mass_input")
    const new_measurement_input = document.querySelectorAll(".new_measurement_input")
    let filled = true
    
    mass_inputs.forEach(input => {
        if (input.value.trim() === "") {
            filled = false
        } else if (isNaN(parseFloat(input.value.trim()))) {
            filled = false
        }
    })
    
    new_measurement_input.forEach(input => {
        if (input.value.trim() === "") {
            filled = false
        } else if (isNaN(parseFloat(input.value.trim()))) {
            filled = false
        }
    })
    
    if (!filled) {
        warning.innerText = "Por favor, preencha todos os campos com números antes de enviar"
        warning.style.color = "red"
    } else {
        const data = calculate_spring_data(fieldset)
        const spring_id = parseInt(fieldset.dataset.spring_id)

        const existing_index = all_springs_data.findIndex(item => item.spring_id === spring_id)
        if (existing_index >= 0) {
            all_springs_data[existing_index] = {spring_id, data}
        } else {
            all_springs_data.push({spring_id, data})
        }

        plot_spring_graph()
        
        warning.innerText = `Dados enviados com sucesso`
        warning.style.color = "green"
    }
}


function add_delete_button(fieldset) {
    const delete_button = document.createElement("input")
    
    delete_button.type = "button"
    delete_button.value = "Deletar"
    delete_button.classList.add("delete_button")
    delete_button.onclick = function() {
        delete_spring(delete_button)
    } 
    
    fieldset.appendChild(delete_button)
}


function delete_spring(delete_button) {
    const fieldset = delete_button.closest("fieldset")
    const spring_id = parseInt(fieldset.dataset.spring_id || '-1', 10)

    all_springs_data = all_springs_data.filter(item => item.spring_id !== spring_id);

    fieldset.remove();
    plot_spring_graph();
}


function calculate_spring_data(fieldset) {
    const initial_measurements = fieldset.querySelectorAll(".measurement_input")
    let total = 0

    initial_measurements.forEach(input => {
        total += parseFloat(input.value.trim())        
    });
    
    const rest_length = total / 6

    const mass_inputs = fieldset.querySelectorAll(".mass_input")
    const new_measurements = fieldset.querySelectorAll(".new_measurement_input")

    const gravitational_acceleration = 9.81
    let data = []

    for (let c = 0; c < mass_inputs.length; c++) {
        const mass = parseFloat(mass_inputs[c].value)
        const final_length = parseFloat(new_measurements[c].value)
        const displacement = final_length - rest_length
        const weight_force = mass * gravitational_acceleration
        const elastic_constant = weight_force / displacement

        data.push({
            mass: mass,
            final_length: final_length,
            displacement: displacement,
            weight_force: weight_force,
            elastic_constant: elastic_constant,
        })
    }
    return data
}


function plot_spring_graph() {
    console.log("ALL SPRINGS DATA:", JSON.stringify(all_springs_data, null, 2));
    const canvas = document.getElementById('spring_graph');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const datasets = [];

    all_springs_data.forEach((spring_entry, idx) => {
        const spring_id = spring_entry.spring_id;

        // filtra pontos válidos
        const points = spring_entry.data
            .map(p => ({
                x: parseFloat(p.displacement),
                y: parseFloat(p.weight_force)
            }))
            .filter(p => !isNaN(p.x) && !isNaN(p.y))
            .sort((a, b) => a.x - b.x); // ordena pelo deslocamento

        if (points.length === 0) return; // ignora se não há dados válidos

        // dataset de pontos reais
        datasets.push({
            label: `Mola ${spring_id} (pontos)`,
            data: points,
            showLine: false,
            pointRadius: 4,
            borderColor: get_color(idx),
            backgroundColor: get_color(idx, 0.8),
        });

        // calcular ajuste linear
        const fit = linear_fit(points);

        // pontos da reta de ajuste
        const min_x = points[0].x;
        const max_x = points[points.length - 1].x;
        const fit_points = [
            { x: min_x, y: fit.slope * min_x + fit.intercept },
            { x: max_x, y: fit.slope * max_x + fit.intercept }
        ];

        datasets.push({
            label: `Ajuste Mola ${spring_id} — k=${fit.slope.toFixed(2)} N/m`,
            data: fit_points,
            type: 'line', // força Chart.js a desenhar linha
            fill: false,
            borderColor: get_color(idx),
            backgroundColor: get_color(idx, 0.2),
            pointRadius: 0,
            borderDash: [6, 4],
        });
    });

    // recria gráfico
    if (chart) {
        chart.destroy();
        chart = null;
    }

    chart = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Força (N) × Deslocamento (m)' },
                tooltip: { mode: 'nearest', intersect: true }
            },
            scales: {
                x: { title: { display: true, text: 'Deslocamento (m)' } },
                y: { title: { display: true, text: 'Força (N)' } }
            }
        }
    });
}


function get_color(index, alpha = 1) {
  const palette = [
    `rgba(255, 99, 132, ${alpha})`,
    `rgba(54, 162, 235, ${alpha})`,
    `rgba(75, 192, 192, ${alpha})`,
    `rgba(255, 206, 86, ${alpha})`,
    `rgba(153, 102, 255, ${alpha})`,
    `rgba(255, 159, 64, ${alpha})`,
  ];
  return palette[index % palette.length];
}

// regressão linear simples (y = slope * x + intercept) - mínimos quadrados
function linear_fit(points) {
  const n = points.length;
  if (n === 0) return { slope: 0, intercept: 0 };

  let sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0;
  points.forEach(p => {
    sum_x += p.x;
    sum_y += p.y;
    sum_xy += p.x * p.y;
    sum_xx += p.x * p.x;
  });

  const denom = n * sum_xx - sum_x * sum_x;
  if (Math.abs(denom) < 1e-12) {
    // caso degenerado (todos os x iguais) — tenta forçar intercept = 0
    const slope = sum_x !== 0 ? (sum_y / sum_x) : 0;
    return { slope: slope, intercept: 0 };
  }

  const slope = (n * sum_xy - sum_x * sum_y) / denom;
  const intercept = (sum_y - slope * sum_x) / n;
  return { slope, intercept };
}