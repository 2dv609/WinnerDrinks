import fetch from 'node-fetch';

export const formatAPIResponseString = (input: string) => {
  let spanTag = document.createElement('span')
  spanTag.innerHTML = input
  return spanTag.innerHTML
}

export const fetchQuestions = async (questionAmount: number) => {
  const fetchResponse = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}`);
  const jsonFetchResponse = await fetchResponse.json();
  return jsonFetchResponse.results;
}