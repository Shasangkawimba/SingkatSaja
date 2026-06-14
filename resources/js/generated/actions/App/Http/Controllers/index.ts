import DashboardController from './DashboardController'
import HealthController from './HealthController'
import LinkController from './LinkController'
import RedirectController from './RedirectController'
import SeoController from './SeoController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
LinkController: Object.assign(LinkController, LinkController),
Settings: Object.assign(Settings, Settings),
HealthController: Object.assign(HealthController, HealthController),
SeoController: Object.assign(SeoController, SeoController),
RedirectController: Object.assign(RedirectController, RedirectController),
}

export default Controllers