import forKorean from "./forKorean"

const _success = { result: true, message: "" }

const _fail = (message: string) => ({ result: false, message: message })

const regExps = {
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    number: /^[0-9]*$/i,
    korean: /^[가-힣]*$/i,
    english: /^[a-zA-Z]*$/i,
    englishNumber: /^[a-zA-Z0-9]*$/i,
    phone: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
}

const messages = (name: string, compare: string = "", locale = "en") => {
    const en = {
        required: `${name} is required`,
        email: `${name} needs email format`,
        number: `${name} is not number`,
        phone: `${name} needs phone format`,
        korean: `${name} is not in Korean`,
        english: `${name} is not in English`,
        englishNumber: `${name} is not match in English or Number`,
        match: `${name} is not match with ${compare}`,
        min: `The minimum ${name} is ${compare}`,
        max: `The maximum ${name} is ${compare}`,
        length: `${name} must be ${compare} lengths`,
        minLength: `${name} must be more than ${compare} lengths`,
        maxLength: `${name} must be less than ${compare} lengths`,
    }

    const ko = {
        required: `${name} 입력 바랍니다`,
        email: `${name} 형식에 맞지 않습니다`,
        number: `${name} 숫자가 아닙니다`,
        phone: `${name} 형식에 맞지 않습니다`,
        korean: `${name} 한글로 입력 바랍니다`,
        english: `${name} 영어로 입력 바랍니다`,
        englishNumber: `${name} 영어 또는 숫자로 입력 바랍니다`,
        match: `${name} 일치하지 않습니다`,
        min: `${name} 최소값은 ${compare}입니다`,
        max: `${name} 최대값은 ${compare}입니다`,
        length: `${name} 글자수는 ${compare}자리이어야 합니다`,
        minLength: `${name} 글자수는 ${compare}자리 초과이어야 합니다`,
        maxLength: `${name} 글자수는 ${compare}자리 미만이어야 합니다`,
    }

    return locale === "ko" ? ko : en
}

const setMessage = (key: string, value: any, ruleValue: string, locale: string = "en", korean: string, compare : string = "") => {
    if (ruleValue === "required"
        || ruleValue === "email"
        || ruleValue === "number"
        || ruleValue === "phone"
        || ruleValue === "korean"
        || ruleValue === "english"
        || ruleValue === "englishNumber"
        || ruleValue === "match"
        || ruleValue === "min"
        || ruleValue === "max"
        || ruleValue === "length"
        || ruleValue === "minLength"
        || ruleValue === "maxLength"
    ) {
        const name = value && value.title ? value.title : key
        return value[ruleValue] ? value[ruleValue] : (locale === "ko" ? messages(forKorean(name, korean), compare ,locale)[ruleValue] : messages(name, compare ,locale)[ruleValue])
    } else {
        return "Unknown Error"
    }
}

const basicExecute = (data: any, key: string, value: any, title: string, ruleValue: string, locale: string = "en") => {
    let result = _success
    let message = ""
    switch (ruleValue) {
        case "required" :
            message = setMessage(key, value, ruleValue, locale, "이")
            result = _required(data, message)
            break
        case "email" :
            message = setMessage(key, value, ruleValue, locale, "이")
            result = _regExp(data, regExps.email, message)
            break
        case "number" :
            message = setMessage(key, value, ruleValue, locale, "을")
            result = _regExp(data, regExps.number, message)
            break
        case "phone" :
            message = setMessage(key, value, ruleValue, locale, "을")
            result = _regExp(data, regExps.phone, message)
            break
        case "korean" :
            message = setMessage(key, value, ruleValue, locale, "을")
            result = _regExp(data, regExps.korean, message)
            break
        case "english" :
            message = setMessage(key, value, ruleValue, locale, "을")
            result = _regExp(data, regExps.english, message)
            break
        case "englishNumber" :
            message = setMessage(key, value, ruleValue, locale, "을")
            result = _regExp(data, regExps.englishNumber, message)
            break
    }
    return result
}

