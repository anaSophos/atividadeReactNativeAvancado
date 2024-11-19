import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export const climaLatLog = (lat, lon) => {
  return api.get(`?lat=${lat}&lon=${lon}&appid=2c3f489e1360116a2eed8c505220e7b8`);
};

export default api;