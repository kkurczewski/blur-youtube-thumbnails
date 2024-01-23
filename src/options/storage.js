async function preloadOptions() {
  return chrome.storage.local.get()
}

function saveOptions(options) {
  chrome.storage.local.set(options)
}