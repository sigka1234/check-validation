const forKorean = (text: string, type: string) => {
    const checkEnd = _checkEnd(text)
    if (type === "이" || type === "가") {
        return checkEnd ? `${text}이` : `${text}가`
    } else if (type === "을" || type === "를"){
        return checkEnd ? `${text}을` : `${text}를`
    } else {
        return ""
    }
}

const _checkEnd = (text:string) => {
    const lastLetter = text[text.length - 1];
    const uni = lastLetter.charCodeAt(0);
    if (uni < 44032 || uni > 55203) return null;
    return (uni - 44032) % 28 != 0;
}

export default forKorean