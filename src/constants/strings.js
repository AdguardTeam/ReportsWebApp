import Translator from 'bazinga-translator';

const en_translations = {
    '1Title': 'What product type do you use?',
    '2Title': 'What type of problem have you encountered?',
    '2ContactSupport': 'If the problem does not fall under any category that is listed here, please contact our tech support:',
    '2SupportEmail': 'support@adguard.com',
    '2Great': 'Great! Thank you for using Adguard!',
    '2Stealth': 'Please mark any of these options if you have them enabled in Stealth Mode',
    '2AndFiltMode': 'Do you use VPN or HTTP proxy mode?',
    '2AndFiltMethod': 'What filtering method do you use?',
    '2iosSysWideFilt': 'Do you use System-wide filtering?',
    '2iosSimpFilt': 'Do you use Simplified filters mode?',
    '2iosDNS': 'Do you use Adguard DNS?',
    '3Title': 'Where did you encounter the problem?',
    '3ContactSupport': 'If the problem does not fall under any category that is listed here, please contact our tech support:',
    '3SupportEmail': 'support@adguard.com',
    '3WebUrlPlaceholder': 'Browser',
    '3BrNamePlaceholder': "Enter the browser name...",
    '3AboveUrlInput': 'Please enter the full URL of the web page you had encountered the problem on:',
    '3UrlInputPlaceholder': "Enter page URL here...",
    '3AppInstr': "Please enter the full link to the Google Play app you had encountered the problem in. To do so, open the app in Google Play, scroll down, tap on 'Share' button and choose 'Copy to clipboard'. Then paste to the text field below.",
    '3AppUrlPlaceholder': "Enter Google Play app URL here...",
    '3DataComp': 'Is the data compression in your browser enabled?',
    '4Title': 'What filters do you have enabled?',
    '4FilterPlaceholder': "Start typing filters name here...",
    '5Title': 'Submit a screenshot',
    '5PleaseTake': 'Please take a screenshot (or screenshots, if needed) of the problem and upload it to any cloud service.',
    '5HowTo': 'If you are unsure of how to do it, read our %ManualLink%.',
    '5Manual': 'manual',
    '5ScReq': 'When taking the screenshot(s), please keep in mind following requirements:',
    '5Highlight': 'If it is unclear from the screenshot what the problem is, highlight it with an arrow/frame/etc;',
    '5FullVisible': 'The full browser window should be visible;',
    '5LongScrs': 'Please take a "long" screenshot (%InstructionLink%)',
    '5InstrLink': 'what is "long" screenshot?',
    '5ScrsUrlPh': "Enter screenshot URL...",
    '5ScrsAdd': "Add",
    '6Title': 'Add your comment',
    '6SubText': 'This step is optional. Type in the text box below any information that you think is necessary for the developers to know.',
    '6CommentPh': "Enter any additional information here",
    '7Title': 'Check the information',
    '7AGProd': 'Adguard Product:',
    '7AGVer': 'version',
    '7Brws': 'Browser:',
    '7DataCompEnabled': 'with data compression enabled',
    '7ProbUrl': 'Problem URL:',
    '7ProbApp': 'Problem App:',
    '7ProbType': 'Problem Type:',
    '7Filters': 'Filters:',
    '7Scrs': 'Screenshots:',
    '7Comments': 'Comments:',
    '7TitleDuringSubmission': 'Your report is being submitted',
    '7PlsWait': 'Please wait...',
    '8TitleOnSuccess': 'Your report has been submitted!',
    '8Sub1OnSuccess': 'Thank you for reporting the issue.',
    '8Sub2OnSuccess': 'You can keep track of the progress of your report in the below link:',
    '8TitleOnFail': "Your report couldn't be submitted",
    '8Sub1OnFail': "This could be a temporary network connectivity problem.",
    '8Sub2OnFail': "Please try again later.",
    'NavPrev': 'Prev',
    'NavNext': 'Next',
    'NavSubmit': 'Submit',
    'ProgressBarStep': 'Step'
};

const json = {
    "locale": "en",
    "defaultDomain": "domain",
    "translations": {
        "en": {
            "domain": en_translations
        }
    }
};

export default Translator.fromJSON(json);
