function getCurrentPageUrl() {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}
module.exports = {
    getCurrentPageUrl: getCurrentPageUrl
}