/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@shopify/theme-cart/request.js":
/*!*****************************************************!*\
  !*** ./node_modules/@shopify/theme-cart/request.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cart\": () => (/* binding */ cart),\n/* harmony export */   \"cartAdd\": () => (/* binding */ cartAdd),\n/* harmony export */   \"cartAddFromForm\": () => (/* binding */ cartAddFromForm),\n/* harmony export */   \"cartChange\": () => (/* binding */ cartChange),\n/* harmony export */   \"cartClear\": () => (/* binding */ cartClear),\n/* harmony export */   \"cartShippingRates\": () => (/* binding */ cartShippingRates),\n/* harmony export */   \"cartUpdate\": () => (/* binding */ cartUpdate)\n/* harmony export */ });\nfunction getDefaultRequestConfig() {\n  return JSON.parse(\n    JSON.stringify({\n      credentials: 'same-origin',\n      headers: {\n        'X-Requested-With': 'XMLHttpRequest',\n        'Content-Type': 'application/json;'\n      }\n    })\n  );\n}\n\nfunction fetchJSON(url, config) {\n  return fetch(url, config).then(function(response) {\n    if (!response.ok) {\n      throw response;\n    }\n    return response.json();\n  });\n}\n\nfunction cart() {\n  return fetchJSON('/cart.js', getDefaultRequestConfig());\n}\n\nfunction cartAdd(id, quantity, properties) {\n  var config = getDefaultRequestConfig();\n\n  config.method = 'POST';\n  config.body = JSON.stringify({\n    id: id,\n    quantity: quantity,\n    properties: properties\n  });\n\n  return fetchJSON('/cart/add.js', config);\n}\n\nfunction cartAddFromForm(formData) {\n  var config = getDefaultRequestConfig();\n  delete config.headers['Content-Type'];\n\n  config.method = 'POST';\n  config.body = formData;\n\n  return fetchJSON('/cart/add.js', config);\n}\n\nfunction cartChange(line, options) {\n  var config = getDefaultRequestConfig();\n\n  options = options || {};\n\n  config.method = 'POST';\n  config.body = JSON.stringify({\n    line: line,\n    quantity: options.quantity,\n    properties: options.properties\n  });\n\n  return fetchJSON('/cart/change.js', config);\n}\n\nfunction cartClear() {\n  var config = getDefaultRequestConfig();\n  config.method = 'POST';\n\n  return fetchJSON('/cart/clear.js', config);\n}\n\nfunction cartUpdate(body) {\n  var config = getDefaultRequestConfig();\n\n  config.method = 'POST';\n  config.body = JSON.stringify(body);\n\n  return fetchJSON('/cart/update.js', config);\n}\n\nfunction cartShippingRates() {\n  return fetchJSON('/cart/shipping_rates.json', getDefaultRequestConfig());\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-cart/request.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-cart/theme-cart.js":
