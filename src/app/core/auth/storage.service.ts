import Cookies from 'js-cookie';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getCookie(name: string): string | undefined {
    return Cookies.get(name);
}

setCookie(
    name: string,
    value: string,
    expires?: number,
): string | undefined {
    return Cookies.set(name, value, { expires: expires || 365 });
}

removeCookie(name: string): void {
    return Cookies.remove(name);
}

setStorageAccessToken(token: string) {
    localStorage.setItem('access_token', token);
}

getStorageAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

removeStorageAccessToken() {
    localStorage.removeItem('access_token');
}

setStorageRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
}

getStorageRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
}

removeStorageRefreshToken() {
    localStorage.removeItem('refresh_token');
}
}
