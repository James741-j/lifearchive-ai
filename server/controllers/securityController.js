exports.getTrustees = (req, res) => {
    const trustees = [
        { id: 1, name: 'Sarah Miller', relation: 'Spouse', access: 'Full Archive', status: 'Verified' },
        { id: 2, name: 'David Jones', relation: 'Brother', access: 'Legal Documents Only', status: 'Pending Verification' }
    ];
    res.json(trustees);
};

exports.getWillProgress = (req, res) => {
    res.json({ progress: 72 });
};
