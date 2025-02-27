document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const randomBtn = document.getElementById('randomBtn');
    const output = document.getElementById('output');
    const copyMessage = document.getElementById('copyMessage');

    const basePrompt = "A graceful tall Malay woman in her 40s with a generously thick figure and abundant curves";
    const groupPrompts = {
        "two": "Two graceful tall Malay women in their 40s with generously thick figures and abundant curves",
        "three": "Three graceful tall Malay women in their 40s with generously thick figures and abundant curves",
        "small group": "A small group of graceful tall Malay women in their 40s with generously thick figures and abundant curves",
        "large group": "A large group of graceful tall Malay women in their 40s with generously thick figures and abundant curves"
    };

    function getSelectedValues(selectElement) {
        if (selectElement.multiple) {
            return Array.from(selectElement.selectedOptions).map(option => option.value).filter(value => value);
        }
        return selectElement.value;
    }

    function getRandomOption(selectElement) {
        const options = Array.from(selectElement.options).filter(option => option.value);
        return options[Math.floor(Math.random() * options.length)].value;
    }

    function generatePrompt(isRandom = false) {
        const scene = isRandom ? getRandomOption(document.getElementById('scene')) : getSelectedValues(document.getElementById('scene'));
        const action = isRandom ? getRandomOption(document.getElementById('action')) : getSelectedValues(document.getElementById('action'));
        const mood = isRandom ? getRandomOption(document.getElementById('mood')) : getSelectedValues(document.getElementById('mood'));
        const style = isRandom ? getRandomOption(document.getElementById('style')) : getSelectedValues(document.getElementById('style'));
        const composition = isRandom ? getRandomOption(document.getElementById('composition')) : getSelectedValues(document.getElementById('composition'));
        const clothing = isRandom ? getRandomOption(document.getElementById('clothing')) : getSelectedValues(document.getElementById('clothing'));
        const subjectCount = isRandom ? getRandomOption(document.getElementById('subjectCount')) : getSelectedValues(document.getElementById('subjectCount'));
        const elements = isRandom ? 
            [getRandomOption(document.getElementById('elements'))] : 
            getSelectedValues(document.getElementById('elements'));

        let baseDescription = subjectCount === "single" || !subjectCount ? basePrompt : groupPrompts[subjectCount];
        let prompt = (composition ? composition + " of " : "") + baseDescription;
        
        const defaultClothing = subjectCount === "single" ? 
            "wearing a simple form-fitting black abaya" : 
            "wearing simple form-fitting black abayas";
        const clothingText = clothing ? 
            `wearing form-fitting ${clothing}${subjectCount !== "single" ? "s" : ""}` : 
            defaultClothing;
        prompt += `, ${clothingText}, caught in a natural candid moment without noticing the camera`;

        if (scene) prompt += ` in a ${scene}`;
        if (action) prompt += `, ${action}`;
        if (mood) prompt += `, looking ${mood}`;
        if (elements.length) prompt += `, with ${elements.join(' and ')}`;
        // Always include a style for consistency
        const defaultStyle = "realistic photo, sharp details, natural lighting, 4k";
        prompt += `. ${style || defaultStyle}`;

        return prompt;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    }

    generateBtn.addEventListener('click', () => {
        const prompt = generatePrompt();
        output.textContent = prompt;
        copyToClipboard(prompt);
    });

    randomBtn.addEventListener('click', () => {
        const prompt = generatePrompt(true);
        output.textContent = prompt;
        copyToClipboard(prompt);
    });

    output.addEventListener('click', () => {
        if (output.textContent) {
            copyToClipboard(output.textContent);
        }
    });
}); 