
const saveBtn = document.getElementById("save-btn")
const clearBtn = document.getElementById("clear-btn")
const gotoURLInput = document.getElementById("goto-url-input")

chrome.storage.local.get("gotoURL", (result) => {
   gotoURLInput.value = result?.gotoURL || ""
})

saveBtn.addEventListener("click", async () => {
   
   let gotoURL = gotoURLInput.value
   console.log("input: ", gotoURL)
   let saveCurrentTab = false

   if (!gotoURL) {
      saveCurrentTab = true
      gotoURL = (await chrome.runtime.sendMessage({id: "get-current-tab-url"}))?.tab?.url
      console.log("current tab url: ", gotoURL);
   }

   chrome.storage.local.set({gotoURL}, () => {
      console.log("saved")
      saveBtn.innerText = "Saved"
      if (saveCurrentTab) {
         saveBtn.innerText = "Saved Current Tab"
      }
      saveBtn.classList.add("saved")
      setTimeout(() => {
         saveBtn.innerText = "Save"
         saveBtn.classList.remove("saved")
         gotoURLInput.value = gotoURL
      }, 500)
   })
})

clearBtn.addEventListener("click", () => {
   
      chrome.storage.local.remove("gotoURL", () => {
         console.log("cleared")
         gotoURLInput.value = ""
         clearBtn.innerText = "cleared"
         clearBtn.classList.add("cleared")
         setTimeout(() => {
            clearBtn.classList.remove("cleared")
            clearBtn.innerText = "clear"
         }, 1000)
      })
})





