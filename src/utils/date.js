export const getLocalDateFromUTC = (utcString) => {
  const utcDate = new Date(utcString)
  return new Date(utcDate.getTime()-utcDate.getTimezoneOffset()*60000).toISOString().slice(0,10).replace(/-/g,'/')
}