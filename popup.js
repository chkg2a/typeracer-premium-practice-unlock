const headers = {
  "authority": "play.typeracer.com",
  "accept": "*/*",
  "accept-language": "en-US,en;q=0.5",
  "content-type": "text/x-gwt-rpc; charset=UTF-8",
  "cookie":
    "settingsFirstTime=1; info=L%7Ctr%3Achkg2a%7C1711100468.0%7CMg1ACAThhdC2qG9rlitJ63o%2BefA%3D; prefs=%7B%22dateOfLastVisit%22%3A%201709913035219.5%2C%20%22dateOfPriorVisit%22%3A%201709911992650.0%2C%20%22domain%22%3A%20%22.typeracer.com%22%2C%20%22pupDate%22%3A%201709879827236.5%7D",
  "origin": "https://play.typeracer.com",
  "referer": "https://play.typeracer.com/",
  "sec-ch-ua":
    '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
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
}

const save_last_race_btn = document.querySelector("#save-last-race");
const start_easytext_btn = document.querySelector("#start-easytexts");

start_easytext_btn.addEventListener("click", async () => {
  const jsessionid = document.getElementById("userInput").value;
  const text = userInput.value.trim();
  if (!text) {
    alert("Please enter some text");
    return;
  }
  chrome.storage.sync.set({ userText: text }, () => {
    console.log('Text saved to storage');
  });
  const full_url = `https://play.typeracer.com/gameserv;jsessionid=${jsessionid}`


  try {
    // Include user text in request (modify based on your API)
    const response = await fetch(
      `${full_url}`,
      {
        method: "POST",
        headers: headers,
        body:
          "7|1|9|https://play.typeracer.com/com.typeracer.redesign.Redesign/|A53E5ACC74ED6E7A8508469317F4CE8A|_|joinSinglePlayerGame|15|35|2d||easytexts|1|2|3|4|2|5|6|5|0|1|0|0|7|8|9|",
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    // Handle the fetched data here (e.g., display in a popup)
  } catch (error) {
    console.error("Error:", error.message);
    // Handle errors (e.g., display error message in popup)
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
    console.log('Text saved to storage');
  });
  // Get current tab URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  full_url = `https://play.typeracer.com/gameserv;jsessionid=${jsessionid}?` +
    url.split("?")[1];
  console.log(full_url);

  try {
    // Include user text in request (modify based on your API)
    const response = await fetch(
      `${full_url}`,
      {
        method: "POST",
        headers: headers,
        body:
          "7|1|4|https://play.typeracer.com/com.typeracer.redesign.Redesign/|A53E5ACC74ED6E7A8508469317F4CE8A|_|saveLastScore|1|2|3|4|0|",
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    // Handle the fetched data here (e.g., display in a popup)
  } catch (error) {
    console.error("Error:", error.message);
    // Handle errors (e.g., display error message in popup)
  }
});

chrome.storage.sync.get('userText', (data) => {
  if (data.userText) {
    userInput.value = data.userText;
  }
});
