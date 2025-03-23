function capitalize(text) {
    try {
        return text[0].toUpperCase() + text.slice(1);
    } catch (err) {
        return text;
    }
}

export {capitalize};