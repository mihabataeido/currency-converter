const keys = [
  "Aruba", "Afghanistan", "Angola", "Albania", "United Arab Emirates", "Argentina", "Armenia", "Antigua and Barbuda", 
  "Australia", "Austria", "Azerbaijan", "Burundi", "Belgium", "Benin", "Burkina Faso", "Bangladesh", "Bulgaria", 
  "Bahrain", "Bahamas, The", "Bosnia and Herzegovina", "Belarus", "Belize", "Bolivia", "Brazil", "Barbados", 
  "Brunei Darussalam", "Bhutan", "Botswana", "Central African Republic", "Canada", "Switzerland", "Chile", "China", 
  "Côte d'Ivoire", "Cameroon", "Congo, Dem. Rep.", "Congo, Rep.", "Colombia", "Comoros", "Cabo Verde", "Costa Rica", 
  "Curacao", "Cayman Islands", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Dominica", "Denmark", 
  "Dominican Republic", "Algeria", "Ecuador", "Egypt, Arab Rep.", "Eritrea", "Spain", "Estonia", "Ethiopia", "Finland", 
  "Fiji", "France", "Micronesia, Fed. Sts.", "Gabon", "United Kingdom", "Georgia", "Ghana", "Guinea", 
  "Gambia, The", "Guinea-Bissau", "Equatorial Guinea", "Greece", "Grenada", "Guatemala", "Guyana", 
  "Hong Kong SAR, China", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "India", "Ireland", 
  "Iran, Islamic Rep.", "Iraq", "Iceland", "Israel", "Italy", "Jamaica", "Jordan", "Japan", "Kazakhstan", 
  "Kenya", "Kyrgyz Republic", "Cambodia", "Kiribati", "St. Kitts and Nevis", "Korea, Rep.", "Kuwait", "Lao PDR", 
  "Lebanon", "Liberia", "Libya", "St. Lucia", "Liechtenstein", "Sri Lanka", "Lesotho", "Lithuania", "Luxembourg", 
  "Latvia", "Macao SAR, China", "Morocco", "Moldova", "Madagascar", "Maldives", "Mexico", "Marshall Islands", 
  "Macedonia, FYR", "Mali", "Malta", "Myanmar", "Montenegro", "Mongolia", "Mozambique", "Mauritania", "Montserratit", 
  "Martinique", "Mauritius", "Malawi", "Malaysia", "Namibia", "New Caledonia", "Niger", "Nigeria", "Nicaragua", 
  "Niue", "Netherlands", "Norway", "Nepal", "Nauru", "New Zealand", "Oman", "Pakistan", "Panama", "Peru", 
  "Philippines", "Palau", "Papua New Guinea", "Poland", "Puerto Rico", "Portugal", "Paraguay", "West Bank and Gaza", 
  "Qatar", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Sudan", "Senegal", "Singapore", "Saint Helena", 
  "Solomon Islands", "Sierra Leone", "El Salvador", "San Marino", "Serbia", "South Sudan", "São Tomé and Principe", 
  "Suriname", "Slovak Republic", "Slovenia", "Sweden", "Swaziland", "Seychelles", "Syrian Arab Republic", 
  "Turks and Caicos Islands", "Chad", "Togo", "Thailand", "Tajikistan", "Turkmenistan", "Timor-Leste", "Tonga", 
  "Trinidad and Tobago", "Tunisia", "Turkey", "Tuvalu", "Tanzania", "Uganda", "Ukraine", "Uruguay", "United States", 
  "Uzbekistan", "St. Vincent and the Grenadines", "Venezuela, RB", "British Virgin Islands", "Vietnam", "Vanuatu", 
  "Samoa", "Kosovo", "Yemen, Rep.", "South Africa", "Zambia", "Zimbabwe"
];

const values = [
  5.5, NaN, 23.8, 6.7, 4.8, 72.4, 8.6, 7.5, 6.6, 8.5, 13.9, 18.8, 9.6, 1.4, 14.3, 7.7, 15.3, 3.6, 5.6, 14.0, 15.2, 6.3, 
  1.7, 9.3, 9.4, 3.7, 5.6, 11.7, 5.6, 6.8, 2.8, 11.6, 2.0, 5.3, 6.2, 9.0, 3.0, 10.2, 12.0, 8.0, 8.3, NaN, 8.2, 8.4, 15.1, 
  6.9, 5.2, 7.5, 7.7, 8.8, 9.3, 3.5, 13.9, 7.4, 8.4, 19.4, 34.0, 7.1, 4.5, 5.2, 5.4, 4.2, 7.9, 11.9, 31.3, 10.5, 11.5, 9.4, 
  4.8, 9.6, 2.7, 6.9, 6.0, 1.9, 9.1, 10.8, 34.0, 14.6, 4.2, 5.9, 7.8, 36.2, 5.0, 8.3, 4.4, 8.2, 10.3, 4.2, 2.5, 14.4, 7.7, 
  13.9, 5.3, 5.3, 2.7, 5.1, 4.1, 23.0, 189.4, 7.6, 4.5, 6.4, 8.4, 44.9, 8.3, 19.7, 6.3, 17.3, 1.0, 6.7, 28.7, 8.2, 2.3, 7.9, 
  6.2, 14.2, 9.8, 6.2, 16.2, 13.0, 15.1, 10.3, 9.5, 7.7, 29.1, 10.8, 21.0, 3.4, 6.1, NaN, 4.2, 18.5, 10.5, NaN, 10.0, 5.8, 
  7.6, 2.6, 7.2, 2.8, 19.9, 2.9, 8.3, 5.8, 12.4, 5.3, 14.3, 4.3, 7.8, 9.8, 3.7, 5.0, 13.8, 11.5, 17.7, 2.5, 138.8, 9.7, 6.1, 
  9.4, 5.5, 27.2, 7.2, 7.1, 12.0, -6.7, 18.0, 52.4, 12.8, 8.8, 8.4, 4.8, 2.6, NaN, NaN, 5.8, 8.0, 6.1, 6.6, 11.5, 7.0, 11.0, 
  5.5, 8.3, 72.3, 11.5, 4.4, 7.2, 20.2, 9.1, 8.0, 11.4, 5.7, 200.9, NaN, 3.2, 4.6, 11.0, 11.7, 29.1, 7.0, 11.0, 104.7
];

// Creating an array of objects with keys and values
const dataArray = keys.map((key, index) => ({ country: key, value: values[index] }));

console.log(dataArray);

