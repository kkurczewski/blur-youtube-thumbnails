window.onload = async () => {
  const TAG_TYPES = ".whitelist,.blacklist"
  const TAG_SECTIONS = `#tags > :has(${TAG_TYPES})`

  const options = await loadOptions()
  console.log(options)

  populateForm()
  document.querySelector("#save").addEventListener("click", saveTags)
  document.querySelector("#matcher input").addEventListener("input", matchTags)

  function populateForm() {
    loadTags()
    loadSettings()

    function loadTags() {
      for (let tagSection of document.querySelectorAll(TAG_SECTIONS)) {
        for (let tagList of tagSection.querySelectorAll(TAG_TYPES)) {
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
        list.append(firstElement)
      }
    }

    function loadSettings() {
      document.querySelectorAll("#settings input[type=checkbox]").forEach(cbox => {
        // @ts-ignore
        cbox.checked = options[cbox.id]
        cbox.addEventListener("change", e => {
          const target = e.target
          // @ts-ignore
          saveOptions({ [target.id]: target.checked })
        })
      })
    }
  }

  function saveTags() {
    const options = {}
    for (let tagSection of document.querySelectorAll(TAG_SECTIONS)) {
      options[tagSection.id] = {}
      for (let tagList of tagSection.querySelectorAll(TAG_TYPES)) {
        options[tagSection.id][tagList.className] = extractValues(tagList)
      }
    }
    saveOptions(options)

    /** @param {Element} list */
    function extractValues(list) {
      return [...list.children]
        // @ts-ignore
        .map(child => child.innerText)
        .filter(value => value)
    }
  }

  function matchTags(event) {
    const input = event.target.value
    if (!input) {
      return
    }

    document.querySelectorAll(`ul:is(${TAG_TYPES}) li`).forEach(node => {
      // @ts-ignore
      const tagValue = node.innerText
      if (tagValue.length > 0) {
        const matches = input.match(RegExp(tagValue, "i")) != null
        node.classList.toggle("highlight", matches)
      }
    })
  }
}