document.querySelectorAll("ul:has(li[contenteditable])").forEach(ul => {
  ul.addEventListener("keydown", onKeyDown)
  ul.addEventListener("keyup", onKeyUp)
  ul.addEventListener("blur", onBlur, true)

  function onKeyDown(e) {
    const target = e.target
    if (!target.matches("li[contenteditable]")) {
      return
    }
    if (target.textContent.length >= 30) {
      e.preventDefault()
      return
    }
    switch (e.key) {
      case "Enter":
        e.preventDefault() // prevents adding empty new lines
        break
    }
  }

  function onKeyUp(e) {
    const target = e.target
    if (!target.matches("li[contenteditable]")) {
      return
    }
    switch (e.key) {
      case "Enter":
        if (!target.textContent) {
          // ignore empty input
          return
        }
        const next = target.nextElementSibling
        if (next && !next.textContent) {
          // reuse empty node
          next.focus()
          return
        }
        // exit via enter
        const li = appendEmptyNode(target)
        li.focus()
        break
    }
  }

  function onBlur(e) {
    const target = e.target
    if (!target.matches("li[contenteditable]")) {
      return
    }
    if (!target.textContent) {
      if (target.nextElementSibling) {
        // remove empty node in middle
        target.remove()
      }
    } else if (!target.nextElementSibling) {
      // exit via click
      appendEmptyNode(target)
    }
  }

  function appendEmptyNode(target) {
    const li = target.cloneNode()
    target.parentNode.insertBefore(li, target.nextElementSibling)
    return li
  }
})