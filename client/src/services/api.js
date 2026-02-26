import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const vaultService = {
    getMemories: async () => {
        const response = await api.get('/vault');
        return response.data;
    },
    uploadMemory: async (formData) => {
        const response = await api.post('/vault/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export const messageService = {
    getMessages: async () => {
        const response = await api.get('/messages');
        return response.data;
    },
    scheduleMessage: async (messageData) => {
        const response = await api.post('/messages/schedule', messageData);
        return response.data;
    },
};

export const timelineService = {
    getData: async () => {
        const response = await api.get('/timeline/data');
        return response.data;
    },
    getMilestones: async () => {
        const response = await api.get('/timeline/milestones');
        return response.data;
    },
};

export const aiService = {
    generateStory: async (params) => {
        const response = await api.post('/ai/generate-story', params);
        return response.data;
    },
    getAvatarResponse: async (query) => {
        const response = await api.post('/ai/avatar-chat', { query });
        return response.data;
    },
};

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export default api;
