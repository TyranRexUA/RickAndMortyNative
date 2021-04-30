import React from 'react';
import { render, act, fireEvent, cleanup, RenderAPI } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { getSingleEpisodeQuery } from '../../../src/api/apiQuery';
import { getEpisodeWithID1 } from '../../../__mocks__/getSingleEpisode';
import { mockedNavigate } from '../../settings/setupTests';
import SingleEpisodeScreen from '../../../src/screens/SingleEpisode/SingleEpisodeScreen';

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

    const episodeMock = {
        request: {
            query: getSingleEpisodeQuery,
            variables: { id: "1" },
        },
        result: getEpisodeWithID1,
    };

    const errorMock = {
        request: {
            query: getSingleEpisodeQuery,
            variables: { id: "1" },
        },
        error: new Error(),
    }

    afterEach(cleanup)

    beforeEach(async () => {
        wrapper = render(
            <MockedProvider mocks={[episodeMock]}>
                <SingleEpisodeScreen />
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
                <SingleEpisodeScreen />
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
            expect(wrapper.getAllByTestId('CharactersItem').length).toBe(19);
        });

        test('check navigation', async () => {
            await act(async () => {
                await fireEvent(wrapper.getAllByTestId('CharactersItem')[0], 'onPress')
            })
            expect(mockedNavigate).toHaveBeenCalled();
        })

        test('Snapshot checking', async () => {
            expect(wrapper.toJSON()).toMatchSnapshot();
        })
    })

});