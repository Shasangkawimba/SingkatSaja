import PasskeyConfirmationController from './PasskeyConfirmationController'
import PasskeyLoginController from './PasskeyLoginController'
import PasskeyRegistrationController from './PasskeyRegistrationController'
const Controllers = {
    PasskeyLoginController: Object.assign(PasskeyLoginController, PasskeyLoginController),
PasskeyConfirmationController: Object.assign(PasskeyConfirmationController, PasskeyConfirmationController),
PasskeyRegistrationController: Object.assign(PasskeyRegistrationController, PasskeyRegistrationController),
}

export default Controllers