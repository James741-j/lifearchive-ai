exports.generateStory = (req, res) => {
    const { theme } = req.body;

    // Mock response for narrative simulation
    const story = {
        title: "A Tapestry of Moments: The Legend of a Life",
        chapters: [
            {
                title: "Chapter 1: Foundations & First Steps",
                content: "The journey began in a world of promise. Early memories of family reunions and the warmth of a shared home laid the groundwork for a life defined by curiosity and resilience..."
            },
            {
                title: "Chapter 2: The Architect's Ascent",
                content: "By 2021, the path had become clear. A career in architecture wasn't just about building structures, but about designing experiences. The promotion to Senior Architect marked a turning point..."
            },
            {
                title: "Chapter 3: Legacy & Launch",
                content: "In 2026, the digital preservation of these moments became a reality. LifeArchive was born, not just as a tool, but as a testament to the importance of memory."
            }
        ]
    };

    // Simulate processing time
    setTimeout(() => {
        res.json(story);
    }, 2000);
};

exports.avatarChat = (req, res) => {
    const { query } = req.body;

    // Basic mock responses based on "personality"
    const responses = [
        "That's a great question. Based on my memories from 2021, I always valued architecture as a bridge between art and utility.",
        "I remember the family reunion of 2024. It was a day filled with laughter and a profound sense of connection.",
        "The most important piece of advice I can give you is to always preserve the moments that matter most."
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
        res.json({ response });
    }, 1000);
};