/*!********************************************************!*\
  !*** ./node_modules/@shopify/theme-cart/theme-cart.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addItem\": () => (/* binding */ addItem),\n/* harmony export */   \"addItemFromForm\": () => (/* binding */ addItemFromForm),\n/* harmony export */   \"clearAttributes\": () => (/* binding */ clearAttributes),\n/* harmony export */   \"clearItems\": () => (/* binding */ clearItems),\n/* harmony export */   \"clearNote\": () => (/* binding */ clearNote),\n/* harmony export */   \"getAttributes\": () => (/* binding */ getAttributes),\n/* harmony export */   \"getItem\": () => (/* binding */ getItem),\n/* harmony export */   \"getItemIndex\": () => (/* binding */ getItemIndex),\n/* harmony export */   \"getNote\": () => (/* binding */ getNote),\n/* harmony export */   \"getShippingRates\": () => (/* binding */ getShippingRates),\n/* harmony export */   \"getState\": () => (/* binding */ getState),\n/* harmony export */   \"removeItem\": () => (/* binding */ removeItem),\n/* harmony export */   \"updateAttributes\": () => (/* binding */ updateAttributes),\n/* harmony export */   \"updateItem\": () => (/* binding */ updateItem),\n/* harmony export */   \"updateNote\": () => (/* binding */ updateNote)\n/* harmony export */ });\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ \"./node_modules/@shopify/theme-cart/request.js\");\n/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate */ \"./node_modules/@shopify/theme-cart/validate.js\");\n/**\n * Cart Template Script\n * ------------------------------------------------------------------------------\n * A file that contains scripts highly couple code to the Cart template.\n *\n * @namespace cart\n */\n\n\n\n\n/**\n * Returns the state object of the cart\n * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)\n */\nfunction getState() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cart();\n}\n\n/**\n * Returns the index of the cart line item\n * @param {string} key The unique key of the line item\n * @returns {Promise} Resolves with the index number of the line item\n */\nfunction getItemIndex(key) {\n  _validate__WEBPACK_IMPORTED_MODULE_1__.key(key);\n\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cart().then(function(state) {\n    var index = -1;\n\n    state.items.forEach(function(item, i) {\n      index = item.key === key ? i + 1 : index;\n    });\n\n    if (index === -1) {\n      return Promise.reject(\n        new Error('Theme Cart: Unable to match line item with provided key')\n      );\n    }\n\n    return index;\n  });\n}\n\n/**\n * Fetches the line item object\n * @param {string} key The unique key of the line item\n * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)\n */\nfunction getItem(key) {\n  _validate__WEBPACK_IMPORTED_MODULE_1__.key(key);\n\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cart().then(function(state) {\n    var lineItem = null;\n\n    state.items.forEach(function(item) {\n      lineItem = item.key === key ? item : lineItem;\n    });\n\n    if (lineItem === null) {\n      return Promise.reject(\n        new Error('Theme Cart: Unable to match line item with provided key')\n      );\n    }\n\n    return lineItem;\n  });\n}\n\n/**\n * Add a new line item to the cart\n * @param {number} id The variant's unique ID\n * @param {object} options Optional values to pass to /cart/add.js\n * @param {number} options.quantity The quantity of items to be added to the cart\n * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)\n * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)\n */\nfunction addItem(id, options) {\n  options = options || {};\n\n  _validate__WEBPACK_IMPORTED_MODULE_1__.id(id);\n\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartAdd(id, options.quantity, options.properties);\n}\n\n/**\n * Add a new line item to the cart from a product form\n * @param {object} form DOM element which is equal to the <form> node\n * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)\n */\nfunction addItemFromForm(form) {\n  _validate__WEBPACK_IMPORTED_MODULE_1__.form(form);\n\n  var formData = new FormData(form);\n  _validate__WEBPACK_IMPORTED_MODULE_1__.id(parseInt(formData.get('id'), 10));\n\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartAddFromForm(formData);\n}\n\n/**\n * Changes the quantity and/or properties of an existing line item.\n * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)\n * @param {object} options Optional values to pass to /cart/add.js\n * @param {number} options.quantity The quantity of items to be added to the cart\n * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)\n * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)\n */\nfunction updateItem(key, options) {\n  _validate__WEBPACK_IMPORTED_MODULE_1__.key(key);\n  _validate__WEBPACK_IMPORTED_MODULE_1__.options(options);\n\n  return getItemIndex(key).then(function(line) {\n    return _request__WEBPACK_IMPORTED_MODULE_0__.cartChange(line, options);\n  });\n}\n\n/**\n * Removes a line item from the cart\n * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)\n * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)\n */\nfunction removeItem(key) {\n  _validate__WEBPACK_IMPORTED_MODULE_1__.key(key);\n\n  return getItemIndex(key).then(function(line) {\n    return _request__WEBPACK_IMPORTED_MODULE_0__.cartChange(line, { quantity: 0 });\n  });\n}\n\n/**\n * Sets all quantities of all line items in the cart to zero. This does not remove cart attributes nor the cart note.\n * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)\n */\nfunction clearItems() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartClear();\n}\n\n/**\n * Gets all cart attributes\n * @returns {Promise} Resolves with the cart attributes object\n */\nfunction getAttributes() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cart().then(function(state) {\n    return state.attributes;\n  });\n}\n\n/**\n * Sets all cart attributes\n * @returns {Promise} Resolves with the cart state object\n */\nfunction updateAttributes(attributes) {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartUpdate({ attributes: attributes });\n}\n\n/**\n * Clears all cart attributes\n * @returns {Promise} Resolves with the cart state object\n */\nfunction clearAttributes() {\n  return getAttributes().then(function(attributes) {\n    for (var key in attributes) {\n      attributes[key] = '';\n    }\n    return updateAttributes(attributes);\n  });\n}\n\n/**\n * Gets cart note\n * @returns {Promise} Resolves with the cart note string\n */\nfunction getNote() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cart().then(function(state) {\n    return state.note;\n  });\n}\n\n/**\n * Sets cart note\n * @returns {Promise} Resolves with the cart state object\n */\nfunction updateNote(note) {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartUpdate({ note: note });\n}\n\n/**\n * Clears cart note\n * @returns {Promise} Resolves with the cart state object\n */\nfunction clearNote() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartUpdate({ note: '' });\n}\n\n/**\n * Get estimated shipping rates.\n * @returns {Promise} Resolves with response of /cart/shipping_rates.json (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates)\n */\nfunction getShippingRates() {\n  return _request__WEBPACK_IMPORTED_MODULE_0__.cartShippingRates();\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-cart/theme-cart.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-cart/validate.js":
