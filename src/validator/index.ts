export function fullNameValidator(value: string | null | undefined): boolean {
    if (value) return /^[A-Za-z]+(?: [A-Za-z]+)+(?: [A-Za-z]+)$/.test(value?.trim());

    return true;
}

export function phoneNumberValidator(value: string | null | undefined): boolean {
    if (value) return /^((9)|(7)|(2519)|(2517)|(\+2519)|(\+2517))\d{8}$/.test(value);

    return true;
}
export function passwordValidator(value: string | null | undefined): boolean {
    if (value) return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value);

    return true;
}

export const MAX_FILE_SIZE = 104857600; //1MG

const validFileExtensions = { image: ["jpg", "gif", "png", "jpeg", "svg", "webp"] };

export function isValidFileType(fileName: string): boolean {
    return (fileName ?? "").length > 0 ? validFileExtensions["image"].indexOf(fileName.split(".")?.pop() ?? "undefined") > -1 : true;
}

export function isLessThan1MG(value: any): boolean {
    return value ? Number(value.size) <= MAX_FILE_SIZE : true;
}
