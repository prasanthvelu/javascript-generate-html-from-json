document.querySelector("#generate").addEventListener("click", function () {
    try {
        const outputHtml = document.querySelector("#outputHtml")
        outputHtml.value = ""
        const inputJsonVal = document.querySelector("#input_json").value
        if (inputJsonVal === "") {
            alert("Please enter JSON")
            return
        }
        const inputJsonParsed = isJSON(inputJsonVal)
        if (!inputJsonParsed) {
            alert("Please enter valid JSON")
            return
        } else {
            const ids = inputJsonParsed.map((curVal) => curVal.id)
            const duplicates = ids.filter((item, index, array) => {
                return (index !== ids.findIndex(item2 => item === item2)) && (array.lastIndexOf(item) === index)
            })
            if (duplicates.length > 0) {
                alert(`The ID ${duplicates} duplicated`)
                return
            }
            const inputJsonMap = inputJsonParsed.map((curVal) => {
                return `<div class="root" data-id=${curVal.id}> <span class="username">${curVal.username}</span> <span class="video_name">${curVal.video_name}</span> <span class="additional_details"> <span class="type">${curVal.action}</span> </span></div> `
            })
            outputHtml.value = inputJsonMap.join('')
        }
    } catch (e) {
        console.log(e)
    }
})

function isJSON(str) {
    try {
        return JSON.parse(str)
    } catch (e) {
        return false
    }
}