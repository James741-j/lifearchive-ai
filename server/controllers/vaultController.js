// Basic in-memory storage for demonstration until DB is fully wired
let memories = [];

exports.getMemories = (req, res) => {
    res.json(memories);
};

exports.uploadMemory = (req, res) => {
    try {
        const { title, type } = req.body;
        const newMemory = {
            id: Date.now(),
            title: title || 'Untitled Memory',
            type: type || 'image',
            filename: req.file ? req.file.filename : null,
            date: new Date().toISOString(),
            category: 'general'
        };

        memories.push(newMemory);
        res.status(201).json(newMemory);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading memory', error: error.message });
    }
};
