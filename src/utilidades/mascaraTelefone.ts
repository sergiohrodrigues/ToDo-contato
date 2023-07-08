export const mascaraTelefone = (phone: string) => {
    const semMascara = phone.replace(/\D/g, '');
    const { length } = semMascara

    if (length <= 11){
        return semMascara
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2')
    }

    return phone;
}