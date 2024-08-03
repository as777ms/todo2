export function multipleBase64(files) {
    let base64s = []
    for (let i = 0; i < files.length; i++) {
        base64s.push(files[i].base64)
    }
    return base64s
}
