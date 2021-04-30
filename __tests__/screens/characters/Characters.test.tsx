import React from 'react';
import { render, act, fireEvent, cleanup, RenderAPI } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { getCharactersQuery } from '../../../src/api/apiQuery';
import {mockedNavigate} from '../../settings/setupTests';
import CharactersScreen from '../../../src/screens/Characters/CharactersScreen';
import { getCharactersPage1, getCharactersPage2, getCharactersWithFilter } from '../../../__mocks__/getCharacters';

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

describe('CharactersItem', () => {
    let wrapper: RenderAPI;
    const promise = Promise.resolve()

    const charactersMockPage1 = {
        request: {
            query: getCharactersQuery,
            variables: { "page": 1, "name": "" },
        },
        result: getCharactersPage1,
    };

    const charactersMockPage2 = {
        request: {
            query: getCharactersQuery,
            variables: { "page": 2, "name": "" },
        },
        result: getCharactersPage2,
    }

    const charactersMockWithFilterName = {
        request: {
            query: getCharactersQuery,
            variables: { "page": 1, "name": "ab" },
        },
        result: getCharactersWithFilter,
    }

    const errorMock = {
        request: {
            query: getCharactersQuery,
            variables: { "page": 1, "name": "error" },
        },
        error: new Error(),
    }

    afterEach(cleanup)

    beforeEach(async () => {
        wrapper = render(
            <MockedProvider mocks={[charactersMockPage1, charactersMockPage2, charactersMockWithFilterName, errorMock]}>
                <CharactersScreen />
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

        test('check Characters', async () => {
            expect(wrapper.getAllByTestId('CharactersItem').length).toBe(20);
        });

        test('check navigation', async () => {
            await act(async () => {
                await fireEvent(wrapper.getAllByTestId('CharactersItem')[0], 'onPress')
            })
            expect(mockedNavigate).toHaveBeenCalled();
        })

        test('check loadMore Characters', async () => {
            await act(async () => {
                await fireEvent.scroll(wrapper.getByTestId('ScrollView'), scroll)
            })
            expect(wrapper.getAllByTestId('CharactersItem').length).toBe(40);
            await act(async () => {
                await fireEvent.scroll(wrapper.getByTestId('ScrollView'), scroll)
            })
            expect(wrapper.getAllByTestId('CharactersItem').length).toBe(40);
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

            test('check Characters', async () => {
                expect(wrapper.getAllByTestId('CharactersItem').length).toBe(11);
            })

            test('check clearInputText', async () => {
                await act(async () => {
                    await fireEvent(wrapper.getByTestId('clearInputText'), 'press')
                })
                expect(wrapper.getAllByTestId('CharactersItem').length).toBe(20);
                expect(inputText.props.value).toBe('');
            })
        })

        test('Snapshot checking', async () => {
            expect(wrapper.toJSON()).toMatchSnapshot();
        })
    })

});