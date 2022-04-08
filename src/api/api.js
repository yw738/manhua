import {get } from './http.js'

export const homeApi = () => get(`/comic/search/comicType/少年/1/12`);
export const homePageApi = () => get(`/comic/search/comicType/少年/2/5`);
export const mhSerchApi = str => get(`/comic/search/title/${encodeURIComponent(str)}/1/999`);
export const mhListApi = id => get(`/comicChapter/search/${id}`);
export const mhDetailsApi = id => get(`/comicContent/search/${id}`);