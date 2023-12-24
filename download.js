document.addEventListener("DOMContentLoaded", function () {
    // Select both download buttons
    const downloadButtons = document.querySelectorAll('#download-button-future-de, #download-button-future-en');

    // Attach click event listener to both buttons
    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Fetch the favorite list
            const favoriteListFuture = document.querySelector('.favorite-list-future');
            const items = favoriteListFuture.querySelectorAll('label');
            let dataToDownload = '';

            // Compile data from the favorite list
            items.forEach(function (item) {
                dataToDownload += item.textContent + '\n'; // Appending each item's text
            });

            // Check for data and initiate download
            if (dataToDownload) {
                download(dataToDownload, 'favorite-list-future.txt', 'text/plain');
            } else {
                alert('No items in the favorite list to download.');
            }
        });
    });

    // Function to create and download a file
    function download(data, filename, type) {
        const file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) {
            // IE10+ support
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            // Other browsers
            const a = document.createElement('a'),
                  url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Initialize and validate inputs, and other setup code for Present Value
    // (Insert your initialization and setup code for Present Value here)

    // Event listeners and logic for the Present Value calculations
    // (Insert your event listeners and logic for Present Value calculations here)

    // Download functionality for the Present Value section
    const downloadButtonsPresent = document.querySelectorAll('#download-button-present-de, #download-button-present-en');
    downloadButtonsPresent.forEach(button => {
        button.addEventListener('click', function () {
            const favoriteListPresent = document.querySelector('.favorite-list-present');
            const items = favoriteListPresent.querySelectorAll('label');
            let dataToDownload = '';

            items.forEach(function (item) {
                dataToDownload += item.textContent + '\n';
            });

            if (dataToDownload) {
                download(dataToDownload, 'favorite-list-present.txt', 'text/plain');
            } else {
                alert('No items in the favorite list to download.');
            }
        });
    });

    function download(data, filename, type) {
        const file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            const a = document.createElement('a'),
                  url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    // Additional code for Present Value (if any)
    // (Insert any additional JavaScript code for Present Value here)
});


document.addEventListener("DOMContentLoaded", function () {

    // Event listener for download buttons
    const downloadButtonsCurrency = document.querySelectorAll('#download-button-currency-de, #download-button-currency-en');
    downloadButtonsCurrency.forEach(button => {
        button.addEventListener('click', function () {
            const favoriteListCurrency = document.querySelector('.favorite-list-currency');
            const items = favoriteListCurrency.querySelectorAll('label');
            let dataToDownload = '';
  
            items.forEach(function (item) {
                dataToDownload += item.textContent + '\n';
            });
  
            if (dataToDownload) {
                download(dataToDownload, 'favorite-list-currency.txt', 'text/plain');
            } else {
                alert('No items in the favorite list to download.');
            }
        });
    });
  
    function download(data, filename, type) {
        const file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            const a = document.createElement('a'),
                  url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    
  });
  