const inValueExecute = (data: any, key: string, value: any, title: string, ruleValue: string, locale: string = "en") => {
    let result = _success
    let message = ""
    const getKey = _getKey(ruleValue)
    ruleValue = ruleValue.substr(0, (ruleValue.indexOf('[')))
    switch (ruleValue) {
        case "min" :
            message = setMessage(key, value, ruleValue, locale, "이", getKey.key)
            result = _min(data, getKey.key, message)
            break
        case "max" :
            message = setMessage(key, value, ruleValue, locale, "이", getKey.key)
            result = _max(data, getKey.key, message)
            break
        case "minLength" :
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key)
            result = _minLength(data, getKey.key, message)
            break
        case "maxLength" :
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key)
            result = _maxLength(data, getKey.key, message)
            break
        case "length" :
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key)
            result = _length(data, getKey.key, message)
            break
    }
    return result
}

const matchExecute = (data: any, key: string, value: any, title: string, ruleValue: string, locale: string = "en", state: any) => {
    let result = _success
    let message = ""
    const getKey = _getKey(ruleValue)
    ruleValue = ruleValue.substr(0, (ruleValue.indexOf('[')))
    if (getKey.result) {
        message = setMessage(key, value, ruleValue, locale, "이", getKey.key)
        result = _match(data, _checkDepth(state, getKey.key), message)
    } else {
        return _fail(`you need compare data of ${key}`)
    }
    return result
}

const validation = (state: object, validations: object, locale = "en") => {
    let validate = _success
    Object.entries(validations).some(([key, value]) => {
        const data = _checkDepth(state, key)
        const rules = typeof value === "string" ? value : value.rules
        if (!rules) {
            validate = _fail(`${key} rule does not exist`)
        } else {
            const rulesArray = rules.split("|")
            rulesArray.map((ruleValue: any) => {
                if (validate.result && (ruleValue === "required"
                    || ruleValue === "email"
                    || ruleValue === "number"
                    || ruleValue === "phone"
                    || ruleValue === "korean"
                    || ruleValue === "english"
                    || ruleValue === "englishNumber"
                )) {
                    validate = basicExecute(data, key, value, value.title, ruleValue, locale)
                }

                if (validate.result && ruleValue.indexOf('match[') >= 0) validate = matchExecute(data, key, value, value.title, ruleValue, locale, state)

                if (validate.result && (ruleValue.indexOf('min[') >= 0
                    || ruleValue.indexOf('max[') >= 0
                    || ruleValue.indexOf('minLength[') >= 0
                    || ruleValue.indexOf('maxLength[') >= 0
                    || ruleValue.indexOf('length[') >= 0
                )) {
                    validate = inValueExecute(data, key, value, value.title, ruleValue, locale)
                }

                return !validate.result
            })
        }
        return !validate.result
    })

    return validate
}

const _returnData = (data: boolean, message: string = "") => data ? _success : _fail(message)

const _required = (data: any, message: string) => _returnData(data, message)

const _regExp = (data: any, regExp: any, message: string) => data ? _returnData(regExp.test(data), message) : _success

const _match = (data: any, matchData: any, message: string) => data ? _returnData(data.toString() === matchData.toString(), message) : _success

const _min = (data: any, min: any, message: string) => data ?  _returnData(Number(data) >= Number(min), message) : _success

const _max = (data: any, max: any, message: string) => data ?  _returnData(Number(data) <= Number(max), message) : _success

const _minLength = (data: any, min: any, message: string) => data ?  _returnData(data.length >= Number(min), message) : _success

const _maxLength = (data: any, max: any, message: string) => data ?  _returnData(data.length <= Number(max), message) : _success

const _length = (data: any, max: any, message: string) => data ?  _returnData(data.length === Number(max), message) : _success

const _checkDepth = (state: any, str: string = ''): any => {
    if (str.indexOf('.') >= 0) {
        let array = str.split('.')
        str = str.substring((
            str.indexOf('.') + 1
        ), str.length)
        return _checkDepth(state[array[0]], str)
    } else {
        return state[str]
    }
}

const _getKey = (value: string) => {
    const leftIndex = value.indexOf('[')
    const rightIndex = value.indexOf(']')
    if (leftIndex > 0 && rightIndex > 0) return { result: true, key: value.substring(leftIndex + 1, rightIndex) }
    else return { result: false, key: "" }
}

export default validation