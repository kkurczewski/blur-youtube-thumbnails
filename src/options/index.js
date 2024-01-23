window.onload = async () => {
  await loadOptions()

  document.querySelector("#save").onclick = saveTags
  document.querySelector("#matcher input").oninput = matchTags
  document.querySelector("#help #close").onclick = hideHelp
  document.getElementById("unblur").onchange = saveUnblurSetting

  async function loadOptions() {
    const options = await preloadOptions()
    console.log(options)

    if (options.showHelp) {
      document.querySelector("#help").style.display = ""
    }
    loadTags()
    document.getElementById("unblur").checked = options["unblur"]

    function loadTags() {
      for (let tagSection of document.querySelectorAll("fieldset:has(.tag)")) {
        for (let tagList of tagSection.querySelectorAll(":has(> .tag)")) {
          assignEntries(tagList, options[tagSection.id][tagList.className])
        }
      }

      function assignEntries(list, entries) {
        const firstElement = list.firstElementChild
        entries.forEach(entry => {
          const li = firstElement.cloneNode()
          li.textContent = entry
          list.append(li)
        })
        if (entries.length > 0) {
          firstElement.remove()
        }
      }
    }
  }

  function saveTags() {
    const options = {}
    for (let tagSection of document.querySelectorAll("fieldset:has(.tag)")) {
      options[tagSection.id] = {}
      for (let tagList of tagSection.querySelectorAll(":has(> .tag)")) {
        options[tagSection.id][tagList.className] = extractValues(tagList)
      }
    }
    saveOptions(options)

    function extractValues(list) {
      return Array.from(list.children)
        .map(child => child.innerText)
        .filter(value => value)
    }
  }

  function matchTags(event) {
    const input = event.srcElement.value
    document
      .querySelectorAll(".tag")
      .forEach(node => {
        const tagValue = node.innerText
        if (tagValue.length > 0) {
          const matches = input.match(RegExp(tagValue, "i")) != null
          node.classList.toggle("highlight", matches)
        }
      })
  }

  async function hideHelp() {
    await chrome.storage.local.remove("showHelp")
    document.querySelector("#help").style.display = "none"
  }

  function saveUnblurSetting() {
    saveOptions({ unblur: document.getElementById("unblur").checked })
  }
}