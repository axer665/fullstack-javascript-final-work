export function get(keyName: string): string {
    const data = localStorage.getItem(keyName);
    return data ? JSON.parse(data) : '';
}

export function set(keyName: string, value: string): void {
    localStorage.setItem(keyName, JSON.stringify(value));
}

export function remove(keyName: string): void {
    localStorage.removeItem(keyName);
}