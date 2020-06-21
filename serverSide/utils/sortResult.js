function compare(a, b) {
    const bandA = a.fileSizeBytes;
    const bandB = b.fileSizeBytes;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}

const sortBaseOnFileSize = (data) => {
    return data.sort(compare);
}

module.exports = {
    sortBaseOnFileSize,
}