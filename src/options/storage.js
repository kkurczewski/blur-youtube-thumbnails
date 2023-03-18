async function preloadOptions() {
  return chrome.storage.local.get()
}

function saveAllOptions(options) {
  chrome.storage.local.set(options)
}