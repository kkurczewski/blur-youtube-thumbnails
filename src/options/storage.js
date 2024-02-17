async function loadOptions() {
  return chrome.storage.local.get()
}

function saveOptions(options) {
  chrome.storage.local.set(options)
}