/*!******************************************************!*\
  !*** ./node_modules/@shopify/theme-cart/validate.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"form\": () => (/* binding */ form),\n/* harmony export */   \"id\": () => (/* binding */ id),\n/* harmony export */   \"key\": () => (/* binding */ key),\n/* harmony export */   \"options\": () => (/* binding */ options),\n/* harmony export */   \"properties\": () => (/* binding */ properties),\n/* harmony export */   \"quantity\": () => (/* binding */ quantity)\n/* harmony export */ });\nfunction key(key) {\n  if (typeof key !== 'string' || key.split(':').length !== 2) {\n    throw new TypeError(\n      'Theme Cart: Provided key value is not a string with the format xxx:xxx'\n    );\n  }\n}\n\nfunction quantity(quantity) {\n  if (typeof quantity !== 'number' || isNaN(quantity)) {\n    throw new TypeError(\n      'Theme Cart: An object which specifies a quantity or properties value is required'\n    );\n  }\n}\n\nfunction id(id) {\n  if (typeof id !== 'number' || isNaN(id)) {\n    throw new TypeError('Theme Cart: Variant ID must be a number');\n  }\n}\n\nfunction properties(properties) {\n  if (typeof properties !== 'object') {\n    throw new TypeError('Theme Cart: Properties must be an object');\n  }\n}\n\nfunction form(form) {\n  if (!(form instanceof HTMLFormElement)) {\n    throw new TypeError('Theme Cart: Form must be an instance of HTMLFormElement');\n  }\n}\n\nfunction options(options) {\n  if (typeof options !== 'object') {\n    throw new TypeError('Theme Cart: Options must be an object');\n  }\n\n  if (\n    typeof options.quantity === 'undefined' &&\n    typeof options.properties === 'undefined'\n  ) {\n    throw new Error(\n      'Theme Cart: You muse define a value for quantity or properties'\n    );\n  }\n\n  if (typeof options.quantity !== 'undefined') {\n    quantity(options.quantity);\n  }\n\n  if (typeof options.properties !== 'undefined') {\n    properties(options.properties);\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-cart/validate.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-currency/currency.js":
