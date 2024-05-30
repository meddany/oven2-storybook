export const getWholeSpectrum = () => {
    const result = [];
    for (let i = 0; i < 768; i++) {
        result.push(( 9127.5 + (i * 0.625) ).toFixed(3) )
    }
    return result;
}
