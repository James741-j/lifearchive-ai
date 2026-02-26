// Basic in-memory storage for messages
let messages = [];

exports.getMessages = (req, res) => {
    res.json(messages);
};

exports.scheduleMessage = (req, res) => {
    try {
        const { recipient, email, subject, content, deliverDate, trigger } = req.body;

        const newMessage = {
            id: Date.now(),
            recipient,
            email,
            subject: subject || 'A message from the past',
            content,
            deliverDate,
            trigger: trigger || 'Specific Date',
            createdAt: new Date().toLocaleDateString(),
            status: 'scheduled'
        };

        messages.push(newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling message', error: error.message });
    }
};
