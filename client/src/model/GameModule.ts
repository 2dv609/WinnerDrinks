export interface IGameModuleSetting {
    name: string,
    active: boolean,
    enable: boolean,
    index: number
}

/**
 * Class containing values for implemented game modules in the application
 */
export default class GameModule {
    readonly TRIVIA = 'trivia'
    readonly PARTY = 'party'
    readonly BACK_TO_BACK = 'back-to-back'

    /**
     * Get game module names to use for api calls and indexeDB tables.
     *
     * @returns {string[]} - Array of string for api calls and indexedDB tables.
     */
    public getNames(): string[] {
      return [
        this.TRIVIA,
        this.PARTY,
        this.BACK_TO_BACK
      ]
    }

    /**
     * Get default game module settings.
     *
     * @returns {IGameModuleSetting[]} - An array of game module settings.
     */
    public getSettings(): IGameModuleSetting[] {
      return [
        { name: 'Wheel', enable: true, active: true, index: 0 },
        { name: 'Party', enable: true, active: true, index: 1 },
        { name: 'BackToBack', enable: false, active: false, index: 2 },
        { name: 'Trivia', enable: true, active: true, index: 3 },
      ]
    }
}
