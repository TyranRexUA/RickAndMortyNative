import React from 'react';
import { render, act, fireEvent, cleanup, RenderAPI } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { getSingleCharacterQuery } from '../../../src/api/apiQuery';
import { mockedNavigate } from '../../settings/setupTests';
import SingleCharacterScreen from '../../../src/screens/SingleCharacter/SingleCharacterScreen';
import { getCharacterWithID1 } from '../../../__mocks__/getSingleCharacter';

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

    const characterMock = {
        request: {
            query: getSingleCharacterQuery,
            variables: { id: "1" },
        },
        result: getCharacterWithID1,
    };

    const errorMock = {
        request: {
            query: getSingleCharacterQuery,
            variables: { id: "1" },
        },
        error: new Error(),
    }

    afterEach(cleanup)

    beforeEach(async () => {
        wrapper = render(
            <MockedProvider mocks={[characterMock]}>
                    <SingleCharacterScreen />
            </MockedProvider>
        );
        await act(async () => promise)
    });

    test('with loader', async () => {
        await act(async () => {
            await expect(wrapper.getByTestId('Loader')).toBeTruthy();
        })
    })

    test('With error', async () => {
        const errorWrapper = render(
            <MockedProvider mocks={[errorMock]}>
                <SingleCharacterScreen />
            </MockedProvider>
        );
        await act(async () => promise)
        expect(errorWrapper.getByText(/error/i)).toBeTruthy();
    })

    describe('with data', () => {

        beforeEach(async () => {
            await act(() => promise)
        });

        test('check Episodes', async () => {
            expect(wrapper.toJSON()).toMatchSnapshot();
            expect(wrapper.getAllByTestId('EpisodesItem').length).toBe(41);
        });

        test('check navigation', async () => {
            await act(async () => {
                await fireEvent(wrapper.getAllByTestId('EpisodesItem')[0], 'onPress')
            })
            expect(mockedNavigate).toHaveBeenCalled();
        })

        test('Snapshot checking', async () => {
            expect(wrapper.toJSON()).toMatchSnapshot();
        })
    })

});