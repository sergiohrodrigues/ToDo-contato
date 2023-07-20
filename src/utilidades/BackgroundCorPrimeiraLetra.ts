export const BackgroundCorPrimeiraLetra = () => {
    return '#' + parseInt(String((Math.random() * 0xFFFFFF)))
    .toString(16)
    .padStart(6, '0');
}