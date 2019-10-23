import { get } from './http.js'


export const homeApi = () => get('?name=1');
export const mhSerchApi = p => get(`?mhname=${p}`);
export const mhListApi = p => get(`?mhurl1=${p}`);
export const mhDetailsApi = p => get(`?mhurl2=${p}`);
