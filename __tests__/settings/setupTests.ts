import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => { };

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

export const mockedNavigate = jest.fn()

jest.mock("@react-navigation/core", () => {
  const actualNav = jest.requireActual("@react-navigation/core");
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        id: '1'
      },
    }),
  };
});