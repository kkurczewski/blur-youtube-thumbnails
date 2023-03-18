document.querySelectorAll("ul:has(li[contenteditable])").forEach(ul => {
  ul.addEventListener("keydown", onKeyDown)
  ul.addEventListener("blur", onBlur, true)

  function onKeyDown(e) {
    const target = e.target
    if (!target.matches("li[contenteditable]")) {
      return
    }
    target.textContent = target.textContent.replace(/\n/g, '') // fixes unnecessary newline that is appended
    switch (e.key) {
      case "Enter":
        if (!target.innerText) {
          // ignore empty input
          return
        }
        if (target.nextElementSibling?.innerText === '') {
          // select next empty element instead creating new one
          target.nextElementSibling.focus()
          return
        }
        const li = target.cloneNode()
        li.textContent = target.textContent
        target.textContent = ""
        target.parentNode.insertBefore(li, target)
        break
      case "Backspace":
      case "Delete":
        if (!target.innerText) {
          target.previousElementSibling?.remove()
        }
        break
    }
  }

  function onBlur(e) {
    const target = e.target
    if (!target.matches("li[contenteditable]")) {
      return
    }
    if (!target.innerText && target.parentNode.childElementCount > 1) {
      target.remove()
    }
  }
})