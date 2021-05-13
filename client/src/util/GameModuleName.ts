/**
 * Enum containing game module names. These names
 * are used for the indexedDB tables and the api calls
 * for each game module. 
 */
export enum  GameModuleName {
    TRIVIA = 'trivia',
    PARTY = 'party',
    BACK_TO_BACK = 'back-to-back'
}

/**
 * Helper function to iterate through the values of a string enum.
 * Ref: https://www.petermorlion.com/iterating-a-typescript-enum/.
 * 
 * @param obj - The string enum class to ierate over.  
 * 
 * @returns The keys of the string enum.
 */
export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

