/**
 *
 * @param {string} platform
 * @return {string}
 */
function logoSrcFromPlatformName(platform) {
    return `${kImgDir}/platform_${platform.toLowerCase()}.webp`
}

function rankSrcThumbFromRankName(rank) {
    return `${kImgDir}/${rank}_small.webp`
}

function rankSrcFromRankName(rank) {
    return `${kImgDir}/${rank}.webp`
}