/*!**********************************************************!*\
  !*** ./node_modules/@shopify/theme-currency/currency.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formatMoney\": () => (/* binding */ formatMoney)\n/* harmony export */ });\n/**\n * Currency Helpers\n * -----------------------------------------------------------------------------\n * A collection of useful functions that help with currency formatting\n *\n * Current contents\n * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.\n *\n */\n\nconst moneyFormat = '${{amount}}';\n\n/**\n * Format money values based on your shop currency settings\n * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents\n * or 3.00 dollars\n * @param  {String} format - shop money_format setting\n * @return {String} value - formatted value\n */\nfunction formatMoney(cents, format) {\n  if (typeof cents === 'string') {\n    cents = cents.replace('.', '');\n  }\n  let value = '';\n  const placeholderRegex = /\\{\\{\\s*(\\w+)\\s*\\}\\}/;\n  const formatString = format || moneyFormat;\n\n  function formatWithDelimiters(\n    number,\n    precision = 2,\n    thousands = ',',\n    decimal = '.'\n  ) {\n    if (isNaN(number) || number == null) {\n      return 0;\n    }\n\n    number = (number / 100.0).toFixed(precision);\n\n    const parts = number.split('.');\n    const dollarsAmount = parts[0].replace(\n      /(\\d)(?=(\\d\\d\\d)+(?!\\d))/g,\n      `$1${thousands}`\n    );\n    const centsAmount = parts[1] ? decimal + parts[1] : '';\n\n    return dollarsAmount + centsAmount;\n  }\n\n  switch (formatString.match(placeholderRegex)[1]) {\n    case 'amount':\n      value = formatWithDelimiters(cents, 2);\n      break;\n    case 'amount_no_decimals':\n      value = formatWithDelimiters(cents, 0);\n      break;\n    case 'amount_with_comma_separator':\n      value = formatWithDelimiters(cents, 2, '.', ',');\n      break;\n    case 'amount_no_decimals_with_comma_separator':\n      value = formatWithDelimiters(cents, 0, '.', ',');\n      break;\n  }\n\n  return formatString.replace(placeholderRegex, value);\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-currency/currency.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-product-form/listeners.js":
/*!***************************************************************!*\
  !*** ./node_modules/@shopify/theme-product-form/listeners.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Listeners)\n/* harmony export */ });\nfunction Listeners() {\n  this.entries = [];\n}\n\nListeners.prototype.add = function(element, event, fn) {\n  this.entries.push({ element: element, event: event, fn: fn });\n  element.addEventListener(event, fn);\n};\n\nListeners.prototype.removeAll = function() {\n  this.entries = this.entries.filter(function(listener) {\n    listener.element.removeEventListener(listener.event, listener.fn);\n    return false;\n  });\n};\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-product-form/listeners.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-product-form/theme-product-form.js":
