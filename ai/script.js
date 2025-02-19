const apiKey =
  "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"; // Replace with your OpenAI API key
const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("userInput");
const outputDiv = document.getElementById("output");

submitBtn.addEventListener("click", async () => {
  const prompt = userInput.value.trim();
  if (!prompt) {
    outputDiv.textContent = "Please enter some text!";
    return;
  }

  outputDiv.textContent = "Loading response...";

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Model name
        prompt: prompt,
        max_tokens: 100, // Adjust the response length
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    outputDiv.textContent = data.choices[0].text.trim();
  } catch (error) {
    outputDiv.textContent = `Error: ${error.message}`;
  }
});
