import React from 'react';
import ReactDOM from 'react-dom';
import Trivia from '../../../Components/Trivia/Trivia'
import QuestionCard from '../../../Components/Trivia/QuestionCard'
import { render, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import { getGameService, getGameModuleService } from '../../../model/ModelFactory'
import GameService from '../../../model/GameService'
import IGameModuleService from '../../../model/IGameModuleService'
import Player from '../../../model/Player'
import { playersMock, gameServiceMock } from '../mock/TestMock'
import { formatAPIResponseString } from '../../../Components/Trivia/utils/api-functions'
import { v1 as uuidv1 } from 'uuid'
import fs from 'fs-extra'
import { join } from 'path'

/* --------------------------------- */
/* Test cases for game module trivia. */
/* --------------------------------- */

describe('Test suite for game module party', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    type RawTriviaEvent = {
        question: string
    }

    let triviaEvents: RawTriviaEvent[] 
    
    const gameService: GameService = getGameService()
    const currentPlayer: Player[] = gameService.getPlayers(1, playersMock)
    const handleAnswerMock = (e: any) => {
        gameServiceMock.addScore(currentPlayer[0])
        gameServiceMock.makeWinnerAlert(null)
        gameServiceMock.chooseRandomNewGame()
    }
    const triviaQuestionMock: IParty | ITrivia | IBackToBack = {
        _id: 'mockID',
        category: 'mock',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is not a wind instrument?',
        correct_answer: 'Viola',
        incorrect_answers: [
          'Oboe',
          'Trombone',
          'Duduk'
        ]
    }

    beforeAll(async () => {
        const partyEventsPath: string = join( __dirname, '../../../../../server/data/trivia.json')
        triviaEvents = await fs.readJson(partyEventsPath)
    })

    test('Game module trivia should use props gameService, gameEvent and currentPlayers', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Trivia currentPlayers={currentPlayer} gameService={gameServiceMock} gameEvent={triviaQuestionMock}></Trivia>, div)
    })

    test('T1.MT.S.1: Trivia game events should contain at least 20 game events', () => {
        if (!triviaEvents) {
            return
        }

        expect(triviaEvents.length >= 20).toBeTruthy()
    })

    test('T1.MT.S.2: Trivia game events should contain only unique game events', () => {
        if (!triviaEvents) {
            return
        }

        const questions: string[] = []
        
        triviaEvents.forEach((event: RawTriviaEvent ):void => {
            questions.push(event.question)
        })

        expect(questions.length === new Set(questions).size).toBeTruthy()
    })

    test('T1.MT.S.3: Trivia game events should not have more than 60 words', () => {
        if (!triviaEvents) {
            return
        }

        triviaEvents.forEach((event: RawTriviaEvent ) => {
            expect(event.question.split(' ').length <= 60).toBeTruthy()
        })
    })


    test('T1.MT.UI.1: Trivia game events should contain 1 active game participant\'s name', () => {
        const { getByTestId } = render(<Trivia currentPlayers={currentPlayer} gameService={gameServiceMock} gameEvent={triviaQuestionMock}></Trivia>)
        expect(getByTestId('current-player')).toHaveTextContent(currentPlayer[0].name)
    })

    test('T1.MT.UI.2: Game module trivia should display a trivia game event', () => {
        const { getByTestId } = render(<Trivia currentPlayers={currentPlayer} gameService={gameServiceMock} gameEvent={triviaQuestionMock}></Trivia>)
        expect(getByTestId('current-player')).toHaveTextContent(currentPlayer[0].name)
        expect(getByTestId('game-event')).toHaveTextContent(triviaQuestionMock.question)

    })

    test('T1.MT.UI.3: Select a trivia event winner should trigger transition to next game round, button 0', () => {
        const { getByTestId } = render(<QuestionCard answer={formatAPIResponseString('mockAnswer')} handleAnswer={handleAnswerMock} key={uuidv1()}></QuestionCard>)
        
        const addScoreSpy = jest.spyOn(gameServiceMock, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameServiceMock, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameServiceMock, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('answer-alternatives'))
        expect(addScoreSpy).toBeCalled()
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })
})