/*!************************************************************************!*\
  !*** ./node_modules/@shopify/theme-product-form/theme-product-form.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProductForm\": () => (/* binding */ ProductForm),\n/* harmony export */   \"getUrlWithVariant\": () => (/* binding */ getUrlWithVariant)\n/* harmony export */ });\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listeners */ \"./node_modules/@shopify/theme-product-form/listeners.js\");\n/* harmony import */ var _shopify_theme_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-product */ \"./node_modules/@shopify/theme-product/theme-product.js\");\n\n\n\nvar selectors = {\n  idInput: '[name=\"id\"]',\n  optionInput: '[name^=\"options\"]',\n  quantityInput: '[name=\"quantity\"]',\n  propertyInput: '[name^=\"properties\"]'\n};\n\n// Public Methods\n// -----------------------------------------------------------------------------\n\n/**\n * Returns a URL with a variant ID query parameter. Useful for updating window.history\n * with a new URL based on the currently select product variant.\n * @param {string} url - The URL you wish to append the variant ID to\n * @param {number} id  - The variant ID you wish to append to the URL\n * @returns {string} - The new url which includes the variant ID query parameter\n */\n\nfunction getUrlWithVariant(url, id) {\n  if (/variant=/.test(url)) {\n    return url.replace(/(variant=)[^&]+/, '$1' + id);\n  } else if (/\\?/.test(url)) {\n    return url.concat('&variant=').concat(id);\n  }\n\n  return url.concat('?variant=').concat(id);\n}\n\n/**\n * Constructor class that creates a new instance of a product form controller.\n *\n * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs\n * @param {Object} product - A product object\n * @param {Object} options - Optional options object\n * @param {Function} options.onOptionChange - Callback for whenever an option input changes\n * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes\n * @param {Function} options.onPropertyChange - Callback for whenever a property input changes\n * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted\n */\nfunction ProductForm(element, product, options) {\n  this.element = element;\n  this.product = _validateProductObject(product);\n\n  options = options || {};\n\n  this._listeners = new _listeners__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  this._listeners.add(\n    this.element,\n    'submit',\n    this._onSubmit.bind(this, options)\n  );\n\n  this.optionInputs = this._initInputs(\n    selectors.optionInput,\n    options.onOptionChange\n  );\n\n  this.quantityInputs = this._initInputs(\n    selectors.quantityInput,\n    options.onQuantityChange\n  );\n\n  this.propertyInputs = this._initInputs(\n    selectors.propertyInput,\n    options.onPropertyChange\n  );\n}\n\n/**\n * Cleans up all event handlers that were assigned when the Product Form was constructed.\n * Useful for use when a section needs to be reloaded in the theme editor.\n */\nProductForm.prototype.destroy = function() {\n  this._listeners.removeAll();\n};\n\n/**\n * Getter method which returns the array of currently selected option values\n *\n * @returns {Array} An array of option values\n */\nProductForm.prototype.options = function() {\n  return _serializeOptionValues(this.optionInputs, function(item) {\n    var regex = /(?:^(options\\[))(.*?)(?:\\])/;\n    item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'\n    return item;\n  });\n};\n\n/**\n * Getter method which returns the currently selected variant, or `null` if variant\n * doesn't exist.\n *\n * @returns {Object|null} Variant object\n */\nProductForm.prototype.variant = function() {\n  return (0,_shopify_theme_product__WEBPACK_IMPORTED_MODULE_1__.getVariantFromSerializedArray)(this.product, this.options());\n};\n\n/**\n * Getter method which returns a collection of objects containing name and values\n * of property inputs\n *\n * @returns {Array} Collection of objects with name and value keys\n */\nProductForm.prototype.properties = function() {\n  var properties = _serializePropertyValues(this.propertyInputs, function(\n    propertyName\n  ) {\n    var regex = /(?:^(properties\\[))(.*?)(?:\\])/;\n    var name = regex.exec(propertyName)[2]; // Use just the value between 'properties[' and ']'\n    return name;\n  });\n\n  return Object.entries(properties).length === 0 ? null : properties;\n};\n\n/**\n * Getter method which returns the current quantity or 1 if no quantity input is\n * included in the form\n *\n * @returns {Array} Collection of objects with name and value keys\n */\nProductForm.prototype.quantity = function() {\n  return this.quantityInputs[0]\n    ? Number.parseInt(this.quantityInputs[0].value, 10)\n    : 1;\n};\n\n// Private Methods\n// -----------------------------------------------------------------------------\nProductForm.prototype._setIdInputValue = function(value) {\n  var idInputElement = this.element.querySelector(selectors.idInput);\n\n  if (!idInputElement) {\n    idInputElement = document.createElement('input');\n    idInputElement.type = 'hidden';\n    idInputElement.name = 'id';\n    this.element.appendChild(idInputElement);\n  }\n\n  idInputElement.value = value.toString();\n};\n\nProductForm.prototype._onSubmit = function(options, event) {\n  event.dataset = this._getProductFormEventData();\n\n  if (event.dataset.variant) {\n    this._setIdInputValue(event.dataset.variant.id);\n  }\n\n  if (options.onFormSubmit) {\n    options.onFormSubmit(event);\n  }\n};\n\nProductForm.prototype._onFormEvent = function(cb) {\n  if (typeof cb === 'undefined') {\n    return Function.prototype;\n  }\n\n  return function(event) {\n    event.dataset = this._getProductFormEventData();\n    cb(event);\n  }.bind(this);\n};\n\nProductForm.prototype._initInputs = function(selector, cb) {\n  var elements = Array.prototype.slice.call(\n    this.element.querySelectorAll(selector)\n  );\n\n  return elements.map(\n    function(element) {\n      this._listeners.add(element, 'change', this._onFormEvent(cb));\n      return element;\n    }.bind(this)\n  );\n};\n\nProductForm.prototype._getProductFormEventData = function() {\n  return {\n    options: this.options(),\n    variant: this.variant(),\n    properties: this.properties(),\n    quantity: this.quantity()\n  };\n};\n\nfunction _serializeOptionValues(inputs, transform) {\n  return inputs.reduce(function(options, input) {\n    if (\n      input.checked || // If input is a checked (means type radio or checkbox)\n      (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input\n    ) {\n      options.push(transform({ name: input.name, value: input.value }));\n    }\n\n    return options;\n  }, []);\n}\n\nfunction _serializePropertyValues(inputs, transform) {\n  return inputs.reduce(function(properties, input) {\n    if (\n      input.checked || // If input is a checked (means type radio or checkbox)\n      (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input\n    ) {\n      properties[transform(input.name)] = input.value;\n    }\n\n    return properties;\n  }, {});\n}\n\nfunction _validateProductObject(product) {\n  if (typeof product !== 'object') {\n    throw new TypeError(product + ' is not an object.');\n  }\n\n  if (typeof product.variants[0].options === 'undefined') {\n    throw new TypeError(\n      'Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route'\n    );\n  }\n\n  return product;\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-product-form/theme-product-form.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-product/theme-product.js":
