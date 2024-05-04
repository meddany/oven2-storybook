// @ts-nocheck
import PropTypes from 'prop-types';
import '../../components/oven2/fonts/nokia/nokia-fonts.css'
import CustomFonts from './fontsbuilder/fonts';
import '../../components/oven2/fonts/IBM/ibm-fonts.css'
import '../../components/oven2/fonts/roboto/roboto.css'
import '../../components/oven2/fonts/openSans/stylesheet.css'

export default {
    title : 'Oven Fonts' , 
}

const nokiaOptions = [
            'nokia_pure_headlinebold',
            'nokia_pure_headlineextra_bold',
            'nokia_pure_headlinelight',
            'nokia_pure_headlineregular',
            'nokia_pure_headlineultraLt',
            'nokia_pure_textbold',
            'nokia_pure_textlight',
            'nokia_pure_textmedium',
            'nokia_pure_textregular'
]
export const Nokia = CustomFonts(nokiaOptions)


const openSansOptions = [
            'open_sansbold',
            'open_sansbold_italic',
            'open_sansextrabold',
            'open_sansextrabold_italic',
            'open_sansitalic',
            'open_sanslight',
            'open_sanslight_italic',
            'open_sansregular',
            'open_sanssemibold',
            'open_sanssemibold_italic'
        ]
export const OpenSans = CustomFonts(openSansOptions)


const ibmOptions = [
    'ibm_plex_sansbold',
    'ibm_plex_sansbold_italic',
    'ibm_plex_sansextralight',
    'ibm_plex_sansXLtIt',
    'ibm_plex_sansitalic',
    'ibm_plex_sanslight',
    'ibm_plex_sanslight_italic',
    'ibm_plex_sansmedium',
    'ibm_plex_sansmedium_italic',
    'ibm_plex_sansregular',
    'ibm_plex_sanssemibold',
    'ibm_plex_sanssemibold_italic'
    ]
export const IBM = CustomFonts(ibmOptions)

const robotoOptions = [
    'robotoblack',
    'robotoblack_italic',
    'robotobold',
    'robotobold_italic',
    'robotoitalic',
    'robotolight',
    'robotolight_italic',
    'robotomedium',
    'robotomedium_italic',
    'Roboto',
    'robotothin',
    'robotothin_italic'
    ]
export const Roboto = CustomFonts(robotoOptions)


