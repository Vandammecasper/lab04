export default () => {
    const checkContrast = (rgb: string) => {
        const rgbChannels = rgb.split(',')
        const r = rgbChannels[0].substring(4),
        g = rgbChannels[1].trim(),
        b = rgbChannels[2].substring(rgbChannels[2].length).trim()

        const luminance = 1-(0.299 * +r + 0.587 * +g + 0.114 * +b) /255

        let lightness = 250
        if (luminance > 0.5) lightness = 3

        return `rgb(${lightness}, ${lightness}, ${lightness}))`
    }
    return {checkContrast}
}