/*!**************************************************************!*\
  !*** ./node_modules/@shopify/theme-product/theme-product.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductJson\": () => (/* binding */ getProductJson),\n/* harmony export */   \"getVariantFromId\": () => (/* binding */ getVariantFromId),\n/* harmony export */   \"getVariantFromOptionArray\": () => (/* binding */ getVariantFromOptionArray),\n/* harmony export */   \"getVariantFromSerializedArray\": () => (/* binding */ getVariantFromSerializedArray)\n/* harmony export */ });\n/**\n * Returns a product JSON object when passed a product URL\n * @param {*} url\n */\nfunction getProductJson(handle) {\n  return fetch('/products/' + handle + '.js').then(function(response) {\n    return response.json();\n  });\n}\n\n/**\n * Find a match in the project JSON (using a ID number) and return the variant (as an Object)\n * @param {Object} product Product JSON object\n * @param {Number} value Accepts Number (e.g. 6908023078973)\n * @returns {Object} The variant object once a match has been successful. Otherwise null will be return\n */\nfunction getVariantFromId(product, value) {\n  _validateProductStructure(product);\n\n  if (typeof value !== 'number') {\n    throw new TypeError(value + ' is not a Number.');\n  }\n\n  var result = product.variants.filter(function(variant) {\n    return variant.id === value;\n  });\n\n  return result[0] || null;\n}\n\n/**\n * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)\n * @param {Object} product Product JSON object\n * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: \"Size\", value: \"36\" }, { name: \"Color\", value: \"Black\" }])\n * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned\n */\nfunction getVariantFromSerializedArray(product, collection) {\n  _validateProductStructure(product);\n\n  // If value is an array of options\n  var optionArray = _createOptionArrayFromOptionCollection(product, collection);\n  return getVariantFromOptionArray(product, optionArray);\n}\n\n/**\n * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)\n * @param {Object} product Product JSON object\n * @param {Array} options List of submitted values (e.g. ['36', 'Black'])\n * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned\n */\nfunction getVariantFromOptionArray(product, options) {\n  _validateProductStructure(product);\n  _validateOptionsArray(options);\n\n  var result = product.variants.filter(function(variant) {\n    return options.every(function(option, index) {\n      return variant.options[index] === option;\n    });\n  });\n\n  return result[0] || null;\n}\n\n/**\n * Creates an array of selected options from the object\n * Loops through the project.options and check if the \"option name\" exist (product.options.name) and matches the target\n * @param {Object} product Product JSON object\n * @param {Array} collection Array of object (e.g. [{ name: \"Size\", value: \"36\" }, { name: \"Color\", value: \"Black\" }])\n * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])\n */\nfunction _createOptionArrayFromOptionCollection(product, collection) {\n  _validateProductStructure(product);\n  _validateSerializedArray(collection);\n\n  var optionArray = [];\n\n  collection.forEach(function(option) {\n    for (var i = 0; i < product.options.length; i++) {\n      if (product.options[i].name.toLowerCase() === option.name.toLowerCase()) {\n        optionArray[i] = option.value;\n        break;\n      }\n    }\n  });\n\n  return optionArray;\n}\n\n/**\n * Check if the product data is a valid JS object\n * Error will be thrown if type is invalid\n * @param {object} product Product JSON object\n */\nfunction _validateProductStructure(product) {\n  if (typeof product !== 'object') {\n    throw new TypeError(product + ' is not an object.');\n  }\n\n  if (Object.keys(product).length === 0 && product.constructor === Object) {\n    throw new Error(product + ' is empty.');\n  }\n}\n\n/**\n * Validate the structure of the array\n * It must be formatted like jQuery's serializeArray()\n * @param {Array} collection Array of object [{ name: \"Size\", value: \"36\" }, { name: \"Color\", value: \"Black\" }]\n */\nfunction _validateSerializedArray(collection) {\n  if (!Array.isArray(collection)) {\n    throw new TypeError(collection + ' is not an array.');\n  }\n\n  if (collection.length === 0) {\n    return [];\n  }\n\n  if (collection[0].hasOwnProperty('name')) {\n    if (typeof collection[0].name !== 'string') {\n      throw new TypeError(\n        'Invalid value type passed for name of option ' +\n          collection[0].name +\n          '. Value should be string.'\n      );\n    }\n  } else {\n    throw new Error(collection[0] + 'does not contain name key.');\n  }\n}\n\n/**\n * Validate the structure of the array\n * It must be formatted as list of values\n * @param {Array} collection Array of object (e.g. ['36', 'Black'])\n */\nfunction _validateOptionsArray(options) {\n  if (Array.isArray(options) && typeof options[0] === 'object') {\n    throw new Error(options + 'is not a valid array of options.');\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter-theme/./node_modules/@shopify/theme-product/theme-product.js?");

