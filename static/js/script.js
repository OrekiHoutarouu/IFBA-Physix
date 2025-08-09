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
        
        label.innerText = `Medição ${c} (em metro)`
        measurement.classList.add("measurement_input")
        
        fieldset.append(measurement)
        fieldset.append(label)
        fieldset.append(br)
    }
    
    const submit_button = document.createElement("input")
    const delete_button = document.createElement("input")
    
    submit_button.type = "submit"
    submit_button.value = "Enviar"
    submit_button.classList.add("submit_button")
    submit_button.onclick = function() {
        check_filled_out(submit_button, warning)
    }
    
    delete_button.type = "button"
    delete_button.value = "Deletar"
    delete_button.classList.add("delete_button")
    delete_button.onclick = function() {
        delete_spring(delete_button)
    } 
    
    fieldset.appendChild(submit_button)
    fieldset.appendChild(delete_button)
    fieldset.appendChild(warning)
}


function delete_spring(delete_button) {
    const fieldset = delete_button.closest("fieldset")
    
    fieldset.remove()
}


function check_filled_out(submit_button, warning) {
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

        warning.innerText = `Dados enviados com sucesso, comprimento médio de ${(total/6).toFixed(2)}m`
        warning.style.color = "green"
    }
}