function createCheckbox(i) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `conversion-${i}`;
  
    const label = document.createElement("label");
    label.setAttribute("for", `conversion-${i}`);
  
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("width", "24px");
    svg.setAttribute("viewBox", "0 0 24 24");
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z");
  
    svg.appendChild(path);
    label.appendChild(svg);
  
    return { checkbox, label };
  }
  
  function displaySavedConversions() {
    const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
    savedConversionsList.innerHTML = ""; // Leere die vorhandene Liste
  
    if (savedConversions.length > 0) {
        const heading = document.createElement("h3");
        heading.textContent = "Deine Gespeicherten Konvertierungen";
        savedConversionsList.appendChild(heading);
  
        savedConversions.forEach((conversion, i) => {
            const { checkbox, label } = createCheckbox(i);
  
            label.innerHTML += `${conversion.inputAmount} ${conversion.from} = ${conversion.convertedAmount} ${conversion.to}`;
  
            const listItem = document.createElement("li");
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            savedConversionsList.appendChild(listItem);
  
            checkbox.checked = conversion.checked; // Setze den Status basierend auf der gespeicherten Information
  
            checkbox.addEventListener("click", () => {
                updateLocalStorage(savedConversionsList);
            });
        });
  
        savedConversionsList.style.display = "block";
    } else {
        const heading = document.createElement("h3");
        heading.textContent = "Dein Speicherliste ist leer";
        savedConversionsList.appendChild(heading);
  
        savedConversionsList.style.display = "none";
    }
  }

  // neue cod 
  
// function to update localStorage based on checkbox clicks
function updateLocalStorage(list) {
    const savedConversions = [];
    const favoritList = document.querySelector(".Favorit_conversions-list");
  
    list.childNodes.forEach((item) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const label = item.querySelector("label");
  
        if (checkbox && label) {
            savedConversions.push({
                result: label.textContent,
                checked: checkbox.checked
            });
  
            // Überprüfe, ob das Element ausgewählt ist und nicht bereits in der Favoritenliste vorhanden ist
            if (checkbox.checked && !isInFavoritList(label.textContent)) {
                const favoritItem = document.createElement("li");
                const favoritLabel = document.createElement("label");
                favoritLabel.appendChild(document.createTextNode(label.textContent));
                favoritItem.appendChild(favoritLabel);
                favoritList.appendChild(favoritItem);
            } else if (!checkbox.checked && isInFavoritList(label.textContent)) {
                // Wenn das Element nicht ausgewählt ist und in der Favoritenliste vorhanden ist, entferne es
                removeItemFromFavoritList(label.textContent);
            }
        }
    });
  
    localStorage.setItem("savedConversions", JSON.stringify(savedConversions));
  }
  
  // Überprüfe, ob das Element bereits in der Favoritenliste vorhanden ist
  function isInFavoritList(result) {
    const favoritList = document.querySelector(".Favorit_conversions-list");
    const favoritLabels = favoritList.querySelectorAll("label");
  
    for (const favoritLabel of favoritLabels) {
        if (favoritLabel.textContent === result) {
            return true;
        }
    }
  
    return false;
  }
  
  // Entferne das Element aus der Favoritenliste
  function removeItemFromFavoritList(result) {
    const favoritList = document.querySelector(".Favorit_conversions-list");
    const favoritLabels = favoritList.querySelectorAll("label");
  
    for (const favoritLabel of favoritLabels) {
        if (favoritLabel.textContent === result) {
            favoritList.removeChild(favoritLabel.parentElement);
            break;
        }
    }
  }

  
  // css styl 
  /* CSS */
.saved-conversions-list input {
    display: inline-block;
  }
  
  .saved-conversions-list label {
    position: relative;
    cursor: pointer;
    font-size: 19px;
  }
  
  .saved-conversions-list svg {
    fill: #666;
    height: 30px;
    width: 30px;
    vertical-align: middle;
    margin-right: 5px;
    padding-left: 30px;
  }
  
  .saved-conversions-list input:checked + label svg {
    fill: #ffeb49;
  }
  