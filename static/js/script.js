let counter = 0

function add_spring() {
    counter++

    const springs_div = document.querySelector("#springs")
    const fieldset = document.createElement("fieldset")
    const fieldset_legend = document.createElement("legend")

    fieldset_legend.innerText = `Mola ${counter}`
    
    fieldset.appendChild(fieldset_legend)
    springs_div.appendChild(fieldset)

    for (let c = 1; c < 7; c++) {
        const measurement = document.createElement("input")
        const label = document.createElement("label")
        const br = document.createElement("br")

        label.innerText = `Medição ${c}`
        measurement.classList.add("measurement_input")

        fieldset.append(measurement)
        fieldset.append(label)
        fieldset.append(br)
    }

    const submit_button = document.createElement("input")
    const delete_button = document.createElement("input")

    submit_button.type = "submit"
    submit_button.value = "Enviar"
    submit_button.id = "submit_button"

    delete_button.type = "button"
    delete_button.value = "Deletar"
    delete_button.id = "delete_button"

    fieldset.appendChild(submit_button)
    fieldset.appendChild(delete_button)
}