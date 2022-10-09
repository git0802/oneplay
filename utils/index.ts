
export const formatTime = (input: number) => {
    const decDays = input / 86400;
    const days = Math.floor(decDays);
    const decH = (decDays - days) * 24;
    const hours = Math.floor(decH);
    const decMin = (decH - hours) * 60;
    const minutes = Math.floor(decMin);
    const decSec = (decMin - minutes) * 60;
    const seconds = Math.floor(decSec);
    const time = [hours, minutes, seconds]
        .map((v) => (v < 10 ? `0${v}` : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
    return time;
}

export const formatBytes = (bytes: number, decimals = 2) => {
    const gigabytes = Math.floor(bytes / 1073741824);
    const megabytes = Math.floor(bytes / 1048576);
    const kilobytes = Math.floor(bytes / 1024);
    const bytes1 = Math.floor(bytes);
    const sizes = [gigabytes, megabytes, kilobytes, bytes1];
    const units = ['GB', 'MB', 'KB', 'B'];
    const index = sizes.findIndex((v) => v > 0);
    const size = sizes[index];
    const unit = units[index];
    return `${size.toFixed(decimals)} ${unit}`;
}