/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@shopify/theme-addresses/addressForm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@shopify/theme-addresses/addressForm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AddressForm)\n/* harmony export */ });\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ \"./node_modules/@shopify/theme-addresses/loader.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./node_modules/@shopify/theme-addresses/helpers.js\");\n\n\n\nvar FIELD_REGEXP = /({\\w+})/g;\nvar LINE_DELIMITER = '_';\nvar INPUT_SELECTORS = {\n  lastName: '[name=\"address[last_name]\"]',\n  firstName: '[name=\"address[first_name]\"]',\n  company: '[name=\"address[company]\"]',\n  address1: '[name=\"address[address1]\"]',\n  address2: '[name=\"address[address2]\"]',\n  country: '[name=\"address[country]\"]',\n  zone: '[name=\"address[province]\"]',\n  postalCode: '[name=\"address[zip]\"]',\n  city: '[name=\"address[city]\"]',\n  phone: '[name=\"address[phone]\"]',\n};\n\nfunction AddressForm(rootEl, locale, options) {\n  locale = locale || 'en';\n  options = options || {inputSelectors: {}};\n  var formElements = loadFormElements(\n    rootEl,\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.mergeObjects)(INPUT_SELECTORS, options.inputSelectors)\n  );\n\n  validateElements(formElements);\n\n  return loadShippingCountries(options.shippingCountriesOnly).then(function(\n    shippingCountryCodes\n  ) {\n    return (0,_loader__WEBPACK_IMPORTED_MODULE_0__.loadCountries)(locale).then(function(countries) {\n      init(\n        rootEl,\n        formElements,\n        filterCountries(countries, shippingCountryCodes)\n      );\n    });\n  });\n}\n\n/**\n * Runs when countries have been loaded\n */\nfunction init(rootEl, formElements, countries) {\n  populateCountries(formElements, countries);\n  var selectedCountry = formElements.country.input\n    ? formElements.country.input.value\n    : null;\n  setEventListeners(rootEl, formElements, countries);\n  handleCountryChange(rootEl, formElements, selectedCountry, countries);\n}\n\n/**\n * Handles when a country change: set labels, reorder fields, populate zones\n */\nfunction handleCountryChange(rootEl, formElements, countryCode, countries) {\n  var country = getCountry(countryCode, countries);\n\n  setLabels(formElements, country);\n  reorderFields(rootEl, formElements, country);\n  populateZones(formElements, country);\n}\n\n/**\n * Sets up event listener for country change\n */\nfunction setEventListeners(rootEl, formElements, countries) {\n  formElements.country.input.addEventListener('change', function(event) {\n    handleCountryChange(rootEl, formElements, event.target.value, countries);\n  });\n}\n\n/**\n * Reorder fields in the DOM and add data-attribute to fields given a country\n */\nfunction reorderFields(rootEl, formElements, country) {\n  var formFormat = country.formatting.edit;\n\n  var countryWrapper = formElements.country.wrapper;\n  var afterCountry = false;\n\n  getOrderedField(formFormat).forEach(function(row) {\n    row.forEach(function(line) {\n      formElements[line].wrapper.dataset.lineCount = row.length;\n      if (!formElements[line].wrapper) {\n        return;\n      }\n      if (line === 'country') {\n        afterCountry = true;\n        return;\n      }\n\n      if (afterCountry) {\n        rootEl.append(formElements[line].wrapper);\n      } else {\n        rootEl.insertBefore(formElements[line].wrapper, countryWrapper);\n      }\n    });\n  });\n}\n\n/**\n * Update labels for a given country\n */\nfunction setLabels(formElements, country) {\n  Object.keys(formElements).forEach(function(formElementName) {\n    formElements[formElementName].labels.forEach(function(label) {\n      label.textContent = country.labels[formElementName];\n    });\n  });\n}\n\n/**\n * Add right countries in the dropdown for a given country\n */\nfunction populateCountries(formElements, countries) {\n  var countrySelect = formElements.country.input;\n  var duplicatedCountrySelect = countrySelect.cloneNode(true);\n\n  countries.forEach(function(country) {\n    var optionElement = document.createElement('option');\n    optionElement.value = country.code;\n    optionElement.textContent = country.name;\n    duplicatedCountrySelect.appendChild(optionElement);\n  });\n\n  countrySelect.innerHTML = duplicatedCountrySelect.innerHTML;\n\n  if (countrySelect.dataset.default) {\n    countrySelect.value = countrySelect.dataset.default;\n  }\n}\n\n/**\n * Add right zones in the dropdown for a given country\n */\nfunction populateZones(formElements, country) {\n  var zoneEl = formElements.zone;\n  if (!zoneEl) {\n    return;\n  }\n\n  if (country.zones.length === 0) {\n    zoneEl.wrapper.dataset.ariaHidden = 'true';\n    zoneEl.input.innerHTML = '';\n    return;\n  }\n\n  zoneEl.wrapper.dataset.ariaHidden = 'false';\n\n  var zoneSelect = zoneEl.input;\n  var duplicatedZoneSelect = zoneSelect.cloneNode(true);\n  duplicatedZoneSelect.innerHTML = '';\n\n  country.zones.forEach(function(zone) {\n    var optionElement = document.createElement('option');\n    optionElement.value = zone.code;\n    optionElement.textContent = zone.name;\n    duplicatedZoneSelect.appendChild(optionElement);\n  });\n\n  zoneSelect.innerHTML = duplicatedZoneSelect.innerHTML;\n\n  if (zoneSelect.dataset.default) {\n    zoneSelect.value = zoneSelect.dataset.default;\n  }\n}\n\n/**\n * Will throw if an input or a label is missing from the wrapper\n */\nfunction validateElements(formElements) {\n  Object.keys(formElements).forEach(function(elementKey) {\n    var element = formElements[elementKey].input;\n    var labels = formElements[elementKey].labels;\n\n    if (!element) {\n      return;\n    }\n\n    if (typeof element !== 'object') {\n      throw new TypeError(\n        formElements[elementKey] + ' is missing an input or select.'\n      );\n    } else if (typeof labels !== 'object') {\n      throw new TypeError(formElements[elementKey] + ' is missing a label.');\n    }\n  });\n}\n\n/**\n * Given an countryCode (eg. 'CA'), will return the data of that country\n */\nfunction getCountry(countryCode, countries) {\n  countryCode = countryCode || 'CA';\n  return countries.filter(function(country) {\n    return country.code === countryCode;\n  })[0];\n}\n\n/**\n * Given a format (eg. \"{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{country}{province}{zip}_{phone}\")\n * will return an array of how the form needs to be formatted, eg.:\n * =>\n * [\n *   ['firstName', 'lastName'],\n *   ['company'],\n *   ['address1'],\n *   ['address2'],\n *   ['city'],\n *   ['country', 'province', 'zip'],\n *   ['phone']\n * ]\n */\nfunction getOrderedField(format) {\n  return format.split(LINE_DELIMITER).map(function(fields) {\n    var result = fields.match(FIELD_REGEXP);\n    if (!result) {\n      return [];\n    }\n\n    return result.map(function(fieldName) {\n      var newFieldName = fieldName.replace(/[{}]/g, '');\n\n      switch (newFieldName) {\n        case 'zip':\n          return 'postalCode';\n        case 'province':\n          return 'zone';\n        default:\n          return newFieldName;\n      }\n    });\n  });\n}\n\n/**\n * Given a rootEl where all `input`s, `select`s, and `labels` are nested, it\n * will returns all form elements (wrapper, input and labels) of the form.\n * See `FormElements` type for details\n */\nfunction loadFormElements(rootEl, inputSelectors) {\n  var elements = {};\n  Object.keys(INPUT_SELECTORS).forEach(function(inputKey) {\n    var input = rootEl.querySelector(inputSelectors[inputKey]);\n    elements[inputKey] = input\n      ? {\n          wrapper: input.parentElement,\n          input: input,\n          labels: document.querySelectorAll('[for=\"' + input.id + '\"]'),\n        }\n      : {};\n  });\n\n  return elements;\n}\n\n/**\n * If shippingCountriesOnly is set to true, will return the list of countries the\n * shop ships to. Otherwise returns null.\n */\nfunction loadShippingCountries(shippingCountriesOnly) {\n  if (!shippingCountriesOnly) {\n    // eslint-disable-next-line no-undef\n    return Promise.resolve(null);\n  }\n\n  var response = fetch(location.origin + '/meta.json');\n\n  return response\n    .then(function(res) {\n      return res.json();\n    })\n    .then(function(meta) {\n      // If ships_to_countries has * in the list, it means the shop ships to\n      // all countries\n      return meta.ships_to_countries.indexOf('*') !== -1\n        ? null\n        : meta.ships_to_countries;\n    })\n    .catch(function() {\n      return null;\n    });\n}\n\n/**\n * Only returns countries that are in includedCountryCodes\n * Returns all countries if no includedCountryCodes is passed\n */\nfunction filterCountries(countries, includedCountryCodes) {\n  if (!includedCountryCodes) {\n    return countries;\n  }\n\n  return countries.filter(function(country) {\n    return includedCountryCodes.indexOf(country.code) !== -1;\n  });\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-addresses/addressForm.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-addresses/helpers.js":
/*!**********************************************************!*\
  !*** ./node_modules/@shopify/theme-addresses/helpers.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mergeObjects\": () => (/* binding */ mergeObjects)\n/* harmony export */ });\nfunction mergeObjects() {\n  var to = Object({});\n\n  for (var index = 0; index < arguments.length; index++) {\n    var nextSource = arguments[index];\n\n    if (nextSource) {\n      for (var nextKey in nextSource) {\n        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {\n          to[nextKey] = nextSource[nextKey];\n        }\n      }\n    }\n  }\n  return to;\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-addresses/helpers.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-addresses/loader.js":
/*!*********************************************************!*\
  !*** ./node_modules/@shopify/theme-addresses/loader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SUPPORTED_LOCALES\": () => (/* binding */ SUPPORTED_LOCALES),\n/* harmony export */   \"loadCountries\": () => (/* binding */ loadCountries),\n/* harmony export */   \"toSupportedLocale\": () => (/* binding */ toSupportedLocale)\n/* harmony export */ });\nvar query = \"query countries($locale: SupportedLocale!) {\"\n  + \"  countries(locale: $locale) {\"\n  + \"    name\"\n  + \"    code\"\n  + \"    labels {\"\n  + \"      address1\"\n  + \"      address2\"\n  + \"      city\"\n  + \"      company\"\n  + \"      country\"\n  + \"      firstName\"\n  + \"      lastName\"\n  + \"      phone\"\n  + \"      postalCode\"\n  + \"      zone\"\n  + \"    }\"\n  + \"    formatting {\"\n  + \"      edit\"\n  + \"    }\"\n  + \"    zones {\"\n  + \"      name\"\n  + \"      code\"\n  + \"    }\"\n  + \"  }\"\n  + \"}\";\n\nvar GRAPHQL_ENDPOINT = 'https://country-service.shopifycloud.com/graphql';\n\nfunction loadCountries(locale) {\n  var response = fetch(GRAPHQL_ENDPOINT, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Access-Control-Allow-Origin': '*',\n    },\n    body: JSON.stringify({\n      query: query,\n      operationName: 'countries',\n      variables: {\n        locale: toSupportedLocale(locale),\n      },\n    }),\n  });\n\n  return response\n    .then(function(res) { return res.json() })\n    .then(function(countries) { return countries.data.countries });\n}\n\nvar DEFAULT_LOCALE = 'EN';\nvar SUPPORTED_LOCALES = [\n  'DA',\n  'DE',\n  'EN',\n  'ES',\n  'FR',\n  'IT',\n  'JA',\n  'NL',\n  'PT',\n  'PT_BR',\n];\n\nfunction toSupportedLocale(locale) {\n  var supportedLocale = locale.replace(/-/, '_').toUpperCase();\n\n  if (SUPPORTED_LOCALES.indexOf(supportedLocale) !== -1) {\n    return supportedLocale;\n  } else if (SUPPORTED_LOCALES.indexOf(supportedLocale.substring(0, 2)) !== -1) {\n    return supportedLocale.substring(0, 2);\n  } else {\n    return DEFAULT_LOCALE;\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-addresses/loader.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-addresses/theme-addresses.js":
