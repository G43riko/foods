import {StringMap} from "../interfaces/string-map";

const accentedLowerCharacters = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž";
const normalLowerCharacters   = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz";
const accentedCharacters      = accentedLowerCharacters + accentedLowerCharacters.toUpperCase();
const normalCharacters        = normalLowerCharacters + normalLowerCharacters.toUpperCase();

const validEmailRegex       = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const validPhoneNumberRegex = /^([+]|00)?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{2,3}[-\s.]?[0-9]{2,6}([-\s.]?[0-9]{3})?$/im;

/* TODO:
    static underscore(word) {
    }
    static humanize(word) {
    }
    static dasherize(word) {
    }
    //dashCase = a-b-c-d-e
    //dotCase a.c.d.v.s.d
    //pascalCase = FooBarBaz
    //pathCase = a/b/c/d
    //snakeCase = a_b_c_d_
    static isUpper(word) {
    }
    static isLower(word) {
    }
*/

export class StringUtils {
    public static removeAccentedCharacters(word: string): string {
        if (!word || !word.replace) {
            return word;
        }

        return word.replace(/./g, (e: string) => {
            const index = accentedCharacters.indexOf(e);

            return index >= 0 ? normalCharacters[index] : e;
        });
    }

    public static join(data: string[], delimiter = " ", prefix = "", postfix = ""): string {
        if (!Array.isArray(data)) {
            return prefix + data + postfix;
        }

        return `${prefix}${data.join(delimiter)}${postfix}`;
    }

    public static toCapital(text: string): string {
        return text.replace(/./, (e) => e.toUpperCase());
    }

    public static getLastPart(text: string, divider = " "): string {
        if (!text || !text.split) {
            return text;
        }
        const splitText = text.split(divider);

        return splitText[splitText.length - 1];
    }

    public static count(text: string, key: string): number {
        return (text.match(new RegExp(key, "g")) || []).length;
    }

    /**
     * @param text
     * @param count
     * @deprecated - use {@link String#repeat}
     */
    public static repeat(text: string, count: number): string {
        return new Array(count + 1).join(text);
    }

    public static removeAll(text: string, words: string[]): string {
        return text.replace(new RegExp(`(${words.join("|")})`, "g"), "");
    }

    // TODO: need to be fixed
    public static template(text: string, values: StringMap, start = "{{", end = "}}"): string {
        start         = start.replace(/[-[\]()*\s]/g, "\\$&")
                             .replace(/\$/g, "\\$");
        end           = end.replace(/[-[\]()*\s]/g, "\\$&")
                           .replace(/\$/g, "\\$");
        const regexp  = new RegExp(`${start}(.+?)'${end}`, "g");
        const matches = text.match(regexp) || [];

        matches.forEach((match) => {
            const key   = match.substring(start.length, match.length - end.length)
                               .trim();
            const value = values[key];
            if (value) {
                text = text.replace(match, value);
            }
        });

        return text;
    }

    public static removeEmptyLines(content: string): string {
        return content.replace(/^\s*$(?:\r\n?|\n)/gm, "");
    }

    public static between(text: string, key1: string, key2: string): string {
        const startPos = text.indexOf(key1);
        const endPos   = text.indexOf(key2);
        if (startPos < 0 && endPos >= 0) {
            return text.substring(0, endPos);
        } else if (endPos < 0 && startPos >= 0) {
            return text.substring(startPos + key1.length, text.length);
        } else {
            return text.substring(startPos + key1.length, endPos);
        }
    }

    public static occurrences(text: string, key: string): number {
        return (text.match(new RegExp(key, "g")) || []).length;
    }

    public static collapseWhitespace(text: string): string {
        return text.replace(/[\s\uFEFF\xA0]{2,}/g, " ");
    }

    public static capitalize(text: string): string {
        return text.toLowerCase()
                   .replace(/^./, (char) => char.toUpperCase());
    }

    public static isEmpty(thisArg: string): boolean {
        return !thisArg || /^[\s\xa0]*$/.test(thisArg);
    }

    public static swapCase(text: string): string {
        return text.replace(/\S/g, (char) => {
            const lowerCase = char.toLowerCase();

            return lowerCase === char ? char.toUpperCase() : lowerCase;
        });
    }

    public static transformToBasicFormat(text: string): string {
        return StringUtils.collapseWhitespace(StringUtils.removeAccentedCharacters(text)
                                                         .toLowerCase()).trim();
    }

    public static isValidEmail(email: string): boolean {
        if (!email) {
            return false;
        }

        return validEmailRegex.test(email.trim());
    }

    public static getAsciiArray(thisArg: string): number[] {
        const result = [];
        for (const letter of thisArg) {
            result[result.length] = letter.charCodeAt(0);
        }

        return result;
    }

    public static isValidPhoneNumber(num: string): boolean {
        if (!num) {
            return false;
        }

        return validPhoneNumberRegex.test(num.trim());
    }

    public static toBasicForm(text: string): string {
        return StringUtils.removeAccentedCharacters(text.toLowerCase());
    }

    public static contains(text: string, substring: string): boolean {
        return !!text && StringUtils.removeAccentedCharacters(text.toLowerCase())
                                    .indexOf(substring) >= 0;
    }

    public static joinSingle(prefix: string, divider: string, postfix: string): string {
        if (postfix.startsWith(divider) && prefix.endsWith(divider)) {
            return prefix + postfix.substring(divider.length);
        }

        if (postfix.startsWith(divider) || prefix.endsWith(divider)) {
            return prefix + postfix;
        }

        return prefix + divider + postfix;
    }

    public static getFormattedNumber(num: string, prefix = "+421"): string {
        num = num.replace(/[( )/-]/g, "");
        if (num.startsWith("+")) {
            return num;
        }
        if (num.startsWith("00")) {
            return num.substring(2);
        }
        if (num.startsWith("09") || num.startsWith("02")) {
            return prefix + num.substring(1);
        }

        return num;
    }
}

function fuzzy_match_simple(pattern: string, str: string): boolean {
    let patternIdx      = 0;
    let strIdx          = 0;
    const patternLength = pattern.length;
    const strLength     = str.length;

    while (patternIdx !== patternLength && strIdx !== strLength) {
        const patternChar = pattern.charAt(patternIdx)
                                   .toLowerCase();
        const strChar     = str.charAt(strIdx)
                               .toLowerCase();
        if (patternChar === strChar) {
            ++patternIdx;
        }
        ++strIdx;
    }

    return patternLength !== 0 && strLength !== 0 && patternIdx === patternLength;
}
