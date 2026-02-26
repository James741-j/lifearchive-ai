exports.getTimelineData = (req, res) => {
    // Mock emotional growth data
    const data = [
        { year: '2015', value: 65 },
        { year: '2017', value: 59 },
        { year: '2019', value: 80 },
        { year: '2021', value: 81 },
        { year: '2023', value: 75 },
        { year: '2025', value: 95 }
    ];
    res.json(data);
};

exports.getMilestones = (req, res) => {
    const milestones = [
        { year: '2026', title: 'LifeArchive Launched', description: 'Started preservation of digital legacy.', type: 'star' },
        { year: '2024', title: 'First Family Reunion', description: 'Captured 40+ memories in one day.', type: 'default' },
        { year: '2021', title: 'Career Milestone', description: 'Promoted to Senior Architect.', type: 'milestone' }
    ];
    res.json(milestones);
};
