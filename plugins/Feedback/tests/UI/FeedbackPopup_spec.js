/*!
 * Matomo - free/libre analytics platform
 *
 * UsersManager screenshot tests.
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("FeedbackPopup", function () {
    this.timeout(0);
    this.fixture = "Piwik\\Plugins\\Feedback\\tests\\Fixtures\\FeedbackPopupFixture";

    var url = "?module=CoreHome&action=index&idSite=1&period=day&date=yesterday";

    before(async function() {
        await page.webpage.setViewport({
            width: 1250,
            height: 768
        });
    });

    it('should display popup when next reminder date is in past', async function () {
        await page.goto(url);
        await page.waitForNetworkIdle();

        var modal = await page.waitFor('.modal.open', { visible: true });
        expect(await modal.screenshot()).to.matchImage('feedback_popup');

        // Click on the "Remind me in 90 days" button = the popup shouldn't appear for the next test
        var remindLaterBtn = await modal.$$('.modal-footer .btn-flat');
        await remindLaterBtn[0].click();
    });

    it('should not display popup when next reminder date is in future', async function () {
        await page.goto(url);
        await page.waitForNetworkIdle();

        expect(await page.screenshotSelector('#root')).to.matchImage('dashboard_no_popup');
    });
});