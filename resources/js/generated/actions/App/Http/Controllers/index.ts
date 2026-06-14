import DashboardController from './DashboardController'
import LinkController from './LinkController'
import Settings from './Settings'
import HealthController from './HealthController'
import SeoController from './SeoController'
import RedirectController from './RedirectController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
LinkController: Object.assign(LinkController, LinkController),
Settings: Object.assign(Settings, Settings),
HealthController: Object.assign(HealthController, HealthController),
SeoController: Object.assign(SeoController, SeoController),
RedirectController: Object.assign(RedirectController, RedirectController),
}

export default Controllers