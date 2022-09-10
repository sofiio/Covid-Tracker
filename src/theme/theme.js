import { createTheme } from "@mui/material";

const white = '#ffffff'
const primaryColor = '#edeced'
const darkGrey = 'rgb(91 93 114)'
const grey = 'rgb(38 42 52)'

const blue = 'rgb(50 115 255)'
const blue100 = 'rgb(24 26 32)'
const blue300 = 'rgb(38 40 50)'
const blue400 = 'rgb(37 39 46)'


const darkBlueText = 'rgb(130 129 145)'

const customTheme = createTheme({
    typography: {
        fontFamily: `'inter', sans-serif`
    },
    palette: {
        primary: { main: white, light: grey },
        secondary: { main: white },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: blue300,
                    boxShadow: 'none',
                    borderRadius: 22
                },
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    borderRadius: 22,
                    padding: 24
                }
            }
        },
        // SEARCH
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: 'white',
                    maxWidth: 300,
                    height: 44,
                    borderRadius: 50,
                    backgroundColor: blue100,
                    fontSize: 14,
                    fontWeight: 400,
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '&.MuiOutlinedInput-input': {
                        color: white,
                    },
                    '& label.Mui-focused': {
                        color: darkBlueText,
                    },

                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none'
                        },
                        '&:hover fieldset': {
                            borderColor: white,
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        }
                    }
                }
            }
        },

        // TOGGLE
        MuiToggleButton: {
            styleOverrides: {
                sizeMedium: {
                    height: 40,
                    padding: '0 1rem',
                    color: darkBlueText,
                    border: 'none',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    borderRadius: '50px !important',
                    "&.Mui-selected": {
                        color: white,
                        backgroundColor: blue,
                    },
                    "&:hover": {
                        color: white,
                        backgroundColor: blue100
                    },
                    ":not(:last-child)": {
                        marginRight: '1rem'
                    }
                }
            }
        },

        // TABLE
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: white
                }
            }
        },

        // BUTTON
        MuiButton: {
            styleOverrides: {
                secondary: {
                    color: primaryColor,
                    '&.Mui-disabled': {
                        color: darkGrey,
                        border: 'none'
                    },
                },
                sizeMedium: {
                    backgroundColor: blue,
                    color: primaryColor,
                    height: '44px',
                    padding: '0 20px',
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: 'Capitalize',
                    borderRadius: 50,
                    lineHeight:1,
                    ':hover': {
                        backgroundColor: blue400,
                        color: primaryColor
                    },
                    '&.Mui-disabled': {
                        color: darkGrey,
                        border: 'none'
                    },

                }
            },
        },


        // Modal
        MuiModal: {
            variants: [
                {
                    props: { variant: 'countriesList' },
                    style: {
                        padding: '4rem',
                        '& .MuiBox-root': {
                            color: 'red',
                            backgroundColor: blue400,
                            borderRadius: '24px',
                            position: 'relative',
                            width: '90%',
                            height: '90%',
                            margin: '0 auto !important',
                            padding: '2rem',
                            fontFamily: 'Inter',
                        },

                        '& .modal__letter': {
                            margin: '1rem 0',
                            width: '44px',
                            height: '44px',
                            backgroundColor: 'rgb(50 115 255)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50px',
                            fontFamily: 'Poppins',
                            fontWeight: 500
                        }
                    },


                },
            ],
        }



    }

})

export default customTheme