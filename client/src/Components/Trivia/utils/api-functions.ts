/* eslint-disable import/prefer-default-export */
export const formatAPIResponseString = (input: string) => {
  const spanTag = document.createElement('span')
  spanTag.innerHTML = input
  return spanTag.innerHTML
}