/***/ }),

/***/ "./src/js/index/product.js":
/*!*********************************!*\
  !*** ./src/js/index/product.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shopify_theme_product_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-product-form */ \"./node_modules/@shopify/theme-product-form/theme-product-form.js\");\n/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ \"./node_modules/@shopify/theme-currency/currency.js\");\n/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shopify/theme-cart */ \"./node_modules/@shopify/theme-cart/theme-cart.js\");\n/* harmony import */ var _css_product_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../css/product.css */ \"./src/css/product.css\");\n/* harmony import */ var _utility_public_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility/public-path */ \"./src/js/utility/public-path.js\");\n/* harmony import */ var _utility_public_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utility_public_path__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utility_open_cart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utility/open-cart */ \"./src/js/utility/open-cart.js\");\n/**\n * Product specific scripts and styles\n */\n\n\n\n\n // Needed for openCart\n\n\nvar addToCartBtn = document.querySelector('[data-add-to-cart]');\nvar featuredImage = document.querySelector('[data-featured-image]');\nvar formElement = document.querySelector('[data-product-form]');\nvar stockMessages = document.querySelectorAll('[data-stock-message]');\nvar thumbnailLinks = document.querySelectorAll('[data-thumbnail-links]');\nvar themeStrings = window.theme.strings;\nvar themeMoneyFormat = window.theme.moneyFormat;\n/**\n * Updating the featured image\n *\n * @param {string} imgSrc - Image src url\n * @param {string} imgAltText - Alt text for the image\n */\n\nfunction handleFeaturedImage(imgSrc, imgAltText) {\n  featuredImage.src = imgSrc;\n  featuredImage.alt = imgAltText; // Unset srcset as it overrides src\n\n  featuredImage.srcset = '';\n} // Update featured image when you click on thumbnails\n\n\nif (thumbnailLinks) {\n  thumbnailLinks.forEach(function (link) {\n    link.addEventListener('click', function (event) {\n      event.preventDefault();\n      handleFeaturedImage(event.currentTarget.href, event.target.alt);\n    });\n  });\n}\n/**\n * ProductForm callbacks\n *\n * onOptionChange - Callback for whenever an option input changes\n * onQuantityChange - Callback for whenever an quantity input changes\n * onPropertyChange - Callback for whenever a property input changes\n * onFormSubmit - Callback for whenever the product form is submitted\n */\n\n\nfunction onOptionChange(event) {\n  var variant = event.dataset.variant;\n  console.log(event);\n  console.log(\"onOptionChange\"); // Hide all stock message.\n\n  stockMessages.forEach(function (stockMessage) {\n    return stockMessage.classList.add('hidden');\n  }); // Return and reset if we don't have a variant,\n\n  if (!variant) {\n    addToCartBtn.disabled = true;\n    addToCartBtn.innerHTML = themeStrings.unavailable;\n    return;\n  } // Show stock message for this variant.\n\n\n  document.getElementById(\"stock-message-\".concat(variant.id)).classList.remove('hidden'); // Update feature image\n\n  if (variant.featured_image) {\n    handleFeaturedImage(variant.featured_image.src, variant.featured_image.alt);\n  }\n\n  if (variant === null) {\n    // The combination of selected options does not have a matching variant\n    addToCartBtn.disabled = true;\n    addToCartBtn.innerHTML = themeStrings.unavailable;\n  } else if (variant && !variant.available) {\n    // The combination of selected options has a matching variant but it is currently unavailable\n    addToCartBtn.disabled = true;\n    addToCartBtn.innerHTML = themeStrings.soldOut;\n  } else if (variant && variant.available) {\n    // The combination of selected options has a matching variant and it is available\n    addToCartBtn.disabled = false;\n    addToCartBtn.innerHTML = \"\".concat(themeStrings.addToCart, \" &middot; \").concat((0,_shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(variant.price, themeMoneyFormat));\n  }\n}\n\nfunction onFormSubmit(event) {\n  event.preventDefault();\n  addToCartBtn.classList.add('loading');\n  var id = event.dataset.variant.id;\n  var quantity = event.dataset.quantity;\n  var properties = event.dataset.properties;\n  (0,_shopify_theme_cart__WEBPACK_IMPORTED_MODULE_2__.addItem)(id, {\n    quantity: quantity,\n    properties: properties\n  }).then(function () {\n    addToCartBtn.classList.remove('loading');\n    (0,_utility_open_cart__WEBPACK_IMPORTED_MODULE_5__[\"default\"])().then(function (response) {\n      if (response === false) {\n        window.location.href = '/cart';\n      }\n    });\n  })[\"catch\"](function () {\n    addToCartBtn.classList.remove('loading'); // Minimal error messages, so try standard form submit.\n\n    formElement.submit();\n  });\n} // Fetch the product data from the .js endpoint because it includes\n// more data than the .json endpoint. Alternatively, you could inline the output\n// of {{ product | json }} inside a <script> tag, with the downside that the\n// data can never be cached by the browser.\n//\n// You will need to polyfill `fetch()` if you want to support IE11\n\n\nfetch(\"/products/\".concat(formElement.dataset.productHandle, \".js\")).then(function (response) {\n  return response.json();\n}).then(function (productJSON) {\n  var productForm = new _shopify_theme_product_form__WEBPACK_IMPORTED_MODULE_0__.ProductForm(formElement, productJSON, {\n    onOptionChange: onOptionChange,\n    onFormSubmit: onFormSubmit\n  });\n});\n\n//# sourceURL=webpack://shopify-starter-theme/./src/js/index/product.js?");

