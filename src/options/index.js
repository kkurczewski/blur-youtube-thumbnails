window.onload = async () => {
  loadTags()

  document.querySelector("#save").onclick = saveTags
  document.querySelector("#matcher input").oninput = matchTags

  async function loadTags() {
    const options = await preloadOptions()
    console.log(options)

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

  async function saveTags() {
    const options = {}
    for (let tagSection of document.querySelectorAll("fieldset:has(.tag)")) {
      options[tagSection.id] = {}
      for (let tagList of tagSection.querySelectorAll(":has(> .tag)")) {
        options[tagSection.id][tagList.className] = extractValues(tagList)
      }
    }
    saveAllOptions(options)

    function extractValues(list) {
      return Array.from(list.children)
        .map(child => child.innerText)
        .filter(value => value)
    }
  }

  async function matchTags(event) {
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
}