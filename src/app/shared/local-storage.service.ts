import { Injectable } from '@angular/core';

const LS_PREFIX = '@ptah';
const KEY_AUTH_HEADER = 'auth';
const KEY_EMAIL_TO_BE_CONFIRMED = 'register.emailToBeConfirmed';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getAuthHeader(): string | null {
    return localStorage.getItem(this.getKey(KEY_AUTH_HEADER));
  }

  setAuthHeader(value: string): void {
    localStorage.setItem(this.getKey(KEY_AUTH_HEADER), value);
  }

  getEmailToBeConfirmed() {
    return localStorage.getItem(this.getKey(KEY_EMAIL_TO_BE_CONFIRMED));
  }

  setEmailToBeConfirmed(value: string): void {
    localStorage.setItem(this.getKey(KEY_EMAIL_TO_BE_CONFIRMED), value);
  }

  removeEmailToBeConfirmed() {
    localStorage.removeItem(this.getKey(KEY_EMAIL_TO_BE_CONFIRMED));
  }

  private getKey(keyName: string): string {
    return `${LS_PREFIX}.${keyName}`;
  }
}
