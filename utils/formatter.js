export const amountFormatter = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const amountParser = (value) => value.replace(/\$\s?|(,*)/g, '').replace(/[^0-9.]/g, '')
