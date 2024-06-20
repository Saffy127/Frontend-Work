let parsedData = [];

document.getElementById('file-input').addEventListener('change', handleFileUpload);
document.getElementById('download-btn').addEventListener('click', downloadParsedData);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    document.getElementById('file-name').textContent = file.name;

    reader.onload = function(e) {
        const content = e.target.result;
        parsedData = parseJournalEntries(content);
        displayEntries(parsedData);
        analyzeEntries(parsedData);
        document.getElementById('download-btn').style.display = 'block';
    };

    reader.readAsText(file);
}

function parseJournalEntries(content) {
    const entries = content.split(/\n(?=\d{4}-\d{2}-\d{2})/);
    return entries.map(entry => {
        const [dateLine, ...contentLines] = entry.trim().split('\n');
        const [date, title] = dateLine.split(' - ');
        return {
            date,
            title,
            content: contentLines.join('\n')
        };
    });
}

function displayEntries(entries) {
    const container = document.getElementById('entries-container');
    container.innerHTML = entries.map(entry => `
        <div class="entry">
            <h3>${entry.date} - ${entry.title}</h3>
            <p>${entry.content}</p>
        </div>
    `).join('');
}

function analyzeEntries(entries) {
    const totalWords = entries.reduce((sum, entry) => sum + entry.content.split(/\s+/).length, 0);
    const averageWords = totalWords / entries.length;
    const keywords = extractKeywords(entries);
    const sentiment = analyzeSentiment(entries);

    document.getElementById('analysis').innerHTML = `
        <h2>Analysis</h2>
        <p><strong>Total Entries:</strong> ${entries.length}</p>
        <p><strong>Total Words:</strong> ${totalWords}</p>
        <p><strong>Average Words per Entry:</strong> ${averageWords.toFixed(2)}</p>
        <p><strong>Top Keywords:</strong> ${keywords.join(', ')}</p>
        <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
    `;
}

function extractKeywords(entries) {
    const words = entries.flatMap(entry => entry.content.toLowerCase().split(/\W+/));
    const wordCounts = words.reduce((acc, word) => {
        if (word.length > 3) {
            acc[word] = (acc[word] || 0) + 1;
        }
        return acc;
    }, {});
    return Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);
}

function analyzeSentiment(entries) {
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'horrible', 'disappointing'];

    let sentimentScore = 0;
    entries.forEach(entry => {
        const words = entry.content.toLowerCase().split(/\W+/);
        words.forEach(word => {
            if (positiveWords.includes(word)) sentimentScore++;
            if (negativeWords.includes(word)) sentimentScore--;
        });
    });

    if (sentimentScore > 0) return 'Positive';
    if (sentimentScore < 0) return 'Negative';
    return 'Neutral';
}

function downloadParsedData() {
    const dataStr = JSON.stringify(parsedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'parsed_journal_entries.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}