import React from 'react';
import { render, act, fireEvent, cleanup, RenderAPI, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../../src/navigators/AppNavigator/AppNavigator';
import { getEpisodesQuery, getSingleEpisodeQuery, getCharactersQuery, getSingleCharacterQuery } from '../../../src/api/apiQuery';
import { getCharactersPage1 } from '../../../__mocks__/getCharacters';
import { getEpisodesPage1 } from '../../../__mocks__/getEpisodes';
import { getCharacterWithID1 } from '../../../__mocks__/getSingleCharacter';
import { getEpisodeWithID1 } from '../../../__mocks__/getSingleEpisode';

describe('AppNavigator', () => {
    let wrapper: RenderAPI;
    const promise = Promise.resolve()

    const episodesMockPage1 = {
        request: {
            query: getEpisodesQuery,
            variables: { "page": 1, "name": "" },
        },
        result: getEpisodesPage1,
    };

    const episodeMock = {
        request: {
            query: getSingleEpisodeQuery,
            variables: { id: "1" },
        },
        result: getEpisodeWithID1,
    };

    const charactersMockPage1 = {
        request: {
            query: getCharactersQuery,
            variables: { "page": 1, "name": "" },
        },
        result: getCharactersPage1,
    };

    const characterMock = {
        request: {
            query: getSingleCharacterQuery,
            variables: { id: "1" },
        },
        result: getCharacterWithID1,
    };

    afterEach(cleanup)

    beforeEach(async () => {
        wrapper = render(
            <MockedProvider mocks={[episodesMockPage1, episodeMock, charactersMockPage1, characterMock]}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </MockedProvider>
        );
        await act(async () => promise)
    });

    test('Snapshot checking', async () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    })

    test('with Episodes btn', async () => {
        await act(async () => {
            expect(wrapper.getByTestId('EpisodesTab')).toBeTruthy();
        })
    })

    test('with Characters btn', async () => {
        await act(async () => {
            expect(wrapper.getByTestId('CharactersTab')).toBeTruthy();
        })
    })

    describe('EpisodesStackNavigator', () => {
        afterEach(cleanup)

        test('Init screen with Episodes Titile', async () => {
            await act(async () => {
                expect(wrapper.getAllByText('Episodes').length).toBe(2);
            })
        })

        describe('SingleEpisode Screen', () => {
            beforeEach(async () => {
                await act(async () => {
                    await fireEvent(wrapper.getAllByTestId('EpisodesItem')[0], 'onPress')
                })
            })

            afterEach(cleanup)

            test('with Episode Title', async () => {
                expect(wrapper.getByText('Episode 1')).toBeTruthy();
            })

            test('with goToInitScreen Btn', async () => {
                expect(wrapper.getByTestId('goToInitScreen')).toBeTruthy();
                await act(async () => {
                    await fireEvent(wrapper.getByTestId('goToInitScreen'), 'onPress')
                })
                expect(wrapper.getAllByText('Episodes').length).toBe(2);
            })
        })
    })

    describe('CharactersStackNavigator', () => {
        beforeEach(async () => {
            await act(async () => {
                await wrapper.getByTestId('CharactersTab').props.onClick()
            })
            await act(async () => promise)
        })

        afterEach(cleanup)

        test('Init screen with Characters Titile', async () => {
            await act(async () => {
                expect(wrapper.getAllByText('Characters').length).toBe(2);
            })
            await act(async () => promise)
        })

        describe('SingleCharacter Screen', () => {
            beforeEach(async () => {
                await act(async () => {
                    await fireEvent(wrapper.getAllByTestId('CharactersItem')[0], 'onPress')
                })
                await act(async () => promise)
                await act(async () => promise)
            })

            afterEach(cleanup)

            test('with Character Title', async () => {
                await waitFor(async () => {
                    await expect(wrapper.getAllByText('Rick Sanchez').length).toBe(3);
                })
            })

            test('with goToInitScreen Btn', async () => {
                expect(wrapper.getByTestId('goToInitScreen')).toBeTruthy();
                await act(async () => {
                    await fireEvent(wrapper.getByTestId('goToInitScreen'), 'onPress')
                })
                expect(wrapper.getAllByText('Characters').length).toBe(2);
            })
        })
    })
});