/*!******************************************************************!*\
  !*** ./node_modules/@shopify/theme-addresses/theme-addresses.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AddressForm\": () => (/* reexport safe */ _addressForm__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _addressForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addressForm */ \"./node_modules/@shopify/theme-addresses/addressForm.js\");\n\n\n\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-addresses/theme-addresses.js?");

/***/ }),

/***/ "./src/js/index/customers.js":
/*!***********************************!*\
  !*** ./src/js/index/customers.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shopify_theme_addresses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-addresses */ \"./node_modules/@shopify/theme-addresses/theme-addresses.js\");\n\nvar selectors = {\n  addressContainer: '[data-address]',\n  addressFields: '[data-address-fields]',\n  addressToggle: '[data-address-toggle]',\n  addressForm: '[data-address-form]',\n  addressDeleteForm: '[data-address-delete-form]'\n};\nvar hideClass = 'hidden';\n\nfunction initializeAddressForm(container) {\n  var addressFields = container.querySelector(selectors.addressFields);\n  var addressForm = container.querySelector(selectors.addressForm);\n  var deleteForm = container.querySelector(selectors.addressDeleteForm);\n  container.querySelectorAll(selectors.addressToggle).forEach(function (button) {\n    button.addEventListener('click', function () {\n      addressForm.classList.toggle(hideClass);\n    });\n  });\n  (0,_shopify_theme_addresses__WEBPACK_IMPORTED_MODULE_0__.AddressForm)(addressFields, 'en');\n\n  if (deleteForm) {\n    deleteForm.addEventListener('submit', function (event) {\n      var confirmMessage = deleteForm.getAttribute('data-confirm-message'); // eslint-disable-next-line no-alert\n\n      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {\n        event.preventDefault();\n      }\n    });\n  }\n}\n\nvar addressForms = document.querySelectorAll(selectors.addressContainer);\n\nif (addressForms.length) {\n  addressForms.forEach(function (addressContainer) {\n    initializeAddressForm(addressContainer);\n  });\n}\n\n//# sourceURL=webpack://shopify-starter-theme/./src/js/index/customers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index/customers.js");
/******/ 	
/******/ })()
;