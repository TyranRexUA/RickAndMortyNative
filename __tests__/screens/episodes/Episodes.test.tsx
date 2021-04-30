import React from 'react';
import { render, act, fireEvent, cleanup, RenderAPI } from '@testing-library/react-native';
import EpisodesScreen from '../../../src/screens/Episodes/EpisodesScreen';
import { MockedProvider } from '@apollo/client/testing';
import { getEpisodesQuery } from '../../../src/api/apiQuery';
import { getEpisodesPage1, getEpisodesPage2, getEpisodesWithFilter } from '../../../__mocks__/getEpisodes';
import {mockedNavigate} from '../../settings/setupTests';

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: mockedNavigate,
        dispatch: jest.fn(),
      }),
    };
  });

describe('EpisodesItem', () => {
    let wrapper: RenderAPI;
    const promise = Promise.resolve()

    const episodesMockPage1 = {
        request: {
            query: getEpisodesQuery,
            variables: { "page": 1, "name": "" },
        },
        result: getEpisodesPage1,
    };

    const episodesMockPage2 = {
        request: {
            query: getEpisodesQuery,
            variables: { "page": 2, "name": "" },
        },
        result: getEpisodesPage2,
    }

    const episodesMockWithFilterName = {
        request: {
            query: getEpisodesQuery,
            variables: { "page": 1, "name": "ab" },
        },
        result: getEpisodesWithFilter,
    }

    const errorMock = {
        request: {
            query: getEpisodesQuery,
            variables: { "page": 1, "name": "error" },
        },
        error: new Error(),
    }

    afterEach(cleanup)

    beforeEach(async () => {
        wrapper = render(
            <MockedProvider mocks={[episodesMockPage1, episodesMockPage2, episodesMockWithFilterName, errorMock]}>
                <EpisodesScreen />
            </MockedProvider>
        );
        await act(async () => promise)
    });

    test('with loader', async () => {
        await act(async () => {
            expect(wrapper.getByTestId('Loader')).toBeTruthy();
        })
    })

    test('With error', async () => {
        await act(async () => {
            await fireEvent(wrapper.getByTestId('TextInput'), 'onChangeText', 'error')
        })
        expect(wrapper.getByText(/not found/i)).toBeTruthy();
    })

    describe('with data', () => {
        const scroll = {
            nativeEvent: {
                contentSize: {
                    height: 200
                },
                layoutMeasurement: {
                    height: 50
                },

                contentOffset: {
                    y: 175,
                },
            },
        }

        beforeEach(async () => {
            await act(() => promise)
        });

        test('check Episodes', async () => {
            expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(20);
        });

        test('check navigation', async () => {
            await act(async () => {
                await fireEvent(wrapper.getAllByTestId('EpisodesItem')[0], 'onPress')
            })
            expect(mockedNavigate).toHaveBeenCalled();
        })

        test('check loadMore Episodes', async () => {
            await act(async () => {
                await fireEvent.scroll(wrapper.getByTestId('ScrollView'), scroll)
            })
            expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(40);
            await act(async () => {
                await fireEvent.scroll(wrapper.getByTestId('ScrollView'), scroll)
            })
            expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(40);
        })

        describe('check name Filter', () => {
            let inputText: React.ReactElement<{value: string}>;

            beforeEach(async () => {
                inputText = wrapper.getByTestId('TextInput');
                await act(async () => {
                    await fireEvent(inputText, 'onChangeText', 'ab')
                })
            });

            test('check value in TextInput', async () => {
                expect(inputText.props.value).toBe('ab');
            })

            test('check Episodes', async () => {
                expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(2);
            })

            test('check clearInputText', async () => {
                await act(async () => {
                    await fireEvent(wrapper.getByTestId('clearInputText'), 'press')
                })
                expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(20);
                expect(inputText.props.value).toBe('');
            })
        })

        test('Snapshot checking', async () => {
            expect(wrapper.toJSON()).toMatchSnapshot();
        })
    })

});