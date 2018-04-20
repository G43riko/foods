const accentedLowerCharacters = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž";

const normalLowerCharacters = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz";
const accentedCharacters = accentedLowerCharacters + accentedLowerCharacters.toUpperCase();
const normalCharacters = normalLowerCharacters + normalLowerCharacters.toUpperCase();

const validEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validPhoneNumberRegex = /^\+?[0-9]*$/;

export function removeAccentedCharacters(word: string): string {
    if (!word) {
        return word;
    }
    return word.replace(/./g, (e: string) => {
        const index = accentedCharacters.indexOf(e);
        return index >= 0 ? normalCharacters[index] : e;
    });
}

export function getFormattedNumber(number: string, prefix = "+421"): string {
    number = number.replace(/[( )/-]/g, "");
    if (number.startsWith("+")) {
        return number;
    }
    if (number.startsWith("00")) {
        return number.substring(2);
    }
    if (number.startsWith("09") || number.startsWith("02")) {
        return prefix + number.substring(1);
    }
    return number;
}

export function isValidEmail(email: string): boolean {
    if (!email) {
        return false;
    }
    return validEmailRegex.test(email.trim());
}

export function isValidPhoneNumber(number: string): boolean {
    if (!number) {
        return false;
    }
    return validPhoneNumberRegex.test(number.trim());
}

export function contains(string: string, substring: string): boolean {
    return string.indexOf(substring) >= 0;
}

export function getLastPart(text: string, divider: string): string {
    if (!text) {
        return text;
    }
    const splitText = text.split(divider);
    if (splitText.length === 0) {
        return text;
    }
    return splitText[splitText.length - 1];
}
function fuzzy_match_simple(pattern: string, str: string): boolean {
    let patternIdx = 0;
    let strIdx = 0;
    const patternLength = pattern.length;
    const strLength = str.length;

    while (patternIdx !== patternLength && strIdx !== strLength) {
        const patternChar = pattern.charAt(patternIdx).toLowerCase();
        const strChar = str.charAt(strIdx).toLowerCase();
        if (patternChar === strChar) {
            ++patternIdx;
        }
        ++strIdx;
    }

    return patternLength !== 0 && strLength !== 0 && patternIdx === patternLength;
}
