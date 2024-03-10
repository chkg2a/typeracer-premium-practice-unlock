const headers = {
  "authority": "play.typeracer.com",
  "accept": "*/*",
  "accept-language": "en-US,en;q=0.5",
  "content-type": "text/x-gwt-rpc; charset=UTF-8",
  "origin": "https://play.typeracer.com",
  "referer": "https://play.typeracer.com/",
  "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Linux"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "sec-gpc": "1",
  "user-agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "x-gwt-module-base":
    "https://play.typeracer.com/com.typeracer.redesign.Redesign/",
  "x-gwt-permutation": "7FF26DBA128BB0A7C3F12812565A4C12",
};

const save_last_race_btn = document.querySelector("#save-last-race");
const start_easytext_btn = document.querySelector("#start-easytexts");
const save_btn = document.getElementById("save-btn");

save_btn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (!text) {
    alert("Please enter some text");
    return;
  }
  chrome.storage.sync.set({ userText: text }, () => {
    console.log("Text saved to storage");
  })

})

start_easytext_btn.addEventListener("click", async () => {
  const jsessionid = document.getElementById("userInput").value;
  const text = userInput.value.trim();
  if (!text) {
    alert("Please enter some text");
    return;
  }
  chrome.storage.sync.set({ userText: text }, () => {
    console.log("Text saved to storage");
  });
  const full_url =
    `https://play.typeracer.com/gameserv;jsessionid=${jsessionid}`;

  try {
    await fetch(
      `${full_url}`,
      {
        method: "POST",
        headers: headers,
        body:
          "7|1|9|https://play.typeracer.com/com.typeracer.redesign.Redesign/|A53E5ACC74ED6E7A8508469317F4CE8A|_|joinSinglePlayerGame|15|35|2d||easytexts|1|2|3|4|2|5|6|5|0|1|0|0|7|8|9|",
      },
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
});

save_last_race_btn.addEventListener("click", async () => {
  const jsessionid = document.getElementById("userInput").value;
  const text = userInput.value.trim();
  if (!text) {
    alert("Please enter some text");
    return;
  }
  chrome.storage.sync.set({ userText: text }, () => {
    console.log("Text saved to storage");
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  full_url = `https://play.typeracer.com/gameserv;jsessionid=${jsessionid}?` +
    url.split("?")[1];
  console.log(full_url);

  try {
    await fetch(
      `${full_url}`,
      {
        method: "POST",
        headers: headers,
        body:
          "7|1|4|https://play.typeracer.com/com.typeracer.redesign.Redesign/|A53E5ACC74ED6E7A8508469317F4CE8A|_|saveLastScore|1|2|3|4|0|",
      },
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
});

chrome.storage.sync.get("userText", (data) => {
  if (data.userText) {
    userInput.value = data.userText;
  }
});
