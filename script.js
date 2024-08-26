
document.getElementById('generate').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const apiKey = document.getElementById('api-key').value;
    const errorMessage = document.getElementById('error-message');
    const codeOutput = document.getElementById('code-output');
    const visualization = document.getElementById('visualization');
    const context = visualization.getContext('2d');

    errorMessage.textContent = '';
    codeOutput.textContent = '';

    if (!apiKey) {
        errorMessage.textContent = "Please enter your OpenAI API key.";
        return;
    }

    // Show loading graphic in the canvas
    context.clearRect(0, 0, visualization.width, visualization.height);
    context.font = "20px Arial";
    context.fillText("Loading...", visualization.width / 2 - 50, visualization.height / 2);

    try {
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

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const generatedCode = data.choices[0].text.trim();

        // Display the generated code
        codeOutput.textContent = generatedCode;

        // Clear loading graphic and execute the generated JS code
        context.clearRect(0, 0, visualization.width, visualization.height);
        eval(generatedCode);
    } catch (error) {
        errorMessage.textContent = error.message;
        context.clearRect(0, 0, visualization.width, visualization.height);
        context.fillText("Error loading content", visualization.width / 2 - 80, visualization.height / 2);
    }
});
