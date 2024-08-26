
document.getElementById('generate').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const apiKey = document.getElementById('api-key').value;

    if (!apiKey) {
        alert("Please enter your OpenAI API key.");
        return;
    }

    // Fetch the OpenAI API directly from the client-side
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Convert the following description into HTML, CSS, and JS code:

${prompt}`,
            max_tokens: 500,
            temperature: 0.5,
        })
    });

    const data = await response.json();
    const generatedCode = data.choices[0].text.trim();

    // Display the generated code
    const codeOutput = document.getElementById('code-output');
    codeOutput.textContent = generatedCode;

    // Execute the code on the canvas
    const visualization = document.getElementById('visualization');
    const context = visualization.getContext('2d');
    
    // Clear previous drawings
    context.clearRect(0, 0, visualization.width, visualization.height);

    // Evaluate the generated JS code in the context of the canvas
    eval(generatedCode);
});
