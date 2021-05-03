export const formatAPIResponseString = (input: string) => {
  let spanTag = document.createElement('span')
  spanTag.innerHTML = input
  return spanTag.innerHTML
}
