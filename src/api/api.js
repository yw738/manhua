import { get } from './http.js'


export const homeApi = () => get('?name=1');
export const mhSerchApi = p => get(`/cartoon/search/title/${encodeURIComponent(p)}/1/999`);
export const mhListApi = p => get(`/cartoonChapter/search/${p}`);
export const mhDetailsApi = p => get(`/cartoonContent/search/${p}`);
