let counter = 0

function add_spring() {
    counter++
    
    const springs_div = document.querySelector("#springs")
    const fieldset = document.createElement("fieldset")
    const fieldset_legend = document.createElement("legend")
    const warning = document.createElement("p")
    
    fieldset_legend.innerText = `Mola ${counter}`
    
    fieldset.appendChild(fieldset_legend)
    springs_div.appendChild(fieldset)
    
    for (let c = 1; c < 7; c++) {
        const measurement = document.createElement("input")
        const label = document.createElement("label")
        const br = document.createElement("br")
        
        label.innerText = `Medição ${c} em metro`
        measurement.classList.add("measurement_input")
        
        fieldset.append(measurement)
        fieldset.append(label)
        fieldset.append(br)
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
        
        let average = total / 6
        
        warning.innerText = `Dados enviados com sucesso, comprimento médio de ${(average).toFixed(2)}m`
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
        check_filled_out_mass(warning)
    }
    
    fieldset.appendChild(submit_button)
    fieldset.appendChild(warning)
}


function check_filled_out_mass(warning) {
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
    
    fieldset.remove()
}