import { extendTheme } from '@chakra-ui/react';

export const myNewTheme = extendTheme({
    colors: {
        a: 'black',
        primary: {
            10: '#FDF5DF',
            50: '#FEF8E7',
            100: '#FBEABC',
            200: '#F8DD91',
            300: '#F5CF65',
            400: '#F3C23A',
            500: '#F0B40F',
            600: '#C0900C',
            700: '#906C09',
            800: '#604806',
            900: '#302403',
        },
        secondary: {
            50: '#ECF7F8',
            100: '#CBEAEC',
            200: '#A9DCE0',
            300: '#88CFD3',
            400: '#66C1C7',
            500: '#44B4BB',
            600: '#379095',
            700: '#296C70',
            800: '#1B484B',
            900: '#0E2425',
        },
        backing: {
            50: '#FEE6F1',
            100: '#FDBAD7',
            200: '#FC8DBD',
            300: '#FA60A3',
            400: '#F93489',
            500: '#F80770',
            600: '#C60659',
            700: '#950443',
            800: '#63032D',
            900: '#320116',
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontSize: 'sm',
                rounded: 'full',
                bg: 'secondary.500',
                color: 'white',
                boxShadow:
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                _hover: { bg: 'secondary.300' },
                _focus: { bg: 'secondary.500' },
            },
            variants: {
                base: {},
                delete: {
                    width: '50%',
                    alignSelf: 'center',
                    mt: 2,
                    bg: 'red.500',
                    _hover: { bg: 'red.400' },
                    _focus: { bg: 'red.500' },
                },
                secondary: {
                    // width: '50%',
                    alignSelf: 'center',
                    // mt: 2,
                    bg: 'primary.500',
                    _hover: { bg: 'primary.400' },
                    _focus: { bg: 'primary.500' },
                },
            },
            defaultProps: {
                variant: 'base',
            },
        },
        FormLabel: {
            baseStyle: {
                color: 'secondary.500',
            },
        },
        Select: {
            baseStyle: {
                focusBorderColor: 'secondary.300',
            },
        },
    },
});
