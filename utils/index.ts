
export const formatTime = (input: number) => {
    const hours = Math.floor(input / 3600);
    const minutes = Math.floor(input / 60);
    const seconds = Math.floor(input - minutes * 60);
    const time = [hours, minutes, seconds]
        .map((v) => (v < 10 ? `0${v}` : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
    return time;
}