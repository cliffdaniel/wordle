const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([aeio])\1+/g, '$1')
    .replace(/ñ/g, 'ñ');
}

export default removeAccents;