/***/ }),

/***/ "./src/js/utility/open-cart.js":
/*!*************************************!*\
  !*** ./src/js/utility/open-cart.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar openCart = function openCart() {\n  return Promise.all(/*! import() | app-cart-init */[__webpack_require__.e(\"vendors-node_modules_shopify_theme-a11y_theme-a11y_js-node_modules_shopify_theme-cart_theme-c-800a69\"), __webpack_require__.e(\"app-cart-init\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../apps/app-cart-init */ \"./src/js/apps/app-cart-init.js\")).then(function (module) {\n    var appcart = module[\"default\"];\n    appcart();\n    return true;\n  })[\"catch\"](function () {\n    return false;\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openCart);\n\n//# sourceURL=webpack://shopify-starter-theme/./src/js/utility/open-cart.js?");

/***/ }),

/***/ "./src/js/utility/public-path.js":
/*!***************************************!*\
  !*** ./src/js/utility/public-path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Required for lazy-loading with Webpack on Shopify CDN\n * Generated in theme.liquid, referenced here and imported in theme.js\n */\n__webpack_require__.p = window.__webpack_public_path__;\n\n//# sourceURL=webpack://shopify-starter-theme/./src/js/utility/public-path.js?");

/***/ }),

/***/ "./src/css/product.css":
/*!*****************************!*\
  !*** ./src/css/product.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shopify-starter-theme/./src/css/product.css?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + {"vendors-node_modules_shopify_theme-a11y_theme-a11y_js-node_modules_shopify_theme-cart_theme-c-800a69":"a197c","app-cart-init":"5f12c"}[chunkId] + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "shopify-starter-theme:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"product": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkshopify_starter_theme"] = self["webpackChunkshopify_starter_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index/product.js");
/******/ 	
/******/ })()
;